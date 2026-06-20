export type MarketProvider =
  | "tradingview-widget"
  | "twelve-data"
  | "finnhub"
  | "polygon"
  | "alpaca"
  | "mock";

export type MarketProviderMode = MarketProvider;

export type MarketCategory = "Gold" | "Forex" | "Stocks" | "ETFs" | "Crypto" | "Indices";

export type MarketBias = "Bullish" | "Bearish" | "Neutral";

export type MarketSymbol = {
  ticker: string;
  name: string;
  category: MarketCategory;
  tvSymbol: string;
  tvFallbackSymbol?: string;
  basePrice: string;
  change: string;
  changePercent: string;
  bias: MarketBias;
  session: string;
};

export type WatchlistKey =
  | "favorites"
  | "gold"
  | "forex"
  | "stocks"
  | "crypto"
  | "indices";

export type Watchlist = {
  key: WatchlistKey;
  label: string;
  emoji: string;
  symbols: string[];
};

export type MarketProviderConfig = {
  mode: MarketProviderMode;
  hasApiKey: boolean;
};
