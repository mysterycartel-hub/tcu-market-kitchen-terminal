import { type MarketSymbol } from "./symbols";

export type MarketKitchenKey =
  | "Forex Kitchen"
  | "Gold Kitchen"
  | "Index Kitchen"
  | "Stock Kitchen"
  | "Crypto Kitchen"
  | "Practice Kitchen";

export type MarketKitchenOption = {
  label: string;
  ticker?: string;
  action?: "practice" | "upload";
};

export type MarketKitchenConfig = {
  key: MarketKitchenKey;
  title: string;
  subtitle: string;
  defaultTicker?: string;
  options: MarketKitchenOption[];
  focusCharacters: string[];
};

export const MARKET_KITCHENS: MarketKitchenConfig[] = [
  {
    key: "Forex Kitchen",
    title: "Trading Chef University · Forex Kitchen",
    subtitle: "Choose your Market Kitchen. TCU teaches market structure across forex, gold, stocks, indexes, and crypto.",
    defaultTicker: "EURUSD",
    options: [
      { label: "EURUSD", ticker: "EURUSD" },
      { label: "GBPUSD", ticker: "GBPUSD" },
      { label: "USDJPY", ticker: "USDJPY" },
      { label: "AUDUSD", ticker: "AUDUSD" },
      { label: "USDCAD", ticker: "USDCAD" },
    ],
    focusCharacters: ["Trading Chef", "Louie the Liquidity Chef", "Wickie"],
  },
  {
    key: "Gold Kitchen",
    title: "Chef Goldie's Gold Kitchen",
    subtitle: "Choose your Market Kitchen. TCU teaches market structure across forex, gold, stocks, indexes, and crypto.",
    defaultTicker: "XAUUSD",
    options: [
      { label: "XAUUSD", ticker: "XAUUSD" },
      { label: "GOLD", ticker: "GOLD" },
    ],
    focusCharacters: ["Chef Goldie", "Burn Alarm"],
  },
  {
    key: "Index Kitchen",
    title: "Index Kitchen",
    subtitle: "Choose your Market Kitchen. TCU teaches market structure across forex, gold, stocks, indexes, and crypto.",
    defaultTicker: "NAS100",
    options: [
      { label: "NAS100", ticker: "NAS100" },
      { label: "US30", ticker: "US30" },
      { label: "SPX", ticker: "SPX" },
      { label: "SPY", ticker: "SPY" },
      { label: "QQQ", ticker: "QQQ" },
    ],
    focusCharacters: ["Grandma Market", "Wickie"],
  },
  {
    key: "Stock Kitchen",
    title: "Mr. Stocks Ownership Kitchen",
    subtitle: "Choose your Market Kitchen. TCU teaches market structure across forex, gold, stocks, indexes, and crypto.",
    defaultTicker: "AAPL",
    options: [
      { label: "AAPL", ticker: "AAPL" },
      { label: "MSFT", ticker: "MSFT" },
      { label: "NVDA", ticker: "NVDA" },
      { label: "TSLA", ticker: "TSLA" },
      { label: "SPY", ticker: "SPY" },
      { label: "QQQ", ticker: "QQQ" },
    ],
    focusCharacters: ["Mr. Stocks", "Penny / Angel Stacks"],
  },
  {
    key: "Crypto Kitchen",
    title: "Volatility Kitchen",
    subtitle: "Choose your Market Kitchen. TCU teaches market structure across forex, gold, stocks, indexes, and crypto.",
    defaultTicker: "BTCUSD",
    options: [
      { label: "BTCUSD", ticker: "BTCUSD" },
      { label: "ETHUSD", ticker: "ETHUSD" },
    ],
    focusCharacters: ["Burn Alarm", "Melissa Mayhem"],
  },
  {
    key: "Practice Kitchen",
    title: "TCU Practice Kitchen",
    subtitle: "Choose your Market Kitchen. TCU teaches market structure across forex, gold, stocks, indexes, and crypto.",
    options: [
      { label: "TCU Practice Chart", action: "practice" },
      { label: "Upload Chart", action: "upload" },
    ],
    focusCharacters: ["Trading Chef", "Candle Kid"],
  },
];

export function getMarketKitchenConfig(kitchen: MarketKitchenKey) {
  return MARKET_KITCHENS.find((entry) => entry.key === kitchen) ?? MARKET_KITCHENS[0];
}

export function getMarketKitchenOptions(kitchen: MarketKitchenKey) {
  return getMarketKitchenConfig(kitchen).options;
}

export function getMarketKitchenTitle(kitchen: MarketKitchenKey) {
  return getMarketKitchenConfig(kitchen).title;
}

export function getMarketKitchenSubtitle(kitchen: MarketKitchenKey) {
  return getMarketKitchenConfig(kitchen).subtitle;
}

export function getMarketKitchenFocusCharacters(kitchen: MarketKitchenKey) {
  return getMarketKitchenConfig(kitchen).focusCharacters;
}

export function getDefaultTickerForKitchen(kitchen: MarketKitchenKey) {
  return getMarketKitchenConfig(kitchen).defaultTicker ?? "EURUSD";
}

const TRADINGVIEW_SYMBOL_CANDIDATES: Record<string, string[]> = {
  EURUSD: ["OANDA:EURUSD", "FX_IDC:EURUSD"],
  GBPUSD: ["OANDA:GBPUSD", "FX_IDC:GBPUSD"],
  USDJPY: ["OANDA:USDJPY", "FX_IDC:USDJPY"],
  AUDUSD: ["OANDA:AUDUSD", "FX_IDC:AUDUSD"],
  USDCAD: ["OANDA:USDCAD", "FX_IDC:USDCAD"],
  XAUUSD: ["OANDA:XAUUSD", "FX_IDC:XAUUSD", "TVC:GOLD"],
  GOLD: ["TVC:GOLD"],
  NAS100: ["CAPITALCOM:US100", "OANDA:NAS100USD"],
  US30: ["CAPITALCOM:US30", "OANDA:US30USD"],
  SPX: ["SP:SPX", "TVC:SPX"],
  SPY: ["AMEX:SPY"],
  QQQ: ["NASDAQ:QQQ"],
  AAPL: ["NASDAQ:AAPL"],
  MSFT: ["NASDAQ:MSFT"],
  NVDA: ["NASDAQ:NVDA"],
  TSLA: ["NASDAQ:TSLA"],
  BTCUSD: ["BITSTAMP:BTCUSD", "COINBASE:BTCUSD"],
  ETHUSD: ["BITSTAMP:ETHUSD", "COINBASE:ETHUSD"],
};

export function getTradingViewSymbolCandidates(ticker: string) {
  return TRADINGVIEW_SYMBOL_CANDIDATES[ticker] ?? [ticker];
}

export function resolveTradingViewSymbolForTicker(ticker: string) {
  return getTradingViewSymbolCandidates(ticker)[0] ?? ticker;
}

export function resolveTradingViewSymbol(symbol: MarketSymbol) {
  return resolveTradingViewSymbolForTicker(symbol.ticker);
}
