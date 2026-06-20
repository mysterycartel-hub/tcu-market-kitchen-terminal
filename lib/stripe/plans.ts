// ── Stripe Subscription Plans for TCU Market Kitchen Terminal ──
// Add actual Stripe Price IDs to .env.local before enabling checkout.
// Create products at: dashboard.stripe.com/products

export type PlanTier = "free" | "pro" | "master";

export interface Plan {
  tier: PlanTier;
  name: string;
  tagline: string;
  price: string;
  priceMonthly: number;
  priceId: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export const PLANS: Plan[] = [
  {
    tier: "free",
    name: "Kitchen Apprentice",
    tagline: "Start learning the roadmap",
    price: "Free",
    priceMonthly: 0,
    priceId: "",
    features: [
      "TCU Chart Kitchen Terminal",
      "8-step Roadmap Checklist",
      "Concept Vault flashcards",
      "Daily Kitchen Review",
      "Journal (10 entries)",
      "XP & rank system",
      "First 3 character coaches",
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    tier: "pro",
    name: "Line Cook",
    tagline: "Full access for serious learners",
    price: "$19/mo",
    priceMonthly: 19,
    priceId: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "",
    features: [
      "Everything in Free",
      "Unlimited journal entries",
      "All 10 character coaches",
      "Trade plan history",
      "Chart upload & AI analysis",
      "Mission rewards",
      "Priority support",
    ],
    cta: "Go Pro",
    highlighted: true,
  },
  {
    tier: "master",
    name: "Trading Chef Master",
    tagline: "For dedicated students of the craft",
    price: "$49/mo",
    priceMonthly: 49,
    priceId: process.env.STRIPE_PRICE_MASTER_MONTHLY ?? "",
    features: [
      "Everything in Pro",
      "Live group sessions (future)",
      "MS Crown badge",
      "Scott-King Coast community",
      "Early access to new features",
      "Direct Chef Maurice coaching path",
    ],
    cta: "Go Master",
    highlighted: false,
  },
];

export function getPlan(tier: PlanTier): Plan {
  return PLANS.find((p) => p.tier === tier) ?? PLANS[0];
}

// Feature gate — check if a user's tier allows a specific feature.
export function canAccess(tier: PlanTier, feature: "unlimited_journal" | "ai_analysis" | "all_characters" | "trade_history"): boolean {
  const gates: Record<typeof feature, PlanTier[]> = {
    unlimited_journal: ["pro", "master"],
    ai_analysis:       ["pro", "master"],
    all_characters:    ["pro", "master"],
    trade_history:     ["pro", "master"],
  };
  return gates[feature].includes(tier);
}
