import { NextRequest, NextResponse } from "next/server";

// POST /api/beehiiv/subscribe
// Subscribes an email to the TCU Beehiiv publication.
// Called after account creation or from the landing page email capture.
// Docs: https://developers.beehiiv.com/docs/v2/operations/post-publications-publicationid-subscriptions
export async function POST(request: NextRequest) {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) {
    // Silently skip if not configured — don't fail account creation.
    return NextResponse.json({ ok: true, skipped: true });
  }

  try {
    const body = await request.json() as { email: string; name?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "tcu-market-kitchen",
          utm_medium: "app-signup",
          custom_fields: body.name ? [{ name: "display_name", value: body.name }] : [],
        }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("[beehiiv] subscribe error:", res.status, text);
      // Don't surface Beehiiv errors to the user — just log and continue.
      return NextResponse.json({ ok: true, beehiivStatus: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("[beehiiv] subscribe exception:", err);
    return NextResponse.json({ ok: true, error: "beehiiv_exception" });
  }
}
