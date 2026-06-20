import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// GET /api/journal — return all journal entries for the authenticated user
export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("journal_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ entries: data });
  } catch {
    return NextResponse.json({ error: "Failed to fetch journal entries" }, { status: 500 });
  }
}

// POST /api/journal — save a new journal entry
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json() as { note: string };
    const note = (body.note ?? "").trim();
    if (!note) {
      return NextResponse.json({ error: "Note text is required" }, { status: 400 });
    }

    const { data: entry, error: insertError } = await supabase
      .from("journal_entries")
      .insert({ user_id: user.id, note })
      .select()
      .single();

    if (insertError) throw insertError;

    // Read current profile then increment (Supabase JS has no increment shorthand)
    const { data: profile } = await supabase
      .from("profiles")
      .select("xp, journal_count")
      .eq("user_id", user.id)
      .single();

    if (profile) {
      await supabase.from("profiles").update({
        xp: (profile.xp ?? 0) + 15,
        journal_count: (profile.journal_count ?? 0) + 1,
        last_activity: new Date().toISOString(),
      }).eq("user_id", user.id);
    }

    return NextResponse.json({ entry, xpAwarded: 15 }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save journal entry" }, { status: 500 });
  }
}
