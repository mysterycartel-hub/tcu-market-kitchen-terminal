import { subscribeToBeehiiv } from "@/lib/email/beehiiv";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let email: string;

  try {
    const body = await request.json() as { email?: string };
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required" }, { status: 422 });
  }

  const result = await subscribeToBeehiiv(email);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ status: result.status }, { status: 200 });
}
