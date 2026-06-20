import type { Candle } from "@/lib/marketData";

export type TCUOverlayResult = {
  trendState: "bullish" | "bearish" | "range";
  swingHigh: number | null;
  swingLow: number | null;
  bos: string;
  choch: string;
  liquidity: string[];
  aoi: string[];
  tradePlan: {
    bias: string;
    entryArea: string;
    burnPoint: string;
    tablesServed: string;
    invalidation: string;
  };
};

export function buildTCUOverlay(candles: Candle[]): TCUOverlayResult {
  if (!candles.length) {
    return {
      trendState: "range",
      swingHigh: null,
      swingLow: null,
      bos: "No BOS detected.",
      choch: "No CHOCH detected.",
      liquidity: ["Mark previous high and previous low first."],
      aoi: ["Identify leftover container around recent imbalance."],
      tradePlan: {
        bias: "Neutral",
        entryArea: "Wait for the pass inside AOI.",
        burnPoint: "Below invalidation structure.",
        tablesServed: "T1 internal, T2 external liquidity.",
        invalidation: "Close beyond opposite AOI.",
      },
    };
  }

  const last = candles[candles.length - 1];
  const lookback = candles.slice(Math.max(0, candles.length - 40));
  const highs = lookback.map((c) => c.high);
  const lows = lookback.map((c) => c.low);
  const swingHigh = Math.max(...highs);
  const swingLow = Math.min(...lows);
  const midpoint = (swingHigh + swingLow) / 2;
  const trendState = last.close > midpoint ? "bullish" : last.close < midpoint ? "bearish" : "range";

  return {
    trendState,
    swingHigh,
    swingLow,
    bos: trendState === "bullish" ? "BOS up after liquidity sweep." : trendState === "bearish" ? "BOS down after liquidity sweep." : "Range structure, no clean BOS.",
    choch: "Watch for CHOCH near session high/low if momentum flips.",
    liquidity: [
      "Previous high / previous low",
      "Equal highs / equal lows",
      "Session highs/lows and sweep zones",
    ],
    aoi: [
      "Supply and demand zones",
      "FVG leftover container",
      "IFVG inner leftover container",
    ],
    tradePlan: {
      bias: trendState === "bullish" ? "Bullish" : trendState === "bearish" ? "Bearish" : "Neutral",
      entryArea: "The pass at confirmation inside AOI.",
      burnPoint: "Below/above structure invalidation candle.",
      tablesServed: "Scale at internal then external liquidity.",
      invalidation: "Break and close through opposite AOI.",
    },
  };
}
