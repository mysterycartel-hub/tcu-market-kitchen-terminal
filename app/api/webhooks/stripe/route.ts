import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

// POST /api/webhooks/stripe
// Receives Stripe webhook events and updates the subscriptions table.
// Wire this URL in: Stripe Dashboard → Developers → Webhooks → Add endpoint
// URL: https://YOUR_DOMAIN/api/webhooks/stripe
// Events to listen for: customer.subscription.created, updated, deleted
//
// To verify signatures: npm install stripe  (add to dependencies when ready)

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.warn("[stripe webhook] STRIPE_WEBHOOK_SECRET not set — skipping verification");
  }

  let event: StripeWebhookEvent;

  try {
    const body = await request.text();

    // ── Signature verification (uncomment when stripe package is installed) ──
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-04-10" });
    // const sig = request.headers.get("stripe-signature")!;
    // event = stripe.webhooks.constructEvent(body, sig, webhookSecret!);
    // ─────────────────────────────────────────────────────────────────────────

    event = JSON.parse(body) as StripeWebhookEvent;
  } catch (err) {
    console.error("[stripe webhook] parse/verify error:", err);
    return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
  }

  // Only proceed if Supabase is configured.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ received: true });
  }

  const supabase = createServiceClient();

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as StripeSubscription;
        const customerId = sub.customer as string;

        // Look up user by stripe_customer_id
        const { data: existing } = await supabase
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (existing) {
          await supabase.from("subscriptions").update({
            stripe_subscription_id: sub.id,
            tier: resolveTier(sub),
            status: sub.status as SubscriptionStatus,
            current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
            cancel_at_period_end: sub.cancel_at_period_end,
            updated_at: new Date().toISOString(),
          }).eq("user_id", existing.user_id);
        }
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as StripeSubscription;
        await supabase.from("subscriptions").update({
          tier: "free",
          status: "canceled",
          stripe_subscription_id: null,
          cancel_at_period_end: false,
          updated_at: new Date().toISOString(),
        }).eq("stripe_subscription_id", sub.id);
        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object as StripeCheckoutSession;
        if (session.mode === "subscription" && session.customer && session.client_reference_id) {
          // Link Stripe customer to our user_id (set client_reference_id = user.id during checkout)
          await supabase.from("subscriptions").update({
            stripe_customer_id: session.customer as string,
          }).eq("user_id", session.client_reference_id);
        }
        break;
      }
    }
  } catch (err) {
    console.error("[stripe webhook] db error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ── Minimal Stripe types (avoids installing stripe package before it's needed) ──

type SubscriptionStatus = "active" | "trialing" | "canceled" | "past_due" | "incomplete";

interface StripeSubscription {
  id: string;
  customer: string;
  status: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
  items: { data: Array<{ price: { id: string } }> };
}

interface StripeCheckoutSession {
  mode: string;
  customer: string | null;
  client_reference_id: string | null;
}

interface StripeWebhookEvent {
  type: string;
  data: { object: StripeSubscription | StripeCheckoutSession };
}

function resolveTier(sub: StripeSubscription): "free" | "pro" | "master" {
  const priceId = sub.items?.data?.[0]?.price?.id ?? "";
  if (priceId === process.env.STRIPE_PRICE_MASTER_MONTHLY) return "master";
  if (priceId === process.env.STRIPE_PRICE_PRO_MONTHLY) return "pro";
  return "free";
}
