export type Rank = {
  minXp: number;
  rank: string;
  emoji: string;
  description: string;
};

export const RANKS: Rank[] = [
  { minXp: 0,    rank: "Kitchen Apprentice",  emoji: "🧑‍🍳", description: "Just entering the kitchen" },
  { minXp: 50,   rank: "Prep Cook",           emoji: "🔪",   description: "Learning the basics" },
  { minXp: 150,  rank: "Line Cook",           emoji: "🍳",   description: "Reading structure consistently" },
  { minXp: 300,  rank: "Sous Chef",           emoji: "⭐",   description: "Disciplined setup planning" },
  { minXp: 500,  rank: "Head Chef",           emoji: "🌟",   description: "Full roadmap mastery" },
  { minXp: 800,  rank: "Executive Chef",      emoji: "💫",   description: "Teaching others the TCU way" },
  { minXp: 1200, rank: "Trading Chef Master", emoji: "👑",   description: "Scott-King Coast legend" },
];

export function getRank(xp: number): Rank {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXp) return RANKS[i];
  }
  return RANKS[0];
}

export function getNextRank(xp: number): Rank | null {
  for (const rank of RANKS) {
    if (xp < rank.minXp) return rank;
  }
  return null;
}

export function getXpProgress(xp: number): { current: number; next: number | null; pct: number } {
  const current = getRank(xp);
  const next = getNextRank(xp);
  if (!next) return { current: xp, next: null, pct: 100 };
  const rangeStart = current.minXp;
  const rangeEnd = next.minXp;
  const pct = Math.min(100, Math.round(((xp - rangeStart) / (rangeEnd - rangeStart)) * 100));
  return { current: xp, next: next.minXp, pct };
}
