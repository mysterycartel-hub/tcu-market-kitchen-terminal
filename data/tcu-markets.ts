/**
 * TCU Market Kitchen — Supported Market Pairs
 * OPS/011
 */

export type MarketPair = {
  symbol: string
  name: string
  label?: string
  primary?: boolean
}

export type MarketCategory = {
  id: string
  name: string
  emoji: string
  pairs: MarketPair[]
}

export const TCU_MARKETS = {
  goldKitchen: [
    { symbol: 'XAUUSD', name: 'Gold Kitchen', label: 'Gold / USD', primary: true },
  ],
  forexKitchen: [
    { symbol: 'GBPJPY', name: 'British Pound / Yen' },
    { symbol: 'EURUSD', name: 'Euro / USD' },
    { symbol: 'GBPUSD', name: 'Pound / USD' },
    { symbol: 'USDJPY', name: 'USD / Yen' },
    { symbol: 'AUDUSD', name: 'Aussie / USD' },
    { symbol: 'USDCAD', name: 'USD / CAD' },
  ],
  cryptoLab: [
    { symbol: 'BTCUSD', name: 'Bitcoin Lab', label: 'BTC / USD' },
    { symbol: 'BTCUSDT', name: 'Bitcoin Lab (T)', label: 'BTC / USDT' },
  ],
  stocksWatch: [
    { symbol: 'SPY', name: 'S&P 500' },
    { symbol: 'QQQ', name: 'Nasdaq' },
    { symbol: 'NVDA', name: 'Nvidia' },
    { symbol: 'META', name: 'Meta' },
    { symbol: 'GOOG', name: 'Google' },
    { symbol: 'COIN', name: 'Coinbase' },
  ],
}

export const TCU_MARKET_CATEGORIES: MarketCategory[] = [
  { id: 'gold', name: 'Gold Kitchen', emoji: '🥇', pairs: TCU_MARKETS.goldKitchen },
  { id: 'forex', name: 'Forex Kitchen', emoji: '💱', pairs: TCU_MARKETS.forexKitchen },
  { id: 'crypto', name: 'Crypto Lab', emoji: '🔬', pairs: TCU_MARKETS.cryptoLab },
  { id: 'stocks', name: 'Stocks Watch', emoji: '📈', pairs: TCU_MARKETS.stocksWatch },
]

export function getAllSymbols(): string[] {
  return [
    ...TCU_MARKETS.goldKitchen,
    ...TCU_MARKETS.forexKitchen,
    ...TCU_MARKETS.cryptoLab,
    ...TCU_MARKETS.stocksWatch,
  ].map(p => p.symbol)
}

export function getMarketForSymbol(symbol: string): MarketPair | undefined {
  const all = [
    ...TCU_MARKETS.goldKitchen,
    ...TCU_MARKETS.forexKitchen,
    ...TCU_MARKETS.cryptoLab,
    ...TCU_MARKETS.stocksWatch,
  ]
  return all.find(p => p.symbol === symbol)
}
