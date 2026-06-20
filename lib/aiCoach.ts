export type AICoachRequest = {
  symbol: string;
  timeframe: string;
  notes?: string;
};

export type AICoachResult = {
  mode: "demo" | "live";
  message?: string;
  primaryBias: string;
  liquidityMap: string;
  aoi: string;
  setupQuality: string;
  entryIdea: string;
  burnPoint: string;
  tablesServed: string;
  invalidation: string;
  riskNote: string;
  characterLesson: string;
  journalSummary: string;
};

function buildDemoAnalysis(input: AICoachRequest): AICoachResult {
  const symbol = input.symbol || "EURUSD";
  const timeframe = input.timeframe || "15m";

  return {
    mode: "demo",
    message: "Demo AI analysis. Connect API key for live coaching.",
    primaryBias: `Neutral-to-bullish on ${timeframe}; confirm higher timeframe before the pass.`,
    liquidityMap: "Mark previous high/low and equal highs/lows for likely sweep zones.",
    aoi: "Watch demand leftover container under current price and nearest supply above.",
    setupQuality: "Medium — recipe is valid if confirmation candle closes in your AOI.",
    entryIdea: "The pass after confirmation candle with session flow alignment.",
    burnPoint: "Below most recent structure low / invalidation candle low.",
    tablesServed: "T1 at internal liquidity, T2 at external liquidity, runner optional.",
    invalidation: "Recipe fails if price closes back through AOI with opposite momentum.",
    riskNote: "Practice-size only; avoid FOMO entries during fast session expansion.",
    characterLesson: "Trading Chef: Bias -> Liquidity -> AOI -> Delivery -> Confirmation -> Entry -> Targets -> Management.",
    journalSummary: `${symbol} ${timeframe}: bias mapped, liquidity marked, AOI identified, entry and burn point defined.`,
  };
}

export async function analyzeWithAICoach(input: AICoachRequest): Promise<AICoachResult> {
  const provider = process.env.AI_PROVIDER || process.env.NEXT_PUBLIC_AI_PROVIDER;
  const openAiKey = process.env.OPENAI_API_KEY;

  if (!provider || !openAiKey) {
    return buildDemoAnalysis(input);
  }

  // Live provider hook point. Keep robust fallback so missing/misconfigured keys never break the app.
  return {
    ...buildDemoAnalysis(input),
    mode: "live",
    message: "Live provider configured. Replace adapter call with production prompt pipeline.",
  };
}
