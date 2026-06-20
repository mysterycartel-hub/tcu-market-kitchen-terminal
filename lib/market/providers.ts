import type { MarketProvider, MarketProviderConfig, MarketProviderMode, MarketSymbol } from "./types";
import { resolveTVSymbol } from "./symbols";

// Active provider is controlled by NEXT_PUBLIC_MARKET_PROVIDER env var.
// Only "tradingview-widget" is wired up in MVP — others are placeholders
// for paid API integrations added in a future phase.
export function getActiveProvider(): MarketProvider {
  const env = process.env.NEXT_PUBLIC_MARKET_PROVIDER as MarketProvider | undefined;
  return env ?? "tradingview-widget";
}

export function getMarketProviderMode(): MarketProviderMode {
  return getActiveProvider();
}

export function isTradingViewProvider(provider: MarketProvider): boolean {
  return provider === "tradingview-widget";
}

const PROVIDER_API_KEYS: Partial<Record<MarketProvider, string | undefined>> = {
  "twelve-data": process.env.TWELVE_DATA_API_KEY,
  finnhub: process.env.FINNHUB_API_KEY,
  polygon: process.env.POLYGON_API_KEY,
  alpaca: process.env.ALPACA_API_KEY,
};

export function getMarketProviderConfig(): MarketProviderConfig {
  const mode = getMarketProviderMode();
  return {
    mode,
    hasApiKey: Boolean(PROVIDER_API_KEYS[mode]),
  };
}

export function resolveTradingViewSymbol(symbol: MarketSymbol): string {
  return symbol.tvSymbol || resolveTVSymbol(symbol.ticker);
}

// Future: each provider will expose fetchQuote(ticker), fetchCandles(...) etc.
// When the provider is not "tradingview-widget", the chart falls back to PracticeChart
// until the corresponding API client is implemented.
export const PROVIDER_LABELS: Record<MarketProvider, string> = {
  "tradingview-widget": "TradingView (Live Chart)",
  "twelve-data":        "Twelve Data (API)",
  "finnhub":            "Finnhub (API)",
  "polygon":            "Polygon.io (API)",
  "alpaca":             "Alpaca Markets (API)",
  "mock":               "Mock / Offline",
};
