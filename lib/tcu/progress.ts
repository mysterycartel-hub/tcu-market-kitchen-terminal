export type TCUProfile = {
  name: string;
  email: string;
  createdAt: string;
};

export type TCUProgress = {
  profile: TCUProfile | null;
  xp: number;
  rank: string;
  completedMissions: string[];
  completedConcepts: string[];
  unlockedCharacters: string[];
  journalCount: number;
  tradePlanCount: number;
  lastActivityAt: string | null;
};

export const FIRST_MISSION_ID = "first-market-read";
export const FIRST_CHARACTER_NAME = "Grandma Market";

export const DEFAULT_PROGRESS: TCUProgress = {
  profile: null,
  xp: 0,
  rank: "Kitchen Rookie",
  completedMissions: [],
  completedConcepts: [],
  unlockedCharacters: [],
  journalCount: 0,
  tradePlanCount: 0,
  lastActivityAt: null,
};

const STORAGE_KEY = "tcu.market-kitchen.progress";

export function loadProgress(): TCUProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as TCUProgress;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      completedMissions: parsed.completedMissions || [],
      completedConcepts: parsed.completedConcepts || [],
      unlockedCharacters: parsed.unlockedCharacters || [],
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveProgress(progress: TCUProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function computeRank(xp: number) {
  if (xp >= 500) return "Kitchen Master";
  if (xp >= 250) return "Station Lead";
  if (xp >= 100) return "Kitchen Apprentice";
  return "Kitchen Rookie";
}

export function createAccount(name: string, email: string): TCUProgress {
  const createdAt = new Date().toISOString();
  return {
    ...DEFAULT_PROGRESS,
    profile: { name, email, createdAt },
    xp: 0,
    rank: "Kitchen Rookie",
    lastActivityAt: createdAt,
  };
}

export function awardXP(progress: TCUProgress, amount: number, note?: string): TCUProgress {
  const xp = progress.xp + amount;
  const unlockedCharacters = progress.unlockedCharacters.includes(FIRST_CHARACTER_NAME) || xp < 80
    ? progress.unlockedCharacters
    : [...progress.unlockedCharacters, FIRST_CHARACTER_NAME];

  return {
    ...progress,
    xp,
    rank: computeRank(xp),
    unlockedCharacters,
    lastActivityAt: new Date().toISOString(),
  };
}

export function markMissionComplete(progress: TCUProgress, missionId: string, xpGain = 50) {
  if (progress.completedMissions.includes(missionId)) return progress;
  return awardXP(
    {
      ...progress,
      completedMissions: [...progress.completedMissions, missionId],
    },
    xpGain,
  );
}

export function completeConcept(progress: TCUProgress, conceptId: string, xpGain = 10) {
  if (progress.completedConcepts.includes(conceptId)) return progress;
  return awardXP(
    {
      ...progress,
      completedConcepts: [...progress.completedConcepts, conceptId],
    },
    xpGain,
  );
}

export function incrementJournal(progress: TCUProgress, xpGain = 15) {
  return awardXP({ ...progress, journalCount: progress.journalCount + 1 }, xpGain);
}

export function incrementTradePlan(progress: TCUProgress, xpGain = 15) {
  return awardXP({ ...progress, tradePlanCount: progress.tradePlanCount + 1 }, xpGain);
}
