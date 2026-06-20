// Database row types matching supabase/schema.sql
// Run `npx supabase gen types typescript --project-id YOUR_ID` to replace with generated types.

export type DbProfile = {
  user_id: string;
  email: string;
  display_name: string;
  xp: number;
  rank: string;
  completed_missions: string[];
  completed_concepts: string[];
  unlocked_characters: string[];
  journal_count: number;
  trade_plan_count: number;
  last_activity: string | null;
  created_at: string;
  updated_at: string;
};

export type DbMission = {
  id: string;
  title: string;
  description: string;
  xp_reward: number;
  created_at: string;
};

export type DbMissionProgress = {
  user_id: string;
  mission_id: string;
  xp_awarded: number;
  completed_at: string;
};

export type DbJournalEntry = {
  id: string;
  user_id: string;
  note: string;
  created_at: string;
};

export type DbTradePlan = {
  id: string;
  user_id: string;
  symbol: string;
  direction: "BUY" | "SELL" | null;
  content: string;
  grade: string | null;
  bias: string | null;
  created_at: string;
};

export type DbCharacterUnlock = {
  user_id: string;
  character_name: string;
  xp_at_unlock: number;
  unlocked_at: string;
};

export type DbChart = {
  id: string;
  user_id: string;
  symbol: string;
  timeframe: string;
  screenshot_url: string | null;
  blob_key: string | null;
  notes: string | null;
  ai_summary: string | null;
  created_at: string;
};

export type DbVaultItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  body: string;
  xp_reward: number;
  premium: boolean;
  created_at: string;
};

export type DbVaultProgress = {
  user_id: string;
  vault_item_id: string;
  reviewed_at: string;
  xp_awarded: number;
};

export type DbSubscription = {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  tier: "free" | "starter" | "pro" | "founding";
  status: "active" | "trialing" | "canceled" | "past_due" | "incomplete";
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
};
