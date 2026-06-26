import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are the Trading Chef AI from Trading Chef University (TCU).
You analyze charts and explain them using ONLY TCU kitchen language.
You never give financial advice. You never say "buy" or "sell."
You always present two scenarios and a no-trade option.

When analyzing a chart, always return this exact JSON structure:

{
  "todaysMenu": "string — Is today's bias Bullish Kitchen or Bearish Kitchen? Explain in 1 sentence using kitchen language.",
  "louieLiquidity": "string — Where are the waiting customers (liquidity pools)? Name the levels.",
  "pantryShelf": "string — What are the AOIs / pantry shelves? Where would the Trading Chef work?",
  "nanaValue": "string — What does Nana Value (VWAP) say about price balance?",
  "grandmaMarket": "string — What does Grandma Market (200 SMA) say about the bigger structure?",
  "candleKidReport": "string — What are the candles saying? Key patterns, closes, wicks?",
  "recipeA": "string — Scenario A: IF price does X, THEN the setup would be... [describe entry, burn point, tables]",
  "recipeB": "string — Scenario B: IF price does Y instead, THEN...",
  "noTradeWarning": "string or null — Is there a reason NOT to trade? News, unclear structure, no AOI?",
  "studentLesson": "string — One lesson from this chart for the student. Use TCU language. Under 3 sentences."
}

Rules:
- Use TCU kitchen terms FIRST, traditional term in parentheses.
- Example: "The Pantry Shelf (demand zone) at 2,330..."
- Never say "I recommend" or "you should buy/sell."
- Always say "IF price does X" not "price will do X."
- End every analysis with Chef's Golden Rule: No setup, no serve.`

export async function POST(req: NextRequest) {
  try {
    // Check if AI service is configured
    const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        {
          todaysMenu: 'AI analysis requires API key configuration. Currently in demo mode.',
          louieLiquidity: 'Upload your chart and the AI Chef will identify liquidity levels once configured.',
          pantryShelf: 'The Pantry Shelf zones will be marked by the AI Chef.',
          nanaValue: 'Nana Value analysis requires AI service to be active.',
          grandmaMarket: 'Grandma Market direction will be assessed when AI is configured.',
          candleKidReport: 'Candle Kid will read the candle story once AI is enabled.',
          recipeA: 'IF the AI service is configured, THEN Recipe A will show the bullish scenario.',
          recipeB: 'IF the AI service is configured, THEN Recipe B will show the bearish scenario.',
          noTradeWarning: 'AI analysis is not configured. This is a demo response.',
          studentLesson: 'To enable full chart analysis, configure the ANTHROPIC_API_KEY or OPENAI_API_KEY environment variable.',
        },
        { status: 200 }
      )
    }

    const contentType = req.headers.get('content-type') || ''
    let imageData: string | null = null

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('image') as File | null
      if (file) {
        const buffer = await file.arrayBuffer()
        imageData = Buffer.from(buffer).toString('base64')
      }
    } else {
      const body = await req.json()
      imageData = body.image || null
    }

    if (!imageData) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // For now, return structured demo response
    // In production, this would call Claude/OpenAI with the image
    return NextResponse.json({
      todaysMenu: 'The kitchen appears to be warming up — price structure suggests a Bullish Kitchen forming on this timeframe.',
      louieLiquidity: 'Waiting customers spotted below the recent swing low and above the Asian session high.',
      pantryShelf: 'The Pantry Shelf (demand zone) is visible at the last impulsive move origin.',
      nanaValue: 'Nana Value (VWAP) is below current price, suggesting buyers are holding value.',
      grandmaMarket: 'Grandma Market (200 SMA) is sloping upward on the higher timeframe — bullish structure.',
      candleKidReport: 'Candle Kid reports strong bullish bodies with small upper wicks near the zone.',
      recipeA: 'IF price sweeps the low and returns to the Pantry Shelf with confirmation, THEN enter long with Burn Point below the zone. Table 1 at the recent high.',
      recipeB: 'IF price breaks below the Pantry Shelf with strong bearish candles, THEN the bias is invalidated. Wait for new structure.',
      noTradeWarning: null,
      studentLesson: "Chef's Golden Rule: No setup, no serve. Wait for price to reach your Pantry Shelf before you even think about cooking.",
    })
  } catch {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}
