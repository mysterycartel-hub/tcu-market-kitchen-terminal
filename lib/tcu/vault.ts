export type ConceptCard = {
  id: string;
  title: string;
  shorthand: string;
  definition: string;
  clue: string;
  xp: number;
};

export type DailyReviewItem = {
  id: string;
  title: string;
  note: string;
};

export type CharacterLesson = {
  name: string;
  role: string;
  lesson: string;
  prompt: string;
};

export type ChefReadStep = {
  step: string;
  meaning: string;
};

export const CONCEPT_CARDS: ConceptCard[] = [
  {
    id: "bias",
    title: "Bias",
    shorthand: "Kitchen Direction",
    definition: "Which side has the higher-level edge before you think about entry.",
    clue: "Grandma Market: start with the bigger picture first.",
    xp: 10,
  },
  {
    id: "liquidity",
    title: "Liquidity",
    shorthand: "Flow",
    definition: "Where stops and resting orders may live, waiting to be grabbed.",
    clue: "Louie the Liquidity Chef: mark the pool before the move.",
    xp: 10,
  },
  {
    id: "aoi",
    title: "AOI",
    shorthand: "Prep Zone",
    definition: "Area of interest where price can pause, build, or prepare for movement.",
    clue: "Chef Goldie wants the prep zone before the pass.",
    xp: 10,
  },
  {
    id: "fvg",
    title: "FVG",
    shorthand: "Imbalance Gap",
    definition: "A fast move can leave an imbalance that price may revisit later.",
    clue: "Wickie watches for candle proof around the gap.",
    xp: 12,
  },
  {
    id: "ifvg",
    title: "IFVG",
    shorthand: "Inner Gap",
    definition: "A smaller imbalance inside the larger structure that can help refine timing.",
    clue: "Candle Kid learns the difference between big and small gaps.",
    xp: 12,
  },
  {
    id: "bos",
    title: "BOS",
    shorthand: "Structure Break",
    definition: "A break that confirms the market has pushed through a prior level.",
    clue: "Trading Chef says do not rush the first break without context.",
    xp: 14,
  },
  {
    id: "choch",
    title: "CHOCH",
    shorthand: "Character Shift",
    definition: "A change in market behavior that can signal a shift in direction.",
    clue: "Melody Mayhem tracks the rhythm when the story changes.",
    xp: 14,
  },
  {
    id: "targets",
    title: "Targets",
    shorthand: "Tables Served",
    definition: "Where the plan expects price to reach if the idea plays out.",
    clue: "Profit Plate wants a target before the trade gets saved.",
    xp: 12,
  },
  {
    id: "management",
    title: "Management",
    shorthand: "Protect the Plate",
    definition: "Risk control after entry: stops, adjustments, and staying calm.",
    clue: "Burn Alarm protects the plate and keeps the kitchen safe.",
    xp: 16,
  },
];

export const DAILY_REVIEW: DailyReviewItem[] = [
  { id: "bias", title: "Check bias", note: "Write the higher-timeframe direction before touching entry." },
  { id: "liquidity", title: "Mark liquidity", note: "Circle the pool, sweep zone, or obvious stop cluster." },
  { id: "aoi", title: "Identify AOI", note: "Find where price is preparing to react." },
  { id: "fvg", title: "Spot FVG / IFVG", note: "Look for imbalance and decide if it helps timing." },
  { id: "delivery", title: "Read delivery", note: "Wait for the path, not just the idea." },
  { id: "entry", title: "Wait for confirmation", note: "Use candle proof before the pass." },
  { id: "targets", title: "Set targets", note: "Define Tables Served and a burn point before saving." },
  { id: "mindset", title: "Protect the mind", note: "If the trade feels rushed, step back and breathe." },
];

export const CHARACTER_LESSONS: CharacterLesson[] = [
  { name: "Trading Chef", role: "Main guide", lesson: "Keep the plan clean and structured.", prompt: "What is the simplest version of this setup?" },
  { name: "Chef Goldie", role: "Gold specialist", lesson: "Gold respects timing, not hype.", prompt: "Where is the cleanest gold setup, not the fastest one?" },
  { name: "Wickie", role: "Candle coach", lesson: "Candles tell the truth when you wait for the close.", prompt: "What did the last candle prove?" },
  { name: "Louie the Liquidity Chef", role: "Liquidity coach", lesson: "Liquidity grabs are part of the story, not random noise.", prompt: "Where are the stops and why might price visit them?" },
  { name: "Grandma Market", role: "Patience coach", lesson: "If it feels urgent, you probably need more structure.", prompt: "Would Grandma Market approve this pace?" },
  { name: "Burn Alarm", role: "Risk guard", lesson: "A missing stop is a warning, not a suggestion.", prompt: "Where is the burn point before you press save?" },
  { name: "Profit Plate", role: "Target coach", lesson: "Targets make the plan real.", prompt: "What is the first plate to be served?" },
  { name: "Melissa Mayhem", role: "Emotion monitor", lesson: "If FOMO is loud, reduce size or wait.", prompt: "Are you trading the chart or the feeling?" },
  { name: "Melody Mayhem", role: "Timing coach", lesson: "Rhythm matters more than chasing movement.", prompt: "Does the market rhythm support the idea?" },
];

export const CHEF_READ_STEPS: ChefReadStep[] = [
  { step: "Bias", meaning: "Kitchen Direction" },
  { step: "Liquidity", meaning: "Flow" },
  { step: "AOI", meaning: "Prep Zone" },
  { step: "Delivery", meaning: "How Price Moves" },
  { step: "Confirmation", meaning: "Candle Proof" },
  { step: "Entry", meaning: "The Pass" },
  { step: "Targets", meaning: "Tables Served" },
  { step: "Management", meaning: "Protect the Plate" },
];

export const OVERTRADING_WARNINGS = [
  "Burn Alarm says take a breath before the next ticket.",
  "If you already forced one setup, pause and review the journal first.",
  "Grandma Market prefers patience over speed.",
  "No extra clicks just because the chart moved fast.",
];

export function getConceptReviewXp(reviewCount: number) {
  return reviewCount * 10;
}