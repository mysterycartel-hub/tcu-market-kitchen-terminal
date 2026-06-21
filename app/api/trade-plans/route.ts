import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient, isSupabaseServerConfigured } from "@/lib/supabase/server";

const NOT_CONFIGURED = NextResponse.json(
  { error: "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your Vercel environment to enable trade plan saving." },
  { status: 503 },
);

// GET /api/trade-plans — return all trade plans for the authenticated user
export async function GET() {
  if (!isSupabaseServerConfigured()) return NOT_CONFIGURED;
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("trade_plans")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ plans: data });
  } catch {
    return NextResponse.json({ error: "Failed to fetch trade plans" }, { status: 500 });
  }
}

// POST /api/trade-plans — save a new trade plan
export async function POST(request: NextRequest) {
  if (!isSupabaseServerConfigured()) return NOT_CONFIGURED;
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json() as {
      content: string;
      symbol?: string;
      direction?: "BUY" | "SELL";
      grade?: string;
      bias?: string;
    };

    const content = (body.content ?? "").trim();
    if (!content) {
      return NextResponse.json({ error: "Plan content is required" }, { status: 400 });
    }

    const { data: plan, error: insertError } = await supabase
      .from("trade_plans")
      .insert({
        user_id: user.id,
        content,
        symbol: body.symbol ?? "XAUUSD",
        direction: body.direction ?? null,
        grade: body.grade ?? null,
        bias: body.bias ?? null,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // Read current profile then increment
    const { data: profile } = await supabase
      .from("profiles")
      .select("xp, trade_plan_count")
      .eq("user_id", user.id)
      .single();

    if (profile) {
      await supabase.from("profiles").update({
        xp: (profile.xp ?? 0) + 15,
        trade_plan_count: (profile.trade_plan_count ?? 0) + 1,
        last_activity: new Date().toISOString(),
      }).eq("user_id", user.id);
    }

    return NextResponse.json({ plan, xpAwarded: 15 }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save trade plan" }, { status: 500 });
  }
}
