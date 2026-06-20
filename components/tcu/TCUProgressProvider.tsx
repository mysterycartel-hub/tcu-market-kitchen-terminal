"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_PROGRESS,
  FIRST_MISSION_ID,
  type TCUProgress,
  awardXP,
  completeConcept,
  createAccount,
  incrementJournal,
  incrementTradePlan,
  loadProgress,
  markMissionComplete,
  saveProgress,
} from "@/lib/tcu/progress";
import {
  ensureProfile,
  getSupabaseUser,
  loadSupabaseProgress,
  logCharacterUnlock,
  logJournalEntry,
  logMissionCompletion,
  logTradePlan,
  persistSupabaseProgress,
  sendMagicLink,
} from "@/lib/tcu/progress-backend";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase/client";

type TCUProgressContextValue = {
  progress: TCUProgress;
  hasAccount: boolean;
  loading: boolean;
  usingSupabase: boolean;
  createNewAccount: (name: string, email: string) => Promise<{ ok: boolean; error: string | null }>;
  signOut: () => Promise<void>;
  completeFirstMission: () => void;
  reviewConcept: (conceptId: string, xp?: number) => void;
  addJournalEntry: (note?: string) => void;
  addTradePlan: (content?: string, symbol?: string) => void;
  addXP: (amount: number) => void;
  resetProgress: () => void;
};

const TCUProgressContext = createContext<TCUProgressContextValue | null>(null);

export function TCUProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<TCUProgress>(DEFAULT_PROGRESS);
  const [loading, setLoading] = useState(true);
  const [supabaseUserId, setSupabaseUserId] = useState<string | null>(null);
  const usingSupabase = isSupabaseConfigured();

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      const local = loadProgress();
      if (!active) return;
      setProgress(local);

      if (!usingSupabase) {
        setLoading(false);
        return;
      }

      const user = await getSupabaseUser();
      if (!active) return;

      if (!user) {
        setLoading(false);
        return;
      }

      setSupabaseUserId(user.id);
      const remote = await loadSupabaseProgress(user);

      if (remote) {
        setProgress(remote);
      } else {
        await ensureProfile(user, local.profile?.name || "Trading Chef");
        await persistSupabaseProgress(user, local);
      }

      if (active) {
        setLoading(false);
      }
    };

    void bootstrap();

    const supabase = getSupabaseBrowserClient();
    const subscription = supabase?.auth.onAuthStateChange(async (event, session) => {
      const uid = session?.user?.id ?? null;
      setSupabaseUserId(uid);

      if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && uid) {
        const user = { id: uid, email: session?.user?.email };
        const remote = await loadSupabaseProgress(user);
        if (remote) {
          setProgress(remote);
        } else {
          const local = loadProgress();
          await ensureProfile(user, local.profile?.name || session?.user?.email?.split("@")[0] || "Trading Chef");
          await persistSupabaseProgress(user, local);
        }
        setLoading(false);
      }

      if (event === "SIGNED_OUT") {
        setSupabaseUserId(null);
        setProgress(loadProgress());
        setLoading(false);
      }
    });

    return () => {
      active = false;
      subscription?.data.subscription.unsubscribe();
    };
  }, [usingSupabase]);

  useEffect(() => {
    saveProgress(progress);

    if (!usingSupabase || !supabaseUserId) {
      return;
    }

    void persistSupabaseProgress(
      { id: supabaseUserId, email: progress.profile?.email },
      progress,
    );
  }, [progress, supabaseUserId, usingSupabase]);

  const value = useMemo<TCUProgressContextValue>(() => ({
    progress,
    hasAccount: Boolean(progress.profile),
    loading,
    usingSupabase,
    signOut: async () => {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      setSupabaseUserId(null);
      setProgress(DEFAULT_PROGRESS);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("tcu.market-kitchen.progress");
      }
    },
    createNewAccount: async (name, email) => {
      const nextProgress = createAccount(name, email);
      setProgress(nextProgress);

      if (!usingSupabase) {
        return { ok: true, error: null };
      }

      const redirectTo = `${window.location.origin}/api/auth/callback`;
      const authResult = await sendMagicLink(email, redirectTo);

      const user = await getSupabaseUser();
      if (user) {
        setSupabaseUserId(user.id);
        await ensureProfile(user, name || "Trading Chef");
        await persistSupabaseProgress(user, nextProgress);
      }

      return authResult;
    },
    completeFirstMission: () => {
      setProgress((prev) => {
        const alreadyDone = prev.completedMissions.includes(FIRST_MISSION_ID);
        const next = markMissionComplete(prev, FIRST_MISSION_ID, 60);

        if (!alreadyDone && supabaseUserId) {
          void logMissionCompletion({ id: supabaseUserId, email: next.profile?.email }, FIRST_MISSION_ID, 60);
        }

        return next;
      });
    },
    reviewConcept: (conceptId, xp = 10) => {
      setProgress((prev) => completeConcept(prev, conceptId, xp));
    },
    addJournalEntry: (note) => {
      setProgress((prev) => {
        const next = incrementJournal(prev, 15);
        if (supabaseUserId) {
          void logJournalEntry({ id: supabaseUserId, email: next.profile?.email }, note?.trim() || "Journal entry");
        }
        return next;
      });
    },
    addTradePlan: (content, symbol = "XAUUSD") => {
      setProgress((prev) => {
        const next = incrementTradePlan(prev, 15);
        if (supabaseUserId) {
          void logTradePlan(
            { id: supabaseUserId, email: next.profile?.email },
            content?.trim() || "Trade plan",
            symbol,
          );
        }
        return next;
      });
    },
    addXP: (amount) => {
      setProgress((prev) => {
        const before = prev.unlockedCharacters;
        const next = awardXP(prev, amount);
        const newlyUnlocked = next.unlockedCharacters.filter((name) => !before.includes(name));

        if (supabaseUserId && newlyUnlocked.length) {
          newlyUnlocked.forEach((name) => {
            void logCharacterUnlock({ id: supabaseUserId, email: next.profile?.email }, name, next.xp);
          });
        }

        return next;
      });
    },
    resetProgress: () => {
      setProgress(DEFAULT_PROGRESS);
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("tcu.market-kitchen.progress");
      }
    },
  }), [progress, loading, supabaseUserId, usingSupabase]);

  return <TCUProgressContext.Provider value={value}>{children}</TCUProgressContext.Provider>;
}

export function useTCUProgress() {
  const context = useContext(TCUProgressContext);
  if (!context) {
    throw new Error("useTCUProgress must be used within a TCUProgressProvider");
  }
  return context;
}
