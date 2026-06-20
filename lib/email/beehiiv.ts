// Beehiiv email list helper.
// Subscribes an email to the configured Beehiiv publication.
// Falls back to a mock success response when env vars are absent (local dev / preview).

type BeehiivResult = {
  ok: boolean;
  status: "subscribed" | "already_subscribed" | "mock" | "error";
  error?: string;
};

function isBeehiivConfigured(): boolean {
  return Boolean(process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID);
}

export async function subscribeToBeehiiv(
  email: string,
  utmSource = "tcu-terminal",
): Promise<BeehiivResult> {
  if (!isBeehiivConfigured()) {
    // Dev / preview mode — log and return a mock success so the UI is never blocked.
    console.log("[beehiiv] env not configured — mock subscribe for:", email);
    return { ok: true, status: "mock" };
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: utmSource,
          utm_medium: "webapp",
          utm_campaign: "tcu-signup",
        }),
      },
    );

    if (res.status === 201 || res.status === 200) {
      return { ok: true, status: "subscribed" };
    }

    if (res.status === 409) {
      return { ok: true, status: "already_subscribed" };
    }

    const body = await res.text();
    return { ok: false, status: "error", error: `Beehiiv ${res.status}: ${body}` };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, status: "error", error: message };
  }
}
