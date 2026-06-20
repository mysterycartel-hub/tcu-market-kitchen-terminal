// Auto-generated Supabase database types.
// Regenerate with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
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
        Insert: {
          user_id: string;
          email: string;
          display_name?: string;
          xp?: number;
          rank?: string;
          completed_missions?: string[];
          completed_concepts?: string[];
          unlocked_characters?: string[];
          journal_count?: number;
          trade_plan_count?: number;
          last_activity?: string | null;
        };
        Update: {
          display_name?: string;
          xp?: number;
          rank?: string;
          completed_missions?: string[];
          completed_concepts?: string[];
          unlocked_characters?: string[];
          journal_count?: number;
          trade_plan_count?: number;
          last_activity?: string | null;
          updated_at?: string;
        };
      };
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          note: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          note: string;
        };
        Update: never;
      };
      trade_plans: {
        Row: {
          id: string;
          user_id: string;
          symbol: string;
          direction: "BUY" | "SELL" | null;
          content: string;
          grade: string | null;
          bias: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          symbol?: string;
          direction?: "BUY" | "SELL" | null;
          content: string;
          grade?: string | null;
          bias?: string | null;
        };
        Update: never;
      };
      character_unlocks: {
        Row: {
          user_id: string;
          character_name: string;
          xp_at_unlock: number;
          unlocked_at: string;
        };
        Insert: {
          user_id: string;
          character_name: string;
          xp_at_unlock?: number;
        };
        Update: never;
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          tier: "free" | "pro" | "master";
          status: "active" | "trialing" | "canceled" | "past_due" | "incomplete";
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          tier?: "free" | "pro" | "master";
          status?: "active" | "trialing" | "canceled" | "past_due" | "incomplete";
        };
        Update: {
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          tier?: "free" | "pro" | "master";
          status?: "active" | "trialing" | "canceled" | "past_due" | "incomplete";
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          updated_at?: string;
        };
      };
      missions: {
        Row: {
          id: string;
          title: string;
          description: string;
          xp_reward: number;
          created_at: string;
        };
        Insert: never;
        Update: never;
      };
      mission_progress: {
        Row: {
          user_id: string;
          mission_id: string;
          xp_awarded: number;
          completed_at: string;
        };
        Insert: {
          user_id: string;
          mission_id: string;
          xp_awarded?: number;
        };
        Update: never;
      };
      charts: {
        Row: {
          id: string;
          user_id: string;
          symbol: string;
          timeframe: string;
          screenshot_url: string | null;
          notes: string | null;
          ai_summary: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          symbol?: string;
          timeframe?: string;
          screenshot_url?: string | null;
          notes?: string | null;
          ai_summary?: string | null;
        };
        Update: {
          notes?: string | null;
          ai_summary?: string | null;
        };
      };
      library_items: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          body: string;
          premium: boolean;
          created_at: string;
        };
        Insert: never;
        Update: never;
      };
    };
  };
}
