import { NextResponse } from "next/server";
import { analyzeWithAICoach } from "@/lib/aiCoach";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({})) as {
    symbol?: string;
    timeframe?: string;
    notes?: string;
  };

  const analysis = await analyzeWithAICoach({
    symbol: body.symbol ?? "EURUSD",
    timeframe: body.timeframe ?? "15m",
    notes: body.notes,
  });

  return NextResponse.json({ ok: true, analysis });
}
