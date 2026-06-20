export type Candle = {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
};

export type MarketDataResult = {
  source: "demo" | "live";
  symbol: string;
  timeframe: string;
  candles: Candle[];
  error?: string;
};

const DEMO_BASE: Record<string, number> = {
  XAUUSD: 2340,
  EURUSD: 1.08,
  GBPUSD: 1.27,
  USDJPY: 157,
  SPY: 525,
  QQQ: 448,
  BTCUSD: 68000,
};

function generateDemoCandles(symbol: string, timeframe: string, count = 200): Candle[] {
  const now = Date.now();
  const base = DEMO_BASE[symbol] ?? 100;
  const stepMs =
    timeframe === "1m" ? 60_000 :
    timeframe === "5m" ? 300_000 :
    timeframe === "15m" ? 900_000 :
    timeframe === "30m" ? 1_800_000 :
    timeframe === "1H" ? 3_600_000 :
    timeframe === "4H" ? 14_400_000 :
    86_400_000;

  const candles: Candle[] = [];
  let last = base;

  for (let i = count; i > 0; i--) {
    const time = now - i * stepMs;
    const drift = (Math.sin(i / 7) + Math.cos(i / 13)) * (base > 10 ? base * 0.0009 : 0.0009);
    const open = last;
    const close = Math.max(0.0001, open + drift);
    const high = Math.max(open, close) + Math.abs(drift * 0.8);
    const low = Math.min(open, close) - Math.abs(drift * 0.8);
    candles.push({ time, open, high, low, close, volume: Math.round(1000 + Math.abs(drift) * 100000) });
    last = close;
  }

  return candles;
}

export async function getCandles(symbol: string, timeframe: string): Promise<MarketDataResult> {
  const provider = process.env.NEXT_PUBLIC_MARKET_DATA_PROVIDER || process.env.MARKET_DATA_PROVIDER;
  const key = process.env.MARKET_DATA_API_KEY;

  if (!provider || !key) {
    return {
      source: "demo",
      symbol,
      timeframe,
      candles: generateDemoCandles(symbol, timeframe),
    };
  }

  // Live provider hook point. Keep fallback behavior so chart never renders empty.
  return {
    source: "demo",
    symbol,
    timeframe,
    candles: generateDemoCandles(symbol, timeframe),
    error: `Live provider ${provider} adapter not implemented yet. Showing demo candles.`,
  };
}
