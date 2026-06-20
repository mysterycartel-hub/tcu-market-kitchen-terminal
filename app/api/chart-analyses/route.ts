import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json() as {
      symbol?: string;
      timeframe?: string;
      bias?: string;
      liquidity?: string;
      aoi?: string;
      entry?: string;
      burn_point?: string;
      tables_served?: string;
      invalidation?: string;
      ai_summary?: string;
      character_lesson?: string;
      screenshot_url?: string | null;
    };

    const payload = {
      user_id: user.id,
      symbol: body.symbol ?? "EURUSD",
      timeframe: body.timeframe ?? "15m",
      bias: body.bias ?? null,
      liquidity: body.liquidity ?? null,
      aoi: body.aoi ?? null,
      entry: body.entry ?? null,
      burn_point: body.burn_point ?? null,
      tables_served: body.tables_served ?? null,
      invalidation: body.invalidation ?? null,
      ai_summary: body.ai_summary ?? null,
      character_lesson: body.character_lesson ?? null,
      screenshot_url: body.screenshot_url ?? null,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("chart_analyses")
      .insert(payload)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ entry: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save chart analysis" }, { status: 500 });
  }
}
