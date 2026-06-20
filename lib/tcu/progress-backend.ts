"use client";

import { computeRank, type TCUProgress } from "@/lib/tcu/progress";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type SupabaseUser = {
  id: string;
  email?: string;
};

const PROFILE_COLUMNS = [
  "user_id",
  "email",
  "display_name",
  "xp",
  "rank",
  "completed_missions",
  "completed_concepts",
  "unlocked_characters",
  "journal_count",
  "trade_plan_count",
  "last_activity",
].join(",");

export async function getSupabaseUser(): Promise<SupabaseUser | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  return { id: data.user.id, email: data.user.email ?? undefined };
}

export async function sendMagicLink(email: string, redirectTo: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return { ok: false, error: "Supabase env is not configured" };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: true,
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, error: null };
}

export async function ensureProfile(user: SupabaseUser, displayName: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  const now = new Date().toISOString();

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      email: user.email ?? "",
      display_name: displayName,
      xp: 0,
      rank: "Kitchen Rookie",
      completed_missions: [],
      completed_concepts: [],
      unlocked_characters: [],
      journal_count: 0,
      trade_plan_count: 0,
      last_activity: now,
    },
    { onConflict: "user_id", ignoreDuplicates: true },
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function loadSupabaseProgress(user: SupabaseUser): Promise<TCUProgress | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select(PROFILE_COLUMNS)
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return null;
  }

  // Cast to any: types are hand-written here; run `supabase gen types` for strict types.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const row = data as any;

  return {
    profile: {
      name: row.display_name || "Trading Chef",
      email: row.email || user.email || "",
      createdAt: row.last_activity || new Date().toISOString(),
    },
    xp: row.xp || 0,
    rank: row.rank || "Kitchen Rookie",
    completedMissions: row.completed_missions || [],
    completedConcepts: row.completed_concepts || [],
    unlockedCharacters: row.unlocked_characters || [],
    journalCount: row.journal_count || 0,
    tradePlanCount: row.trade_plan_count || 0,
    lastActivityAt: row.last_activity || null,
  };
}

export async function persistSupabaseProgress(user: SupabaseUser, progress: TCUProgress) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  const payload = {
    user_id: user.id,
    email: progress.profile?.email || user.email || "",
    display_name: progress.profile?.name || "Trading Chef",
    xp: progress.xp,
    rank: computeRank(progress.xp),
    completed_missions: progress.completedMissions,
    completed_concepts: progress.completedConcepts,
    unlocked_characters: progress.unlockedCharacters,
    journal_count: progress.journalCount,
    trade_plan_count: progress.tradePlanCount,
    last_activity: progress.lastActivityAt || new Date().toISOString(),
  };

  const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "user_id" });
  if (error) {
    throw new Error(error.message);
  }
}

export async function logMissionCompletion(user: SupabaseUser, missionId: string, xpAwarded: number) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  await supabase.from("mission_progress").upsert(
    {
      user_id: user.id,
      mission_id: missionId,
      xp_awarded: xpAwarded,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,mission_id" },
  );
}

export async function logJournalEntry(user: SupabaseUser, note: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  await supabase.from("journal_entries").insert({
    user_id: user.id,
    note,
    created_at: new Date().toISOString(),
  });
}

export async function logTradePlan(user: SupabaseUser, content: string, symbol: string) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  await supabase.from("trade_plans").insert({
    user_id: user.id,
    symbol,
    content,
    created_at: new Date().toISOString(),
  });
}

export async function logCharacterUnlock(user: SupabaseUser, characterName: string, xpAtUnlock: number) {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;

  await supabase.from("character_unlocks").upsert(
    {
      user_id: user.id,
      character_name: characterName,
      unlocked_at: new Date().toISOString(),
      xp_at_unlock: xpAtUnlock,
    },
    { onConflict: "user_id,character_name" },
  );
}
