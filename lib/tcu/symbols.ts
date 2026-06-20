export type MarketCategory = "Gold" | "Forex" | "Indices" | "ETFs" | "Stocks" | "Crypto";
export type MarketSymbol = {
  ticker: string;
  name: string;
  category: MarketCategory;
  tvSymbol: string;
  tvFallbackSymbol?: string;
  basePrice: string;
  change: string;
  changePercent: string;
  bias: "Bullish" | "Bearish" | "Neutral";
  session: string;
};
export const MARKET_SYMBOLS: MarketSymbol[] = [
  // ── Forex ──
  { ticker: "EURUSD",  name: "Euro / US Dollar",            category: "Forex",   basePrice: "1.0842",    change: "-0.0015",   changePercent: "-0.14%", bias: "Bearish", session: "London",      tvSymbol: "OANDA:EURUSD",  tvFallbackSymbol: "FX_IDC:EURUSD" },
  { ticker: "GBPUSD",  name: "British Pound / US Dollar",   category: "Forex",   basePrice: "1.2691",    change: "+0.0022",   changePercent: "+0.17%", bias: "Bullish", session: "London",      tvSymbol: "OANDA:GBPUSD",  tvFallbackSymbol: "FX_IDC:GBPUSD" },
  { ticker: "USDJPY",  name: "US Dollar / Japanese Yen",    category: "Forex",   basePrice: "157.42",    change: "+0.32",     changePercent: "+0.20%", bias: "Bullish", session: "Asia",        tvSymbol: "OANDA:USDJPY",  tvFallbackSymbol: "FX_IDC:USDJPY" },
  { ticker: "AUDUSD",  name: "Australian Dollar / US Dollar",category: "Forex",   basePrice: "0.6641",    change: "+0.0011",   changePercent: "+0.17%", bias: "Bullish", session: "Asia",        tvSymbol: "OANDA:AUDUSD",  tvFallbackSymbol: "FX_IDC:AUDUSD" },
  { ticker: "USDCAD",  name: "US Dollar / Canadian Dollar", category: "Forex",   basePrice: "1.3694",    change: "-0.0008",   changePercent: "-0.06%", bias: "Neutral", session: "NY Session",  tvSymbol: "OANDA:USDCAD",  tvFallbackSymbol: "FX_IDC:USDCAD" },
  // ── Gold ──
  { ticker: "XAUUSD",  name: "Gold / US Dollar",            category: "Gold",    basePrice: "2,341.80",  change: "+8.40",     changePercent: "+0.36%", bias: "Bullish", session: "NY Session",  tvSymbol: "OANDA:XAUUSD",  tvFallbackSymbol: "FX_IDC:XAUUSD" },
  { ticker: "GOLD",    name: "Gold Spot",                   category: "Gold",    basePrice: "2,341.80",  change: "+8.40",     changePercent: "+0.36%", bias: "Bullish", session: "NY Session",  tvSymbol: "TVC:GOLD" },
  // ── Indices ──
  { ticker: "NAS100",  name: "Nasdaq 100",                  category: "Indices", basePrice: "19,842.50", change: "+124.30",   changePercent: "+0.63%", bias: "Bullish", session: "NY Session",  tvSymbol: "CAPITALCOM:US100" },
  { ticker: "US30",    name: "Dow Jones 30",                category: "Indices", basePrice: "39,118.86", change: "-45.20",    changePercent: "-0.12%", bias: "Neutral", session: "NY Session",  tvSymbol: "CAPITALCOM:US30"  },
  { ticker: "SPX",     name: "S&P 500 Index",               category: "Indices", basePrice: "5,248.40",  change: "+18.60",    changePercent: "+0.36%", bias: "Bullish", session: "NY Session",  tvSymbol: "TVC:SPX" },
  // ── ETFs ──
  { ticker: "SPY",     name: "S&P 500 ETF (SPDR)",          category: "ETFs",    basePrice: "527.80",    change: "+3.20",     changePercent: "+0.61%", bias: "Bullish", session: "NY Session",  tvSymbol: "AMEX:SPY"         },
  { ticker: "QQQ",     name: "Nasdaq 100 ETF (Invesco)",    category: "ETFs",    basePrice: "448.24",    change: "+5.10",     changePercent: "+1.15%", bias: "Bullish", session: "NY Session",  tvSymbol: "NASDAQ:QQQ"       },
  // ── Stocks ──
  { ticker: "AAPL",    name: "Apple Inc.",                  category: "Stocks",  basePrice: "189.84",    change: "+1.42",     changePercent: "+0.75%", bias: "Bullish", session: "NY Session",  tvSymbol: "NASDAQ:AAPL"      },
  { ticker: "TSLA",    name: "Tesla Inc.",                  category: "Stocks",  basePrice: "248.23",    change: "-4.15",     changePercent: "-1.64%", bias: "Bearish", session: "NY Session",  tvSymbol: "NASDAQ:TSLA"      },
  { ticker: "NVDA",    name: "NVIDIA Corporation",          category: "Stocks",  basePrice: "874.15",    change: "+22.40",    changePercent: "+2.63%", bias: "Bullish", session: "NY Session",  tvSymbol: "NASDAQ:NVDA"      },
  { ticker: "MSFT",    name: "Microsoft Corporation",       category: "Stocks",  basePrice: "414.20",    change: "+1.80",     changePercent: "+0.44%", bias: "Bullish", session: "NY Session",  tvSymbol: "NASDAQ:MSFT"      },
  { ticker: "AMZN",    name: "Amazon.com Inc.",             category: "Stocks",  basePrice: "184.72",    change: "+2.31",     changePercent: "+1.27%", bias: "Bullish", session: "NY Session",  tvSymbol: "NASDAQ:AMZN"      },
  { ticker: "META",    name: "Meta Platforms Inc.",         category: "Stocks",  basePrice: "503.64",    change: "+7.82",     changePercent: "+1.58%", bias: "Bullish", session: "NY Session",  tvSymbol: "NASDAQ:META"      },
  // ── Crypto ──
  { ticker: "BTCUSD",  name: "Bitcoin / US Dollar",         category: "Crypto",  basePrice: "67,842.00", change: "+1,204.00", changePercent: "+1.81%", bias: "Bullish", session: "24/7",        tvSymbol: "BITSTAMP:BTCUSD"  },
  { ticker: "ETHUSD",  name: "Ethereum / US Dollar",        category: "Crypto",  basePrice: "3,512.40",  change: "+88.20",    changePercent: "+2.58%", bias: "Bullish", session: "24/7",        tvSymbol: "BITSTAMP:ETHUSD"  },
];
export const SYMBOL_CATEGORIES: MarketCategory[] = ["Gold", "Forex", "Stocks", "ETFs", "Crypto", "Indices"];
export const DEFAULT_SYMBOL = MARKET_SYMBOLS.find((symbol) => symbol.ticker === "EURUSD") ?? MARKET_SYMBOLS[0];
