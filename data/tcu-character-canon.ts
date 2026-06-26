/**
 * TCU Market Kitchen — Character Canon (10 Official Characters)
 * OPS/011 — No non-canon characters allowed
 */

export type TCUCharacter = {
  id: string
  name: string
  role: string
  emoji: string
  color: string
  quote: string
  description: string
  teaches: string[]
  levels: string[]
}

export const TCU_CHARACTERS: TCUCharacter[] = [
  {
    id: 'trading-chef',
    name: 'Trading Chef / Chef Maurice',
    role: 'Head Chef — Academy Leader',
    emoji: '👨‍🍳',
    color: '#c9a84c',
    quote: 'Chef\'s Golden Rule: No setup, no serve.',
    description: 'The founder and head chef of TCU. Teaches the complete road map and oversees all operations. Appears in Level 1 (welcome), Level 7 (road map), and Level 9 (graduation).',
    teaches: ['Road Map', 'Trade Plans', 'Full Process', 'Graduation'],
    levels: ['level-1', 'level-7', 'level-9'],
  },
  {
    id: 'candle-kid',
    name: 'Candle Kid',
    role: 'Ingredient Specialist',
    emoji: '🕯️',
    color: '#F59E0B',
    quote: 'Every candle has a story. Read it before you react.',
    description: 'The candlestick expert. Teaches all about candle anatomy, patterns, and what price is telling you through individual bars.',
    teaches: ['Candlestick Anatomy', 'Patterns', 'Price Reading', 'Delivery'],
    levels: ['level-2', 'level-7'],
  },
  {
    id: 'grandma-market',
    name: 'Grandma Market',
    role: 'Structure & Trend Elder',
    emoji: '👵',
    color: '#8B5CF6',
    quote: 'Bias without structure is guesswork. I remember everything.',
    description: 'The wise elder who sees the bigger picture. Represents the 200 SMA and higher timeframe structure. Always knows the long-term direction.',
    teaches: ['Market Structure', '200 SMA', 'Bias', 'Higher Timeframes'],
    levels: ['level-3', 'level-6', 'level-7', 'level-9'],
  },
  {
    id: 'louie-liquidity',
    name: 'Louie Liquidity',
    role: 'Liquidity Scout',
    emoji: '💧',
    color: '#3B82F6',
    quote: 'Mark the line. The customers will come.',
    description: 'The liquidity expert who knows where resting orders cluster. Teaches how to identify, mark, and trade around liquidity sweeps.',
    teaches: ['Liquidity', 'Stop Hunts', 'Sweeps', 'Asia H/L'],
    levels: ['level-5', 'level-7', 'level-9'],
  },
  {
    id: 'nana-value',
    name: 'Nana Value',
    role: 'Fair Value Specialist',
    emoji: '👴',
    color: '#10B981',
    quote: 'Nana always knows the real value. Listen.',
    description: 'The VWAP and value specialist. Teaches fair value concepts, AOIs, and how to find zones where price is likely to react.',
    teaches: ['VWAP', 'AOI', 'Fair Value', 'Zones'],
    levels: ['level-6', 'level-7'],
  },

  {
    id: 'wickie',
    name: 'Wickie',
    role: 'Confirmation Guardian',
    emoji: '✅',
    color: '#22C55E',
    quote: 'If you cannot see it confirm, you cannot cook it.',
    description: 'The confirmation specialist. Will not let you enter a trade without proper lower timeframe confirmation. Patience incarnate.',
    teaches: ['Confirmation', 'Patience', 'Lower Timeframe', 'Validation'],
    levels: ['level-7', 'level-8'],
  },
  {
    id: 'melissa-mayhem',
    name: 'Melissa Mayhem',
    role: 'Psychology Coach',
    emoji: '🔥',
    color: '#EF4444',
    quote: 'I know the chaos. I have lived it. Learn from my fire.',
    description: 'The psychology teacher. Has experienced every emotional trading mistake and teaches how to manage fear, greed, and revenge trading.',
    teaches: ['Psychology', 'Emotional Control', 'Revenge Trading', 'Discipline'],
    levels: ['level-1', 'level-8'],
  },
  {
    id: 'rico-rhythm',
    name: 'Rico Rhythm',
    role: 'Session & Timing Expert',
    emoji: '🎵',
    color: '#F97316',
    quote: 'Stay in tune with price movement. Timing is everything.',
    description: 'The timing and session specialist. Teaches when to trade, which sessions are active, and how to align with market rhythm.',
    teaches: ['Sessions', 'Timing', 'Killzones', 'Market Rhythm'],
    levels: ['level-4'],
  },
  {
    id: 'burn-alarm',
    name: 'Burn Alarm',
    role: 'Risk Manager',
    emoji: '🚨',
    color: '#DC2626',
    quote: 'A missing stop is a red flag. Protect the kitchen.',
    description: 'The risk management enforcer. Never lets you trade without a stop loss. Teaches position sizing, risk limits, and trade management.',
    teaches: ['Stop Loss', 'Risk Management', 'Position Sizing', 'Trade Management'],
    levels: ['level-7', 'level-8'],
  },
  {
    id: 'profit-plate',
    name: 'Profit Plate',
    role: 'Target Specialist',
    emoji: '🍽️',
    color: '#A855F7',
    quote: 'Targets belong in the plan. Serve each table in order.',
    description: 'The take profit specialist. Teaches how to set and manage profit targets. Reminds you that profit is served, not grabbed.',
    teaches: ['Take Profit', 'Targets', 'Partial Close', 'Tables'],
    levels: ['level-7'],
  },
]

export function getCharacterById(id: string): TCUCharacter | undefined {
  return TCU_CHARACTERS.find(c => c.id === id)
}

export function getCharacterByName(name: string): TCUCharacter | undefined {
  return TCU_CHARACTERS.find(c => c.name.toLowerCase().includes(name.toLowerCase()))
}

export function getCharactersForLevel(levelId: string): TCUCharacter[] {
  return TCU_CHARACTERS.filter(c => c.levels.includes(levelId))
}
