// Stripe webhook receiver — validates signature, syncs subscription state to Supabase.
// Requires STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET env vars.
// Returns 200 for unhandled event types so Stripe does not retry them.

import { NextRequest, NextResponse } from "next/server";

function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET);
}

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ received: true, note: "Stripe not configured" }, { status: 200 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  type StripeEventLike = { type: string; data: { object: unknown } };
  let event: StripeEventLike;

  try {
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const rawBody = await request.text();
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    ) as unknown as StripeEventLike;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Sync subscription state to Supabase subscriptions table.
  try {
    const { createServerSupabaseClient } = await import("@/lib/supabase/server");

    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const sub = event.data.object as {
        id: string;
        customer: string;
        status: string;
        items: { data: { price: { id: string } }[] };
        current_period_end: number;
        cancel_at_period_end: boolean;
        metadata?: { user_id?: string };
      };

      const userId = sub.metadata?.user_id;
      if (!userId) {
        console.warn("[stripe webhook] subscription missing user_id metadata:", sub.id);
        return NextResponse.json({ received: true }, { status: 200 });
      }

      const supabase = await createServerSupabaseClient();
      await supabase.from("subscriptions").upsert({
        user_id: userId,
        stripe_customer_id: sub.customer,
        stripe_subscription_id: sub.id,
        status: sub.status,
        current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        cancel_at_period_end: sub.cancel_at_period_end,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    }
  } catch (err) {
    console.error("[stripe webhook] Supabase sync failed:", err);
    // Return 200 so Stripe does not retry — log the error for monitoring.
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
