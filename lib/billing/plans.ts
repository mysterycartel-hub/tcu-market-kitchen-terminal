export type SubscriptionTier = "free" | "starter" | "pro" | "founding";

export type Plan = {
  id: SubscriptionTier;
  name: string;
  tagline: string;
  monthlyPriceUsd: number | null;
  stripePriceEnvKey: string | null;
  features: string[];
  highlight: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free Kitchen",
    tagline: "Practice and learn the roadmap at no cost.",
    monthlyPriceUsd: 0,
    stripePriceEnvKey: null,
    features: [
      "TCU Terminal — full chart reading flow",
      "8-step Chef Read roadmap",
      "Journal entries (local)",
      "Practice kitchen tickets",
      "Concept vault (first 5 cards)",
      "XP and rank tracking",
    ],
    highlight: false,
  },
  {
    id: "starter",
    name: "Starter Chef",
    tagline: "Unlock full vault, missions, and synced progress.",
    monthlyPriceUsd: 9,
    stripePriceEnvKey: "STRIPE_PRICE_STARTER_MONTHLY",
    features: [
      "Everything in Free",
      "Full concept vault (all cards)",
      "All missions + XP rewards",
      "Progress synced to cloud (Supabase)",
      "Daily review checklist",
      "Chart upload + notes",
    ],
    highlight: false,
  },
  {
    id: "pro",
    name: "Pro Kitchen",
    tagline: "Live market context, advanced analysis, and priority access.",
    monthlyPriceUsd: 27,
    stripePriceEnvKey: "STRIPE_PRICE_PRO_MONTHLY",
    features: [
      "Everything in Starter",
      "Live TradingView chart in terminal",
      "All character coaches unlocked",
      "Advanced trade plan grading",
      "Journal export",
      "Priority Discord access",
    ],
    highlight: true,
  },
  {
    id: "founding",
    name: "Founding Member",
    tagline: "Locked-in founder rate — first 100 members only.",
    monthlyPriceUsd: 47,
    stripePriceEnvKey: "STRIPE_PRICE_FOUNDING_MONTHLY",
    features: [
      "Everything in Pro — forever",
      "Founding Member badge + XP bonus",
      "Direct input on roadmap features",
      "Lifetime access at founder rate",
      "Early access to all future tools",
    ],
    highlight: false,
  },
];

export function getPlan(tier: SubscriptionTier): Plan {
  return PLANS.find((p) => p.id === tier) ?? PLANS[0];
}

export function getStripePriceId(tier: SubscriptionTier): string | null {
  const plan = getPlan(tier);
  if (!plan.stripePriceEnvKey) return null;
  return process.env[plan.stripePriceEnvKey] ?? null;
}
