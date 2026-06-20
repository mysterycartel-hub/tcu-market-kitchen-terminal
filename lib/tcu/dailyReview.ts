export type ReviewCategory = "Pre-Session" | "Setup" | "Risk" | "Mindset";

export type DailyReviewItem = {
  id: string;
  category: ReviewCategory;
  label: string;
  description: string;
  character: string;
  characterEmoji: string;
  xpValue: number;
};

export const DAILY_REVIEW_ITEMS: DailyReviewItem[] = [
  // Pre-Session
  { id: "htf-bias",       category: "Pre-Session", label: "Confirmed HTF Bias",             description: "Daily and 4H charts reviewed. Kitchen direction is clear.",           character: "Grandma Market",  characterEmoji: "👵", xpValue: 10 },
  { id: "session-check",  category: "Pre-Session", label: "Identified Today's Session",     description: "London, NY, or Asia open noted. Session window is planned.",          character: "Chef Maurice",    characterEmoji: "👨‍🍳", xpValue: 5  },
  { id: "news-check",     category: "Pre-Session", label: "High-Impact News Checked",       description: "Economic calendar reviewed. No surprise events during planned window.",character: "Grandma Market",  characterEmoji: "👵", xpValue: 5  },
  { id: "trade-limit",    category: "Pre-Session", label: "Daily Trade Limit Set",          description: "Maximum 2–3 setups for the session. Burn Alarm is armed.",             character: "Burn Alarm",      characterEmoji: "🚨", xpValue: 10 },

  // Setup
  { id: "liquidity",      category: "Setup",       label: "Liquidity Targets Marked",       description: "Swing highs and lows drawn. Buy-side and sell-side liquidity mapped.", character: "Louie",           characterEmoji: "💧", xpValue: 10 },
  { id: "aoi-marked",     category: "Setup",       label: "AOI / Prep Zone Identified",     description: "At least one clear area of interest aligned with bias is marked.",     character: "Chef Maurice",    characterEmoji: "👨‍🍳", xpValue: 10 },
  { id: "fvg-check",      category: "Setup",       label: "FVG or Imbalance Noted",         description: "Key Fair Value Gaps aligned with bias have been identified.",           character: "Wickie",          characterEmoji: "🕯️", xpValue: 10 },
  { id: "structure",      category: "Setup",       label: "BOS / CHOCH On Radar",           description: "Break of structure or change of character zones are mapped.",          character: "Chef Maurice",    characterEmoji: "👨‍🍳", xpValue: 5  },

  // Risk
  { id: "burn-point",     category: "Risk",        label: "Burn Point Defined",             description: "Stop loss level identified below/above structural point. No guessing.", character: "Burn Alarm",      characterEmoji: "🚨", xpValue: 15 },
  { id: "position-size",  category: "Risk",        label: "Position Size Is Appropriate",   description: "Portion size fits the burn point distance. Not oversized.",            character: "Burn Alarm",      characterEmoji: "🚨", xpValue: 10 },
  { id: "rr-ratio",       category: "Risk",        label: "R:R Is At Least 1:2",            description: "Target is at least twice the distance of the stop. Worth the cook.",   character: "Profit Plate",    characterEmoji: "🍽️", xpValue: 10 },

  // Mindset
  { id: "no-revenge",     category: "Mindset",     label: "Not Revenge Trading",            description: "Previous losses are accepted. This trade is clean and planned.",       character: "Melissa Mayhem",  characterEmoji: "😤", xpValue: 15 },
  { id: "patience",       category: "Mindset",     label: "Passing Grandma's Rule",         description: "All 8 roadmap steps are satisfied or I will not trade today.",         character: "Grandma Market",  characterEmoji: "👵", xpValue: 20 },
  { id: "walk-away",      category: "Mindset",     label: "Ready to Walk Away",             description: "If price does not come to the plan, I will close the chart and rest.", character: "Grandma Market",  characterEmoji: "👵", xpValue: 15 },
];

export const REVIEW_CATEGORIES: ReviewCategory[] = ["Pre-Session", "Setup", "Risk", "Mindset"];

export const REVIEW_CATEGORY_COLORS: Record<ReviewCategory, string> = {
  "Pre-Session": "text-violet-400 border-violet-500/30",
  "Setup":       "text-amber-400 border-amber-500/30",
  "Risk":        "text-rose-400 border-rose-500/30",
  "Mindset":     "text-indigo-400 border-indigo-500/30",
};
