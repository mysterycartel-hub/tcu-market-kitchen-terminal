import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { entries } = await req.json()

    if (!entries || !Array.isArray(entries) || entries.length === 0) {
      return NextResponse.json({
        bestSetup: 'No trades logged this week.',
        worstMistake: 'N/A',
        strongestSession: 'N/A',
        weakestEmotion: 'N/A',
        nextWeekFocus: 'Start logging trades to build your Kitchen Log.',
        chefVerdict: 'The kitchen was quiet this week. No data, no review. Start cooking.',
      })
    }

    // Analyze the entries
    const wins = entries.filter((e: Record<string, string>) => e.result?.includes('TP'))
    const losses = entries.filter((e: Record<string, string>) => e.result === 'Stopped out')
    const sessions = entries.map((e: Record<string, string>) => e.session).filter(Boolean)
    const emotions = entries.map((e: Record<string, string>) => e.emotion).filter(Boolean)

    // Find strongest session (most wins)
    const sessionCounts: Record<string, number> = {}
    wins.forEach((e: Record<string, string>) => {
      if (e.session) sessionCounts[e.session] = (sessionCounts[e.session] || 0) + 1
    })
    const strongestSession = Object.entries(sessionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || sessions[0] || 'N/A'

    // Find weakest emotion (most associated with losses)
    const emotionLosses: Record<string, number> = {}
    losses.forEach((e: Record<string, string>) => {
      if (e.emotion) emotionLosses[e.emotion] = (emotionLosses[e.emotion] || 0) + 1
    })
    const weakestEmotion = Object.entries(emotionLosses).sort((a, b) => b[1] - a[1])[0]?.[0] || emotions[0] || 'N/A'

    // Best setup
    const bestSetup = wins.length > 0
      ? `${wins[0].setupType || 'Setup'} on ${wins[0].symbol || 'pair'} — ${wins[0].result}`
      : 'No winning trades this week.'

    // Worst mistake
    const mistakes = entries.map((e: Record<string, string>) => e.mistake).filter(Boolean)
    const worstMistake = mistakes[0] || 'No mistakes logged. Either perfect or not journaling honestly.'

    const winRate = entries.length > 0 ? Math.round((wins.length / entries.length) * 100) : 0

    return NextResponse.json({
      bestSetup,
      worstMistake,
      strongestSession,
      weakestEmotion,
      nextWeekFocus: weakestEmotion === 'Revenge'
        ? 'Focus on emotional control. Melissa Mayhem says: step away after a loss.'
        : 'Keep following the 8-step Road Map. No shortcuts.',
      chefVerdict: `${entries.length} trades logged. ${wins.length} wins, ${losses.length} losses. Win rate: ${winRate}%. ${
        winRate >= 50 ? 'The kitchen is running. Keep serving.' : 'Review your setups. Quality over quantity.'
      }`,
    })
  } catch {
    return NextResponse.json({
      bestSetup: 'Error processing review',
      worstMistake: 'N/A',
      strongestSession: 'N/A',
      weakestEmotion: 'N/A',
      nextWeekFocus: 'Try again next week.',
      chefVerdict: 'The review could not be processed. Check your journal entries.',
    }, { status: 200 })
  }
}
