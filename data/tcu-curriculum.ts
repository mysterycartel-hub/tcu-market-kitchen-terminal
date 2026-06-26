/**
 * TCU Market Kitchen — Full Curriculum Data
 * 9 Levels | 50 Lessons | Road Map | Glossary | Micro-Levels
 * OPS/011 — Trading Chef University Academy Platform
 */

export type TCULesson = {
  id: string
  levelId: string
  title: string
  chefTitle: string
  duration: string
  type: 'lesson' | 'quiz' | 'practice' | 'review'
  xp: number
  character: string
  summary: string
  keyPoints: string[]
  chefQuote: string
  glossaryTerms: string[]
  locked: boolean
}

export type TCULevel = {
  id: string
  number: number
  title: string
  chefTitle: string
  description: string
  character: string
  xpRequired: number
  lessons: TCULesson[]
}


export const TCU_LEVELS: TCULevel[] = [
  {
    id: 'level-1',
    number: 1,
    title: 'Welcome to the Market',
    chefTitle: 'Welcome Kitchen',
    description: 'Introduction to Trading Chef University. Learn what the market is, how TCU works, and meet the characters.',
    character: 'Trading Chef',
    xpRequired: 0,
    lessons: [
      {
        id: 'l1-01', levelId: 'level-1', title: 'What is the Market?', chefTitle: 'What is a Restaurant?',
        duration: '8 min', type: 'lesson', xp: 15, character: 'Trading Chef',
        summary: 'The market is like a restaurant — buyers and sellers come together, orders are placed, and price moves based on supply and demand.',
        keyPoints: ['Markets are auction systems', 'Price reflects supply and demand', 'Every candle tells a story', 'TCU teaches you to read the menu'],
        chefQuote: 'Every great chef starts by understanding what a kitchen is before they cook.',
        glossaryTerms: ['Market', 'Price Action', 'Supply', 'Demand'], locked: false
      },
      {
        id: 'l1-02', levelId: 'level-1', title: 'Meet the TCU Characters', chefTitle: 'Meet the Kitchen Crew',
        duration: '6 min', type: 'lesson', xp: 10, character: 'Trading Chef',
        summary: 'Meet all 10 TCU characters who will guide you through your trading education journey.',
        keyPoints: ['Each character teaches a specific concept', 'Characters appear in lessons they specialize in', 'The crew works together like a real kitchen', 'You unlock characters as you progress'],
        chefQuote: 'A kitchen runs on teamwork. Every character here has a role — and so do you.',
        glossaryTerms: ['Trading Chef', 'Kitchen Crew'], locked: false
      },

      {
        id: 'l1-03', levelId: 'level-1', title: 'How TCU Works', chefTitle: 'Kitchen Rules',
        duration: '5 min', type: 'lesson', xp: 10, character: 'Trading Chef',
        summary: 'How the academy is structured: levels, XP, quizzes, journal, and the road map.',
        keyPoints: ['Complete lessons to earn XP', 'XP unlocks new levels', 'Journal every trade', 'Follow the 8-step Road Map'],
        chefQuote: 'The menu is set. Follow the steps and you will eat well.',
        glossaryTerms: ['XP', 'Road Map', 'Journal'], locked: false
      },
      {
        id: 'l1-04', levelId: 'level-1', title: 'Trading is Not Gambling', chefTitle: 'Cooking is Not Guessing',
        duration: '7 min', type: 'lesson', xp: 15, character: 'Melissa Mayhem',
        summary: 'Understanding the difference between trading with a plan and gambling on emotion.',
        keyPoints: ['Trading requires a plan', 'Gambling is random entries', 'Emotion is your enemy', 'Process over prediction'],
        chefQuote: 'If you walk into a kitchen without a recipe, you are not cooking — you are experimenting with fire.',
        glossaryTerms: ['Trade Plan', 'Risk Management'], locked: false
      },
      {
        id: 'l1-05', levelId: 'level-1', title: 'Level 1 Quiz', chefTitle: 'Kitchen Entrance Exam',
        duration: '5 min', type: 'quiz', xp: 25, character: 'Trading Chef',
        summary: 'Test your understanding of what the market is and how TCU works.',
        keyPoints: ['5 questions', '70% to pass', 'Unlocks Level 2', 'Can retry without XP re-award'],
        chefQuote: 'Show me you understand the kitchen before I hand you a knife.',
        glossaryTerms: [], locked: false
      },
    ]
  },

  {
    id: 'level-2',
    number: 2,
    title: 'Candlestick Basics',
    chefTitle: 'Ingredient Anatomy',
    description: 'Learn how to read individual candles — the building blocks of all price action.',
    character: 'Candle Kid',
    xpRequired: 50,
    lessons: [
      {
        id: 'l2-01', levelId: 'level-2', title: 'Candle Anatomy', chefTitle: 'Breaking Down the Ingredient',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Candle Kid',
        summary: 'Every candle has an open, high, low, and close. Learn to read the body and wicks.',
        keyPoints: ['Open and Close form the body', 'Wicks show rejection', 'Green = bullish close', 'Red = bearish close'],
        chefQuote: 'Before you cook, you must know every ingredient by sight, smell, and texture.',
        glossaryTerms: ['Candle', 'Open', 'Close', 'Wick', 'Body'], locked: true
      },
      {
        id: 'l2-02', levelId: 'level-2', title: 'Bullish vs Bearish Candles', chefTitle: 'Hot vs Cold Dishes',
        duration: '8 min', type: 'lesson', xp: 15, character: 'Candle Kid',
        summary: 'Distinguish between bullish (hot) and bearish (cold) candles and what they signal.',
        keyPoints: ['Bullish = buyers in control', 'Bearish = sellers in control', 'Body size = conviction', 'Context matters more than color'],
        chefQuote: 'A hot dish warms the table. A cold dish cools it. Know what is being served.',
        glossaryTerms: ['Bullish', 'Bearish', 'Momentum'], locked: true
      },

      {
        id: 'l2-03', levelId: 'level-2', title: 'Wicks, Bodies, and Closes', chefTitle: 'The Anatomy of Every Dish',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Candle Kid',
        summary: 'Deep dive into what long wicks, small bodies, and close positions tell you.',
        keyPoints: ['Long wick = rejection', 'Small body = indecision', 'Close near high = bullish', 'Close near low = bearish'],
        chefQuote: 'The wick is the story the candle tried to hide. Read it.',
        glossaryTerms: ['Rejection', 'Indecision', 'Doji'], locked: true
      },
      {
        id: 'l2-04', levelId: 'level-2', title: 'Key Candle Patterns', chefTitle: 'Signature Dishes',
        duration: '12 min', type: 'lesson', xp: 20, character: 'Candle Kid',
        summary: 'Engulfing, pin bar, doji, and hammer — the signature patterns every chef must know.',
        keyPoints: ['Engulfing = strong reversal signal', 'Pin bar = rejection', 'Doji = market pause', 'Hammer = potential bottom'],
        chefQuote: 'Learn four signature dishes perfectly before you try the whole menu.',
        glossaryTerms: ['Engulfing', 'Pin Bar', 'Doji', 'Hammer'], locked: true
      },
      {
        id: 'l2-05', levelId: 'level-2', title: 'Level 2 Quiz', chefTitle: 'Ingredient Test',
        duration: '5 min', type: 'quiz', xp: 30, character: 'Candle Kid',
        summary: 'Test your candle reading skills. Identify patterns and predict next moves.',
        keyPoints: ['8 questions', '70% to pass', 'Unlocks Level 3', 'Includes chart examples'],
        chefQuote: 'If you cannot read the ingredient, you cannot cook the dish.',
        glossaryTerms: [], locked: true
      },
    ]
  },

  {
    id: 'level-3',
    number: 3,
    title: 'Market Structure',
    chefTitle: 'Kitchen Organization',
    description: 'Learn how the market is organized — support, resistance, trends, and structure shifts.',
    character: 'Grandma Market',
    xpRequired: 150,
    lessons: [
      {
        id: 'l3-01', levelId: 'level-3', title: 'Support and Resistance', chefTitle: 'Restock vs Overstock Shelf',
        duration: '12 min', type: 'lesson', xp: 20, character: 'Grandma Market',
        summary: 'Price bounces between levels where buyers restock (support) and sellers overstock (resistance).',
        keyPoints: ['Support = floor where buyers step in', 'Resistance = ceiling where sellers appear', 'Levels flip roles', 'More touches = stronger level'],
        chefQuote: 'Grandma always knows where the shelves are. The kitchen runs on structure.',
        glossaryTerms: ['Support', 'Resistance', 'Level', 'Flip Zone'], locked: true
      },
      {
        id: 'l3-02', levelId: 'level-3', title: 'Swing Highs and Swing Lows', chefTitle: 'Peaks and Valleys of the Kitchen',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Grandma Market',
        summary: 'Identify swing points — the peaks and valleys that define market movement.',
        keyPoints: ['Swing high = local peak', 'Swing low = local valley', 'Connect swings to see structure', 'HH/HL = uptrend, LH/LL = downtrend'],
        chefQuote: 'Every kitchen has busy peaks and quiet valleys. Learn to see the rhythm.',
        glossaryTerms: ['Swing High', 'Swing Low', 'Higher High', 'Lower Low'], locked: true
      },

      {
        id: 'l3-03', levelId: 'level-3', title: 'Trend Identification', chefTitle: 'Rush Hour Direction',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Grandma Market',
        summary: 'Learn to identify the current trend using HH/HL for bullish and LH/LL for bearish.',
        keyPoints: ['HH + HL = bullish trend', 'LH + LL = bearish trend', 'No clear pattern = ranging', 'Trade WITH the trend'],
        chefQuote: 'Do not fight rush hour traffic. Cook in the direction the kitchen is moving.',
        glossaryTerms: ['Trend', 'Uptrend', 'Downtrend', 'Range'], locked: true
      },
      {
        id: 'l3-04', levelId: 'level-3', title: 'CHoCH and BOS', chefTitle: 'Menu Change and Delivery Confirmation',
        duration: '14 min', type: 'lesson', xp: 25, character: 'Grandma Market',
        summary: 'Change of Character (CHoCH) signals a potential trend shift. Break of Structure (BOS) confirms continuation.',
        keyPoints: ['CHoCH = first sign trend may change', 'BOS = confirmation trend continues', 'CHoCH is early warning', 'BOS is confirmation signal'],
        chefQuote: 'When the menu changes, pay attention. When delivery confirms, you can cook.',
        glossaryTerms: ['CHoCH', 'BOS', 'Structure Shift', 'Confirmation'], locked: true
      },
      {
        id: 'l3-05', levelId: 'level-3', title: 'Market Structure Practice', chefTitle: 'Kitchen Layout Drill',
        duration: '15 min', type: 'practice', xp: 30, character: 'Grandma Market',
        summary: 'Practice identifying structure on real chart examples. Mark HH, HL, LH, LL, CHoCH, and BOS.',
        keyPoints: ['Mark swing points on charts', 'Identify trend direction', 'Spot CHoCH early', 'Confirm BOS before acting'],
        chefQuote: 'Practice the layout until your hands move without thinking.',
        glossaryTerms: [], locked: true
      },
      {
        id: 'l3-06', levelId: 'level-3', title: 'Level 3 Quiz', chefTitle: 'Structure Certification',
        duration: '8 min', type: 'quiz', xp: 35, character: 'Grandma Market',
        summary: 'Prove you can read market structure. Identify trends, CHoCH, and BOS on charts.',
        keyPoints: ['10 questions', '70% to pass', 'Chart-based questions', 'Unlocks Level 4'],
        chefQuote: 'No chef advances without proving they know the kitchen layout.',
        glossaryTerms: [], locked: true
      },
    ]
  },

  {
    id: 'level-4',
    number: 4,
    title: 'Trading Sessions',
    chefTitle: 'Kitchen Shifts',
    description: 'Understand when the market is active — Asia, London, and New York sessions.',
    character: 'Rico Rhythm',
    xpRequired: 300,
    lessons: [
      {
        id: 'l4-01', levelId: 'level-4', title: 'Asia, London, New York', chefTitle: 'The Three Kitchen Shifts',
        duration: '12 min', type: 'lesson', xp: 20, character: 'Rico Rhythm',
        summary: 'Markets operate in three major sessions. Each has different energy, liquidity, and behavior.',
        keyPoints: ['Asia = slow inventory count', 'London = aggressive plates clearing', 'New York = main service rush', 'Overlap = highest volume'],
        chefQuote: 'Every kitchen has a morning crew, lunch rush, and evening service. Trade the right shift.',
        glossaryTerms: ['Session', 'Asia Session', 'London Session', 'New York Session'], locked: true
      },
      {
        id: 'l4-02', levelId: 'level-4', title: 'Session Characteristics', chefTitle: 'Shift Personalities',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Rico Rhythm',
        summary: 'Each session has unique characteristics. Learn what to expect and when to trade.',
        keyPoints: ['Asia sets the range', 'London breaks the range', 'NY continues or reverses', 'Dead zones = no trade'],
        chefQuote: 'Know the personality of each shift before you clock in.',
        glossaryTerms: ['Range', 'Breakout', 'Dead Zone'], locked: true
      },
      {
        id: 'l4-03', levelId: 'level-4', title: 'Time-Based Setups', chefTitle: 'When to Plate',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Rico Rhythm',
        summary: 'Learn which setups work best in which sessions and when NOT to trade.',
        keyPoints: ['London open = sweep setups', 'NY open = continuation', '8:30am EST = news spike', 'Avoid low-liquidity hours'],
        chefQuote: 'The best dish at the wrong time is still a failed service.',
        glossaryTerms: ['Killzone', 'Low Liquidity'], locked: true
      },
      {
        id: 'l4-04', levelId: 'level-4', title: 'Session Overlap Strategy', chefTitle: 'Rush Hour Mastery',
        duration: '8 min', type: 'lesson', xp: 15, character: 'Rico Rhythm',
        summary: 'The London/NY overlap is the most volatile period. Learn to use it safely.',
        keyPoints: ['Highest volume of the day', 'Both sessions active', 'Wide moves possible', 'Tighten risk management'],
        chefQuote: 'Rush hour is where fortunes are made — and where rookies get burned.',
        glossaryTerms: ['Overlap', 'Volume', 'Volatility'], locked: true
      },
      {
        id: 'l4-05', levelId: 'level-4', title: 'Level 4 Quiz', chefTitle: 'Shift Schedule Test',
        duration: '5 min', type: 'quiz', xp: 30, character: 'Rico Rhythm',
        summary: 'Prove you know when to trade and when to stay out of the kitchen.',
        keyPoints: ['6 questions', '70% to pass', 'Time-based scenarios', 'Unlocks Level 5'],
        chefQuote: 'A chef who does not know the schedule will burn the whole service.',
        glossaryTerms: [], locked: true
      },
    ]
  },

  {
    id: 'level-5',
    number: 5,
    title: 'Liquidity',
    chefTitle: 'Customer Flow',
    description: 'Learn where liquidity sits, how it gets swept, and why it matters for entries.',
    character: 'Louie Liquidity',
    xpRequired: 450,
    lessons: [
      {
        id: 'l5-01', levelId: 'level-5', title: 'What is Liquidity?', chefTitle: 'Where the Customers Are Waiting',
        duration: '12 min', type: 'lesson', xp: 25, character: 'Louie Liquidity',
        summary: 'Liquidity is where orders cluster — stops, limits, and pending orders that the market targets.',
        keyPoints: ['Liquidity = resting orders', 'Found above highs and below lows', 'Market makers hunt liquidity', 'Sweep = liquidity taken'],
        chefQuote: 'Louie knows where the customers are waiting. Mark the line. Let them come to you.',
        glossaryTerms: ['Liquidity', 'Stop Hunt', 'Sweep', 'Resting Orders'], locked: true
      },
      {
        id: 'l5-02', levelId: 'level-5', title: 'Liquidity Pools', chefTitle: 'Customer Clusters',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Louie Liquidity',
        summary: 'Identify where liquidity pools form: equal highs, equal lows, trendline touches.',
        keyPoints: ['Equal highs = buy-side liquidity', 'Equal lows = sell-side liquidity', 'Trendline stops cluster', 'More obvious = more liquid'],
        chefQuote: 'The bigger the line outside, the more likely the kitchen opens early.',
        glossaryTerms: ['Buy-Side Liquidity', 'Sell-Side Liquidity', 'Equal Highs', 'Equal Lows'], locked: true
      },
      {
        id: 'l5-03', levelId: 'level-5', title: 'Liquidity Sweeps', chefTitle: 'The Rush Before the Calm',
        duration: '12 min', type: 'lesson', xp: 25, character: 'Louie Liquidity',
        summary: 'When price takes liquidity and reverses — the classic sweep setup.',
        keyPoints: ['Price runs above/below key level', 'Quickly reverses', 'Stops are triggered', 'New direction begins'],
        chefQuote: 'The rush happens fast. Then the real cooking begins.',
        glossaryTerms: ['Liquidity Sweep', 'Fake Breakout', 'Reversal'], locked: true
      },
      {
        id: 'l5-04', levelId: 'level-5', title: 'Asia High/Low as Liquidity', chefTitle: 'Morning Inventory Targets',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Louie Liquidity',
        summary: 'Asia session high and low are key liquidity levels for London and NY to target.',
        keyPoints: ['Asia sets the range', 'London sweeps Asia H or L', 'Mark Asia H/L every day', 'Previous day H/L also key'],
        chefQuote: 'The morning inventory always tells you what London will hunt.',
        glossaryTerms: ['Asia High', 'Asia Low', 'Previous Day High', 'Previous Day Low'], locked: true
      },
      {
        id: 'l5-05', levelId: 'level-5', title: 'Level 5 Quiz', chefTitle: 'Customer Flow Exam',
        duration: '8 min', type: 'quiz', xp: 35, character: 'Louie Liquidity',
        summary: 'Identify liquidity on charts, predict sweep directions, and plan post-sweep entries.',
        keyPoints: ['8 questions', '70% to pass', 'Chart-based identification', 'Unlocks Level 6'],
        chefQuote: 'If you cannot see the line, you cannot serve the customer.',
        glossaryTerms: [], locked: true
      },
    ]
  },

  {
    id: 'level-6',
    number: 6,
    title: 'Zones and Indicators',
    chefTitle: 'Pantry and Tools',
    description: 'Master AOI zones, FVGs, the 200 SMA (Grandma Market), and VWAP (Nana Value).',
    character: 'Nana Value',
    xpRequired: 600,
    lessons: [
      {
        id: 'l6-01', levelId: 'level-6', title: 'Areas of Interest (AOI)', chefTitle: 'Finding the Inventory',
        duration: '14 min', type: 'lesson', xp: 25, character: 'Nana Value',
        summary: 'AOI zones are where you expect price to react — order blocks, demand/supply zones.',
        keyPoints: ['AOI = zone where price likely reacts', 'Draw from last move before impulse', 'Higher timeframe AOIs are stronger', 'Combine with liquidity sweep'],
        chefQuote: 'The pantry shelf holds what you need. Know where it is before service starts.',
        glossaryTerms: ['AOI', 'Order Block', 'Demand Zone', 'Supply Zone'], locked: true
      },
      {
        id: 'l6-02', levelId: 'level-6', title: 'Fair Value Gaps (FVG)', chefTitle: 'The Leftover Container',
        duration: '12 min', type: 'lesson', xp: 25, character: 'Candle Kid',
        summary: 'FVGs are gaps in price that often get filled — think of them as leftovers that need to be stored.',
        keyPoints: ['3-candle pattern with gap', 'Price often returns to fill', 'Can be used as entry zone', 'Inverse FVG = filled and rejected'],
        chefQuote: 'Leftovers always get put away. The question is when.',
        glossaryTerms: ['FVG', 'Fair Value Gap', 'Imbalance', 'IFVG'], locked: true
      },
      {
        id: 'l6-03', levelId: 'level-6', title: 'Order Blocks', chefTitle: 'The Bulk Storage',
        duration: '12 min', type: 'lesson', xp: 25, character: 'Grandma Market',
        summary: 'Order blocks are the last candle before an aggressive move. Institutional footprints.',
        keyPoints: ['Last down candle before up move = bullish OB', 'Last up candle before down move = bearish OB', 'Higher TF OBs are stronger', 'Combine with FVG for precision'],
        chefQuote: 'The big orders leave marks. Grandma remembers where they stored the bulk.',
        glossaryTerms: ['Order Block', 'Institutional', 'Mitigation'], locked: true
      },
      {
        id: 'l6-04', levelId: 'level-6', title: '200 SMA and VWAP', chefTitle: 'Grandma and Nana\'s Tools',
        duration: '14 min', type: 'lesson', xp: 25, character: 'Nana Value',
        summary: 'The 200 SMA (Grandma Market) shows the big picture trend. VWAP (Nana Value) shows fair value.',
        keyPoints: ['200 SMA = long-term trend direction', 'Price above = bullish bias', 'VWAP = average price today', 'Below VWAP = undervalued area'],
        chefQuote: 'Nana always knows the real value. Grandma always knows the direction. Listen to both.',
        glossaryTerms: ['200 SMA', 'VWAP', 'Moving Average', 'Fair Value'], locked: true
      },
      {
        id: 'l6-05', levelId: 'level-6', title: 'Combining Zones', chefTitle: 'Full Pantry Check',
        duration: '12 min', type: 'practice', xp: 30, character: 'Nana Value',
        summary: 'Practice combining AOI, FVG, OB, and indicators for high-probability zones.',
        keyPoints: ['Stack confluences for strength', 'AOI + FVG + liquidity sweep = A+ setup', 'More confluence = more confidence', 'Mark zones on chart daily'],
        chefQuote: 'The best dishes use multiple ingredients. The best trades use multiple confluences.',
        glossaryTerms: ['Confluence', 'Stacking'], locked: true
      },
      {
        id: 'l6-06', levelId: 'level-6', title: 'Level 6 Quiz', chefTitle: 'Pantry Master Test',
        duration: '10 min', type: 'quiz', xp: 40, character: 'Nana Value',
        summary: 'Identify AOIs, FVGs, and order blocks on charts. Explain Grandma and Nana indicators.',
        keyPoints: ['10 questions', '70% to pass', 'Draw zones on charts', 'Unlocks Level 7'],
        chefQuote: 'A chef who cannot find the pantry starves the whole restaurant.',
        glossaryTerms: [], locked: true
      },
    ]
  },

  {
    id: 'level-7',
    number: 7,
    title: 'The Trading Chef Road Map',
    chefTitle: 'The Complete Recipe',
    description: 'Master the full 8-step Road Map — from bias to execution to management.',
    character: 'Trading Chef',
    xpRequired: 800,
    lessons: [
      {
        id: 'l7-01', levelId: 'level-7', title: 'Step 1 — Bias', chefTitle: 'Reading Today\'s Menu',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Grandma Market',
        summary: 'Determine your directional bias using higher timeframe structure and Grandma Market.',
        keyPoints: ['Check 4H and Daily structure', 'Where is price vs 200 SMA?', 'Is VWAP above or below?', 'Bias = Bullish, Bearish, or No Trade'],
        chefQuote: 'Read the menu before you cook. No bias, no trade.',
        glossaryTerms: ['Bias', 'Higher Timeframe'], locked: true
      },
      {
        id: 'l7-02', levelId: 'level-7', title: 'Step 2 — Liquidity', chefTitle: 'Finding the Customers',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Louie Liquidity',
        summary: 'Mark key liquidity levels: Asia H/L, previous day H/L, equal highs/lows.',
        keyPoints: ['Mark Asia High and Low', 'Mark previous day H/L', 'Note equal highs/lows', 'Wait for sweep before entry'],
        chefQuote: 'Louie marks the line. The customers come. Then we serve.',
        glossaryTerms: ['Liquidity Map'], locked: true
      },
      {
        id: 'l7-03', levelId: 'level-7', title: 'Step 3 — AOI', chefTitle: 'Identifying the Pantry Shelf',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Nana Value',
        summary: 'Identify your area of interest where you expect price to react after the sweep.',
        keyPoints: ['Draw from HTF order block', 'FVG within the zone adds value', 'Must be in direction of bias', 'Note the exact zone edges'],
        chefQuote: 'The pantry shelf is set. Now wait for the ingredient to arrive.',
        glossaryTerms: ['Area of Interest'], locked: true
      },
      {
        id: 'l7-04', levelId: 'level-7', title: 'Step 4 — Delivery', chefTitle: 'Watching the Kitchen Move',
        duration: '8 min', type: 'lesson', xp: 15, character: 'Candle Kid',
        summary: 'Watch how price delivers to your AOI. Is it impulsive or corrective?',
        keyPoints: ['Impulsive = strong move into zone', 'Corrective = slow grind', 'Impulsive is preferred', 'Watch candle character on approach'],
        chefQuote: 'How the food arrives at the station tells you if the order is serious.',
        glossaryTerms: ['Delivery', 'Impulsive', 'Corrective'], locked: true
      },
      {
        id: 'l7-05', levelId: 'level-7', title: 'Step 5 — Confirmation', chefTitle: 'The Kitchen Agrees',
        duration: '12 min', type: 'lesson', xp: 25, character: 'Wickie',
        summary: 'Wait for lower timeframe confirmation before entering. Never enter without it.',
        keyPoints: ['LTF CHoCH in your direction', 'Engulfing candle at zone', 'Displacement from zone', 'No confirmation = no trade'],
        chefQuote: 'Wickie says: if you cannot see it confirm, you cannot cook it.',
        glossaryTerms: ['Confirmation', 'Lower Timeframe', 'Displacement'], locked: true
      },

      {
        id: 'l7-06', levelId: 'level-7', title: 'Step 6 — Entry', chefTitle: 'The Pass',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Trading Chef',
        summary: 'Execute your entry at the confirmed zone. Place your order with precision.',
        keyPoints: ['Enter after confirmation candle closes', 'Use limit or market order', 'Entry at zone edge or 50%', 'Document entry reason'],
        chefQuote: 'The pass is where the dish leaves the kitchen. Make it clean.',
        glossaryTerms: ['Entry', 'Limit Order', 'Market Order'], locked: true
      },
      {
        id: 'l7-07', levelId: 'level-7', title: 'Step 7 — Tables (Targets)', chefTitle: 'Tables Served',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Profit Plate',
        summary: 'Set your take profit levels: Table 1, Table 2, Table 3.',
        keyPoints: ['TP1 = nearest liquidity/structure', 'TP2 = next key level', 'TP3 = full extension', 'Partial close at each table'],
        chefQuote: 'Serve each table in order. Do not skip to dessert.',
        glossaryTerms: ['Take Profit', 'TP1', 'TP2', 'TP3', 'Tables'], locked: true
      },
      {
        id: 'l7-08', levelId: 'level-7', title: 'Step 8 — Management', chefTitle: 'Protect the Plate',
        duration: '12 min', type: 'lesson', xp: 25, character: 'Burn Alarm',
        summary: 'Manage your trade: trail stop, partial close, move to breakeven.',
        keyPoints: ['Move SL to BE after TP1', 'Trail behind structure', 'Never move SL further away', 'Let winners run with protection'],
        chefQuote: 'The alarm rings for a reason. Protect what is already served.',
        glossaryTerms: ['Stop Loss', 'Breakeven', 'Trail', 'Management'], locked: true
      },
      {
        id: 'l7-09', levelId: 'level-7', title: 'Full Road Map Walkthrough', chefTitle: 'Complete Recipe — Start to Finish',
        duration: '20 min', type: 'practice', xp: 40, character: 'Trading Chef',
        summary: 'Complete walkthrough of all 8 steps on a real chart example.',
        keyPoints: ['Follow each step in order', 'Document every decision', 'No skipping steps', 'Golden Rule: No setup, no serve.'],
        chefQuote: 'Chef\'s Golden Rule: No setup, no serve.',
        glossaryTerms: ['Road Map', 'Setup'], locked: true
      },
      {
        id: 'l7-10', levelId: 'level-7', title: 'Level 7 Quiz', chefTitle: 'Recipe Master Test',
        duration: '12 min', type: 'quiz', xp: 50, character: 'Trading Chef',
        summary: 'Apply the full road map to chart scenarios. Must pass to unlock advanced content.',
        keyPoints: ['12 questions', '70% to pass', 'Full scenario questions', 'Unlocks Level 8'],
        chefQuote: 'This is the exam. Show me the complete recipe.',
        glossaryTerms: [], locked: true
      },
    ]
  },

  {
    id: 'level-8',
    number: 8,
    title: 'Psychology and Risk',
    chefTitle: 'The Chef\'s Mind',
    description: 'Master the mental game: patience, discipline, risk management, and journaling.',
    character: 'Melissa Mayhem',
    xpRequired: 1000,
    lessons: [
      {
        id: 'l8-01', levelId: 'level-8', title: 'Trading Psychology', chefTitle: 'The Chef\'s Mental Kitchen',
        duration: '14 min', type: 'lesson', xp: 25, character: 'Melissa Mayhem',
        summary: 'Your mind is your biggest asset or your worst enemy. Learn to control it.',
        keyPoints: ['Fear causes missed entries', 'Greed causes overtrading', 'Revenge trading destroys accounts', 'Patience is a skill, not a talent'],
        chefQuote: 'Melissa knows the chaos. She has lived it. Learn from her fire so you do not burn.',
        glossaryTerms: ['Psychology', 'Fear', 'Greed', 'Revenge Trading'], locked: true
      },
      {
        id: 'l8-02', levelId: 'level-8', title: 'Risk Management', chefTitle: 'Protect the Plate',
        duration: '14 min', type: 'lesson', xp: 25, character: 'Burn Alarm',
        summary: 'Position sizing, risk per trade, and protecting your capital.',
        keyPoints: ['Never risk more than 1-2% per trade', 'Calculate position size from stop distance', 'Risk-reward minimum 1:2', 'Daily loss limit = kitchen closed'],
        chefQuote: 'Burn Alarm does not care about your feelings. It protects the kitchen.',
        glossaryTerms: ['Risk Management', 'Position Size', 'Risk-Reward', 'Burn Point'], locked: true
      },
      {
        id: 'l8-03', levelId: 'level-8', title: 'Patience and Waiting', chefTitle: 'Waiting for the Order',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Wickie',
        summary: 'The best traders wait. Learn to sit on your hands when there is no setup.',
        keyPoints: ['No setup = no trade', 'Boredom is not a signal', 'Quality over quantity', 'One great trade beats ten mediocre ones'],
        chefQuote: 'The best chefs wait for the perfect moment to plate. You should too.',
        glossaryTerms: ['Patience', 'Overtrading'], locked: true
      },
      {
        id: 'l8-04', levelId: 'level-8', title: 'Trade Journaling', chefTitle: 'The Kitchen Log',
        duration: '12 min', type: 'lesson', xp: 25, character: 'Trading Chef',
        summary: 'Every trade must be logged. The journal is your path to improvement.',
        keyPoints: ['Log every trade — wins and losses', 'Include emotion state', 'Review weekly', 'Patterns emerge from data'],
        chefQuote: 'The kitchen log never lies. Write everything. Review everything. Improve everything.',
        glossaryTerms: ['Journal', 'Trade Log', 'Review'], locked: true
      },
      {
        id: 'l8-05', levelId: 'level-8', title: 'Handling Losses', chefTitle: 'When the Kitchen Burns',
        duration: '10 min', type: 'lesson', xp: 20, character: 'Melissa Mayhem',
        summary: 'Losses are part of trading. Learn to process them without spiraling.',
        keyPoints: ['Every trader loses', 'A loss is data, not failure', 'Step away after max loss', 'Review loss for lesson'],
        chefQuote: 'The kitchen burns sometimes. Great chefs rebuild. Bad chefs quit or burn more.',
        glossaryTerms: ['Drawdown', 'Loss', 'Recovery'], locked: true
      },
      {
        id: 'l8-06', levelId: 'level-8', title: 'Level 8 Quiz', chefTitle: 'Mental Kitchen Certification',
        duration: '10 min', type: 'quiz', xp: 50, character: 'Melissa Mayhem',
        summary: 'Scenario-based psychology and risk management test.',
        keyPoints: ['10 questions', '70% to pass', 'Scenario-based', 'Unlocks Level 9'],
        chefQuote: 'The strongest chefs are not the fastest. They are the most disciplined.',
        glossaryTerms: [], locked: true
      },
    ]
  },

  {
    id: 'level-9',
    number: 9,
    title: 'Advanced Market Kitchen',
    chefTitle: 'Head Chef Status',
    description: 'Advanced concepts, multi-timeframe analysis, and independent trading mastery.',
    character: 'Trading Chef',
    xpRequired: 1200,
    lessons: [
      {
        id: 'l9-01', levelId: 'level-9', title: 'Multi-Timeframe Analysis', chefTitle: 'Reading All Menus',
        duration: '16 min', type: 'lesson', xp: 30, character: 'Grandma Market',
        summary: 'Combine multiple timeframes for precision entries aligned with higher structure.',
        keyPoints: ['Monthly/Weekly = bias', 'Daily/4H = structure', '1H/15M = entry', 'All must align for A+ setup'],
        chefQuote: 'The head chef reads every menu in the building. Not just the one in front of them.',
        glossaryTerms: ['Multi-Timeframe', 'Alignment', 'Top-Down Analysis'], locked: true
      },
      {
        id: 'l9-02', levelId: 'level-9', title: 'Advanced Liquidity Concepts', chefTitle: 'Deep Kitchen Secrets',
        duration: '14 min', type: 'lesson', xp: 30, character: 'Louie Liquidity',
        summary: 'Internal vs external liquidity, inducement, and institutional order flow.',
        keyPoints: ['Internal liquidity = within range', 'External liquidity = beyond range', 'Inducement traps retail', 'Follow smart money flow'],
        chefQuote: 'The deep kitchen has secrets only the experienced chefs know.',
        glossaryTerms: ['Internal Liquidity', 'External Liquidity', 'Inducement', 'Smart Money'], locked: true
      },
      {
        id: 'l9-03', levelId: 'level-9', title: 'Building Your Trading Plan', chefTitle: 'Your Own Recipe Book',
        duration: '15 min', type: 'lesson', xp: 30, character: 'Trading Chef',
        summary: 'Create your personal trading plan: rules, pairs, sessions, risk, and review process.',
        keyPoints: ['Define your pairs', 'Choose your sessions', 'Set daily risk limit', 'Build review routine'],
        chefQuote: 'Every head chef has their own recipe book. Time to write yours.',
        glossaryTerms: ['Trading Plan', 'Rules', 'Routine'], locked: true
      },
      {
        id: 'l9-04', levelId: 'level-9', title: 'TCU Graduation Review', chefTitle: 'Head Chef Assessment',
        duration: '20 min', type: 'review', xp: 50, character: 'Trading Chef',
        summary: 'Final assessment: demonstrate mastery of all concepts through a complete trade analysis.',
        keyPoints: ['Full road map application', 'Multi-timeframe analysis', 'Risk management plan', 'Journal entry included'],
        chefQuote: 'You entered as an apprentice. You leave as a chef. Now go cook.',
        glossaryTerms: [], locked: true
      },
    ]
  },
]


// ─── TRADING CHEF ROAD MAP (8 Steps) ───────────────────────────────────────

export type RoadMapStep = {
  step: number
  title: string
  chefTitle: string
  description: string
  chefMetaphor: string
  chefQuote: string
  character: string
  lessonId: string
}

export const TRADING_CHEF_ROAD_MAP: RoadMapStep[] = [
  {
    step: 1, title: 'Bias', chefTitle: 'Reading Today\'s Menu',
    description: 'Determine your directional bias using higher timeframe analysis. Is the market bullish, bearish, or unclear?',
    chefMetaphor: 'Before the kitchen opens, the head chef reads the menu. What are we serving today?',
    chefQuote: 'No bias, no trade. Read the menu first.',
    character: 'Grandma Market', lessonId: 'l7-01'
  },
  {
    step: 2, title: 'Liquidity', chefTitle: 'Finding the Customers',
    description: 'Mark key liquidity levels: Asia H/L, previous day H/L, equal highs/lows. Where are the resting orders?',
    chefMetaphor: 'Louie checks the reservation book. Where are the customers waiting to be seated?',
    chefQuote: 'Mark the liquidity. The market will come for it.',
    character: 'Louie Liquidity', lessonId: 'l7-02'
  },
  {
    step: 3, title: 'AOI', chefTitle: 'Identifying the Pantry Shelf',
    description: 'Identify your area of interest — the zone where you expect price to react after the liquidity sweep.',
    chefMetaphor: 'The pantry shelf holds the key ingredient. Know exactly where it sits.',
    chefQuote: 'The shelf is set. Wait for price to arrive.',
    character: 'Nana Value', lessonId: 'l7-03'
  },
  {
    step: 4, title: 'Delivery', chefTitle: 'Watching the Kitchen Move',
    description: 'Observe how price delivers to your AOI. Is it impulsive or corrective? Character of the move matters.',
    chefMetaphor: 'Watch how the ingredients arrive at the station. Speed and character tell you everything.',
    chefQuote: 'Impulsive delivery = serious order. Corrective = uncertain.',
    character: 'Candle Kid', lessonId: 'l7-04'
  },

  {
    step: 5, title: 'Confirmation', chefTitle: 'The Kitchen Agrees',
    description: 'Wait for lower timeframe confirmation at your AOI before entering. CHoCH, engulfing, or displacement.',
    chefMetaphor: 'The whole kitchen nods. The order is confirmed. Now you can cook.',
    chefQuote: 'No confirmation, no entry. Period.',
    character: 'Wickie', lessonId: 'l7-05'
  },
  {
    step: 6, title: 'Entry', chefTitle: 'The Pass',
    description: 'Execute your entry at the confirmed zone. Clean, precise, with a documented reason.',
    chefMetaphor: 'The dish leaves the kitchen through the pass. Make it clean or send it back.',
    chefQuote: 'Enter with reason. Enter with structure. Enter with confidence.',
    character: 'Trading Chef', lessonId: 'l7-06'
  },
  {
    step: 7, title: 'Targets', chefTitle: 'Tables Served',
    description: 'Set your take profit levels: TP1 (nearest structure), TP2 (next key level), TP3 (full extension).',
    chefMetaphor: 'Serve each table in order. Table 1 first, then 2, then 3. Do not skip to dessert.',
    chefQuote: 'Serve the tables in order. Profit is served, not grabbed.',
    character: 'Profit Plate', lessonId: 'l7-07'
  },
  {
    step: 8, title: 'Management', chefTitle: 'Protect the Plate',
    description: 'Manage your active trade: trail stop, partial close at targets, move to breakeven after TP1.',
    chefMetaphor: 'The plate is served. Now protect it from being knocked over. Guard the kitchen.',
    chefQuote: 'Move to breakeven. Trail the stop. Let winners breathe.',
    character: 'Burn Alarm', lessonId: 'l7-08'
  },
]


// ─── CHEF LINGO (Traditional Term → Kitchen Term) ──────────────────────────

export const CHEF_LINGO: Record<string, string> = {
  'Support': 'Restock Shelf',
  'Resistance': 'Overstock Shelf',
  'Trend': 'Rush Hour Direction',
  'Uptrend': 'Bullish Kitchen',
  'Downtrend': 'Bearish Kitchen',
  'Range': 'Slow Kitchen',
  'Breakout': 'Door Burst',
  'Liquidity': 'Waiting Customers',
  'Stop Loss': 'Burn Point',
  'Take Profit': 'Tables Served',
  'Entry': 'The Pass',
  'Confirmation': 'Kitchen Agrees',
  'Fair Value Gap': 'Leftover Container',
  'Order Block': 'Bulk Storage',
  'Area of Interest': 'Pantry Shelf',
  'VWAP': 'Nana Value',
  '200 SMA': 'Grandma Market',
  'CHoCH': 'Menu Change',
  'BOS': 'Delivery Confirmed',
  'Swing High': 'Kitchen Peak',
  'Swing Low': 'Kitchen Valley',
  'Higher High': 'Higher Peak',
  'Higher Low': 'Higher Valley',
  'Lower High': 'Lower Peak',
  'Lower Low': 'Lower Valley',
  'Demand Zone': 'Restock Area',
  'Supply Zone': 'Overstock Area',
  'Position Size': 'Portion Control',
  'Risk-Reward': 'Cost vs Plate Value',
  'Drawdown': 'Kitchen Fire',
  'Revenge Trading': 'Rage Cooking',
  'Overtrading': 'Overcooking',
  'Asia Session': 'Morning Inventory',
  'London Session': 'Lunch Rush',
  'New York Session': 'Main Service',
  'Killzone': 'Prime Cooking Window',
  'Imbalance': 'Leftover Gap',
  'Displacement': 'Kitchen Sprint',
  'Inducement': 'Fake Order',
  'Smart Money': 'Head Chef Orders',
  'Retail Traders': 'Kitchen Rookies',
  'Institutional': 'Corporate Kitchen',
  'Candlestick': 'Ingredient',
  'Pin Bar': 'Rejection Dish',
  'Engulfing': 'Full Cover Plate',
  'Doji': 'Confused Dish',
  'Market Structure': 'Kitchen Layout',
  'Multi-Timeframe': 'All Menus',
  'Trade Plan': 'Recipe',
  'Journal': 'Kitchen Log',
  'Psychology': 'Mental Kitchen',
}


// ─── TCU FULL GLOSSARY ─────────────────────────────────────────────────────

export type GlossaryEntry = {
  term: string
  kitchenTerm: string
  definition: string
  level: string
}

export const TCU_FULL_GLOSSARY: GlossaryEntry[] = [
  { term: 'Market', kitchenTerm: 'Restaurant', definition: 'An auction system where buyers and sellers exchange assets at agreed prices.', level: 'Level 1' },
  { term: 'Price Action', kitchenTerm: 'Kitchen Activity', definition: 'The movement of price over time, shown through candlesticks on a chart.', level: 'Level 1' },
  { term: 'Supply', kitchenTerm: 'Overstock', definition: 'When sellers are dominant and there is more selling pressure than buying.', level: 'Level 1' },
  { term: 'Demand', kitchenTerm: 'Restock', definition: 'When buyers are dominant and there is more buying pressure than selling.', level: 'Level 1' },
  { term: 'Candlestick', kitchenTerm: 'Ingredient', definition: 'A single bar on a chart showing open, high, low, and close for a time period.', level: 'Level 2' },
  { term: 'Open', kitchenTerm: 'Kitchen Opens', definition: 'The first price of a candle when the time period begins.', level: 'Level 2' },
  { term: 'Close', kitchenTerm: 'Kitchen Closes', definition: 'The final price of a candle when the time period ends.', level: 'Level 2' },
  { term: 'Wick', kitchenTerm: 'Taste Test', definition: 'The thin line above or below the candle body showing price rejection.', level: 'Level 2' },
  { term: 'Body', kitchenTerm: 'Main Course', definition: 'The thick part of the candle between open and close.', level: 'Level 2' },
  { term: 'Bullish', kitchenTerm: 'Hot Kitchen', definition: 'Price is moving up. Buyers are in control. Green candles dominating.', level: 'Level 2' },
  { term: 'Bearish', kitchenTerm: 'Cold Kitchen', definition: 'Price is moving down. Sellers are in control. Red candles dominating.', level: 'Level 2' },
  { term: 'Momentum', kitchenTerm: 'Kitchen Speed', definition: 'The strength and speed of a price move.', level: 'Level 2' },
  { term: 'Engulfing', kitchenTerm: 'Full Cover Plate', definition: 'A candle that completely covers the previous candle body, signaling reversal.', level: 'Level 2' },
  { term: 'Pin Bar', kitchenTerm: 'Rejection Dish', definition: 'A candle with a long wick and small body, showing strong rejection at a level.', level: 'Level 2' },
  { term: 'Doji', kitchenTerm: 'Confused Dish', definition: 'A candle where open equals close, showing market indecision.', level: 'Level 2' },
  { term: 'Hammer', kitchenTerm: 'Recovery Plate', definition: 'A bullish reversal candle with long lower wick found at support.', level: 'Level 2' },
  { term: 'Support', kitchenTerm: 'Restock Shelf', definition: 'A price level where buying pressure historically steps in, creating a floor.', level: 'Level 3' },
  { term: 'Resistance', kitchenTerm: 'Overstock Shelf', definition: 'A price level where selling pressure historically appears, creating a ceiling.', level: 'Level 3' },
  { term: 'Swing High', kitchenTerm: 'Kitchen Peak', definition: 'A local price peak with lower highs on each side.', level: 'Level 3' },
  { term: 'Swing Low', kitchenTerm: 'Kitchen Valley', definition: 'A local price low with higher lows on each side.', level: 'Level 3' },

  { term: 'Higher High', kitchenTerm: 'Higher Peak', definition: 'A swing high that is above the previous swing high — bullish sign.', level: 'Level 3' },
  { term: 'Higher Low', kitchenTerm: 'Higher Valley', definition: 'A swing low that is above the previous swing low — bullish continuation.', level: 'Level 3' },
  { term: 'Lower High', kitchenTerm: 'Lower Peak', definition: 'A swing high below the previous swing high — bearish sign.', level: 'Level 3' },
  { term: 'Lower Low', kitchenTerm: 'Lower Valley', definition: 'A swing low below the previous swing low — bearish continuation.', level: 'Level 3' },
  { term: 'Trend', kitchenTerm: 'Rush Hour Direction', definition: 'The overall direction of price: up (bullish), down (bearish), or sideways (range).', level: 'Level 3' },
  { term: 'CHoCH', kitchenTerm: 'Menu Change', definition: 'Change of Character — first sign that the trend may be shifting direction.', level: 'Level 3' },
  { term: 'BOS', kitchenTerm: 'Delivery Confirmed', definition: 'Break of Structure — confirmation that the current trend is continuing.', level: 'Level 3' },
  { term: 'Market Structure', kitchenTerm: 'Kitchen Layout', definition: 'The pattern of highs and lows that defines trend direction and key levels.', level: 'Level 3' },
  { term: 'Range', kitchenTerm: 'Slow Kitchen', definition: 'When price moves sideways between support and resistance with no clear trend.', level: 'Level 3' },
  { term: 'Asia Session', kitchenTerm: 'Morning Inventory', definition: 'Trading hours roughly 00:00-07:00 UTC. Low volatility, range-setting period.', level: 'Level 4' },
  { term: 'London Session', kitchenTerm: 'Lunch Rush', definition: 'Trading hours roughly 07:00-12:00 UTC. High volatility, often breaks Asia range.', level: 'Level 4' },
  { term: 'New York Session', kitchenTerm: 'Main Service', definition: 'Trading hours roughly 12:00-17:00 UTC. Continuation or reversal of London moves.', level: 'Level 4' },
  { term: 'Session Overlap', kitchenTerm: 'Rush Hour', definition: 'Period when London and New York are both active (12:00-16:00 UTC). Highest volume.', level: 'Level 4' },
  { term: 'Killzone', kitchenTerm: 'Prime Cooking Window', definition: 'Specific time windows where high-probability setups tend to form.', level: 'Level 4' },
  { term: 'Dead Zone', kitchenTerm: 'Kitchen Closed', definition: 'Low-liquidity periods where trading is not recommended.', level: 'Level 4' },
  { term: 'Liquidity', kitchenTerm: 'Waiting Customers', definition: 'Clusters of resting orders (stops, limits) that the market targets.', level: 'Level 5' },
  { term: 'Stop Hunt', kitchenTerm: 'Customer Grab', definition: 'When price moves to trigger clustered stop losses before reversing.', level: 'Level 5' },
  { term: 'Liquidity Sweep', kitchenTerm: 'Customer Rush', definition: 'When price takes out a liquidity level and immediately reverses.', level: 'Level 5' },
  { term: 'Buy-Side Liquidity', kitchenTerm: 'Top Shelf Customers', definition: 'Resting buy stops above swing highs that the market may target.', level: 'Level 5' },
  { term: 'Sell-Side Liquidity', kitchenTerm: 'Bottom Shelf Customers', definition: 'Resting sell stops below swing lows that the market may target.', level: 'Level 5' },
  { term: 'Equal Highs', kitchenTerm: 'Same Height Shelf', definition: 'Multiple highs at the same level — obvious liquidity pool above.', level: 'Level 5' },
  { term: 'Equal Lows', kitchenTerm: 'Same Depth Shelf', definition: 'Multiple lows at the same level — obvious liquidity pool below.', level: 'Level 5' },

  { term: 'Asia High', kitchenTerm: 'Morning Top Shelf', definition: 'The highest price during the Asian session — key liquidity target.', level: 'Level 5' },
  { term: 'Asia Low', kitchenTerm: 'Morning Bottom Shelf', definition: 'The lowest price during the Asian session — key liquidity target.', level: 'Level 5' },
  { term: 'Previous Day High', kitchenTerm: 'Yesterday\'s Top Shelf', definition: 'The highest price from the previous trading day — major liquidity level.', level: 'Level 5' },
  { term: 'Previous Day Low', kitchenTerm: 'Yesterday\'s Bottom Shelf', definition: 'The lowest price from the previous trading day — major liquidity level.', level: 'Level 5' },
  { term: 'AOI', kitchenTerm: 'Pantry Shelf', definition: 'Area of Interest — a zone where you expect price to react based on past structure.', level: 'Level 6' },
  { term: 'Order Block', kitchenTerm: 'Bulk Storage', definition: 'The last candle before an aggressive move — institutional footprint zone.', level: 'Level 6' },
  { term: 'FVG', kitchenTerm: 'Leftover Container', definition: 'Fair Value Gap — a 3-candle pattern with a price gap that often gets filled.', level: 'Level 6' },
  { term: 'IFVG', kitchenTerm: 'Sealed Container', definition: 'Inverse Fair Value Gap — an FVG that has been filled and rejected, acting as resistance.', level: 'Level 6' },
  { term: 'VWAP', kitchenTerm: 'Nana Value', definition: 'Volume-Weighted Average Price — shows the true average price where most volume traded.', level: 'Level 6' },
  { term: '200 SMA', kitchenTerm: 'Grandma Market', definition: '200-period Simple Moving Average — shows the long-term trend direction.', level: 'Level 6' },
  { term: 'Confluence', kitchenTerm: 'Stacked Ingredients', definition: 'Multiple factors aligning at the same zone — increases probability.', level: 'Level 6' },
  { term: 'Bias', kitchenTerm: 'Today\'s Menu', definition: 'Your directional expectation for the day: Bullish, Bearish, or No Trade.', level: 'Level 7' },
  { term: 'Confirmation', kitchenTerm: 'Kitchen Agrees', definition: 'Lower timeframe signal that validates your higher timeframe thesis.', level: 'Level 7' },
  { term: 'Entry', kitchenTerm: 'The Pass', definition: 'The point where you execute your trade after all criteria are met.', level: 'Level 7' },
  { term: 'Take Profit', kitchenTerm: 'Tables Served', definition: 'Predetermined price levels where you close portions of your position for profit.', level: 'Level 7' },
  { term: 'TP1', kitchenTerm: 'Table 1', definition: 'First take profit target — nearest structure level. Partial close here.', level: 'Level 7' },
  { term: 'TP2', kitchenTerm: 'Table 2', definition: 'Second take profit target — next key level beyond TP1.', level: 'Level 7' },
  { term: 'TP3', kitchenTerm: 'Table 3', definition: 'Third take profit target — full extension. Let runners ride.', level: 'Level 7' },
  { term: 'Stop Loss', kitchenTerm: 'Burn Point', definition: 'The price level where your trade idea is invalidated and you exit for a loss.', level: 'Level 7' },
  { term: 'Breakeven', kitchenTerm: 'Protected Plate', definition: 'Moving your stop loss to entry price so you can no longer lose on the trade.', level: 'Level 7' },
  { term: 'Risk-Reward', kitchenTerm: 'Cost vs Plate Value', definition: 'Ratio comparing potential loss (risk) to potential gain (reward). Minimum 1:2.', level: 'Level 8' },
  { term: 'Position Size', kitchenTerm: 'Portion Control', definition: 'How large your trade is relative to your account. Never exceed 1-2% risk.', level: 'Level 8' },
  { term: 'Drawdown', kitchenTerm: 'Kitchen Fire', definition: 'A decline in account balance from peak. Series of losses creating damage.', level: 'Level 8' },
  { term: 'Revenge Trading', kitchenTerm: 'Rage Cooking', definition: 'Taking impulsive trades to recover losses. Extremely destructive behavior.', level: 'Level 8' },
  { term: 'Overtrading', kitchenTerm: 'Overcooking', definition: 'Taking too many trades, often out of boredom or greed. Quality over quantity.', level: 'Level 8' },
  { term: 'Psychology', kitchenTerm: 'Mental Kitchen', definition: 'The emotional and mental discipline required for consistent trading.', level: 'Level 8' },
  { term: 'Multi-Timeframe Analysis', kitchenTerm: 'Reading All Menus', definition: 'Analyzing multiple timeframes to align bias, structure, and entry.', level: 'Level 9' },
  { term: 'Smart Money', kitchenTerm: 'Head Chef Orders', definition: 'Institutional traders whose large orders move markets predictably.', level: 'Level 9' },
  { term: 'Inducement', kitchenTerm: 'Fake Order', definition: 'A setup that looks like a trade but is designed to trap retail traders.', level: 'Level 9' },
  { term: 'Internal Liquidity', kitchenTerm: 'Inside Pantry', definition: 'Liquidity within the current trading range — FVGs, imbalances.', level: 'Level 9' },
  { term: 'External Liquidity', kitchenTerm: 'Outside Pantry', definition: 'Liquidity beyond the current range — swing highs/lows, equal levels.', level: 'Level 9' },
]


// ─── TCU MICRO-LEVELS (23 Granular Levels) ─────────────────────────────────

export type MicroLevel = {
  id: string
  title: string
  parentLevel: string
  chefTitle: string
  lessonId: string
}

export const TCU_MICRO_LEVELS: MicroLevel[] = [
  { id: 'ml-01', title: 'What is the Market?', parentLevel: 'level-1', chefTitle: 'What is a Restaurant?', lessonId: 'l1-01' },
  { id: 'ml-02', title: 'Candle Anatomy', parentLevel: 'level-2', chefTitle: 'Breaking Down the Ingredient', lessonId: 'l2-01' },
  { id: 'ml-03', title: 'Bullish vs Bearish Candles', parentLevel: 'level-2', chefTitle: 'Hot vs Cold Dishes', lessonId: 'l2-01' },
  { id: 'ml-04', title: 'Wicks, Bodies, Closes', parentLevel: 'level-2', chefTitle: 'The Anatomy of Every Dish', lessonId: 'l2-01' },
  { id: 'ml-05', title: 'Support and Resistance', parentLevel: 'level-3', chefTitle: 'Restock vs Overstock Shelf', lessonId: 'l3-01' },
  { id: 'ml-06', title: 'Swing Highs and Swing Lows', parentLevel: 'level-3', chefTitle: 'Peaks and Valleys of the Kitchen', lessonId: 'l3-01' },
  { id: 'ml-07', title: 'HH, HL, LH, LL', parentLevel: 'level-3', chefTitle: 'Is the Kitchen Moving Forward?', lessonId: 'l3-02' },
  { id: 'ml-08', title: 'Trend', parentLevel: 'level-3', chefTitle: 'Rush Hour Direction', lessonId: 'l3-02' },
  { id: 'ml-09', title: 'Market Structure', parentLevel: 'level-3', chefTitle: 'How the Kitchen is Organized', lessonId: 'l3-02' },
  { id: 'ml-10', title: 'CHoCH and BOS', parentLevel: 'level-3', chefTitle: 'Menu Change and Delivery Confirmation', lessonId: 'l3-03' },
  { id: 'ml-11', title: 'Liquidity', parentLevel: 'level-5', chefTitle: 'Where the Customers Are Waiting', lessonId: 'l5-01' },
  { id: 'ml-12', title: 'FVG / Inventory Gap', parentLevel: 'level-6', chefTitle: 'The Leftover Container', lessonId: 'l6-02' },
  { id: 'ml-13', title: 'AOI / Pantry Shelf', parentLevel: 'level-6', chefTitle: 'Finding the Inventory', lessonId: 'l6-01' },
  { id: 'ml-14', title: '200 SMA / Grandma Market', parentLevel: 'level-6', chefTitle: "Grandma's Table", lessonId: 'l6-04' },
  { id: 'ml-15', title: 'VWAP / Nana Value', parentLevel: 'level-6', chefTitle: "Nana Value's Pricing Board", lessonId: 'l6-04' },
  { id: 'ml-16', title: 'Asia, London, New York Sessions', parentLevel: 'level-4', chefTitle: 'The Three Kitchen Shifts', lessonId: 'l4-01' },
  { id: 'ml-17', title: 'Bias Building', parentLevel: 'level-7', chefTitle: "Reading Today's Menu", lessonId: 'l7-01' },
  { id: 'ml-18', title: 'Entries', parentLevel: 'level-7', chefTitle: 'The Pass', lessonId: 'l7-06' },
  { id: 'ml-19', title: 'Tables (TP1, TP2, TP3)', parentLevel: 'level-7', chefTitle: 'Tables Served', lessonId: 'l7-07' },
  { id: 'ml-20', title: 'Risk Management', parentLevel: 'level-8', chefTitle: 'Protect the Plate', lessonId: 'l8-02' },
  { id: 'ml-21', title: 'Trade Journaling', parentLevel: 'level-8', chefTitle: 'The Kitchen Log', lessonId: 'l8-04' },
  { id: 'ml-22', title: 'Psychology', parentLevel: 'level-8', chefTitle: "The Chef's Mental Kitchen", lessonId: 'l8-01' },
  { id: 'ml-23', title: 'Full Road Map Execution', parentLevel: 'level-7', chefTitle: 'Complete Recipe — Start to Finish', lessonId: 'l7-09' },
]

// ─── HELPER FUNCTIONS ──────────────────────────────────────────────────────

export function getLevelById(id: string): TCULevel | undefined {
  return TCU_LEVELS.find(l => l.id === id)
}

export function getLessonById(id: string): TCULesson | undefined {
  for (const level of TCU_LEVELS) {
    const lesson = level.lessons.find(l => l.id === id)
    if (lesson) return lesson
  }
  return undefined
}

export function getAllLessons(): TCULesson[] {
  return TCU_LEVELS.flatMap(level => level.lessons)
}

export function getTotalLessons(): number {
  return getAllLessons().length
}

export function getXpForLevel(levelId: string): number {
  const level = getLevelById(levelId)
  return level?.xpRequired ?? 0
}
