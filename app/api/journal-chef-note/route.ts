import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Generate a chef note based on the journal entry data
    // In production this would call Claude/OpenAI
    const { symbol, session, bias, result, mistake, emotion, setupType } = body

    let chefNote = ''

    if (result?.includes('TP')) {
      chefNote = `Well done, Chef. Your ${setupType || 'setup'} on ${symbol || 'the pair'} during ${session || 'the session'} served the table. `
      if (emotion === 'Calm') {
        chefNote += 'You entered with a calm mind — that is discipline. '
      }
      chefNote += 'Keep following the recipe. Consistency builds the kitchen.'
    } else if (result === 'Stopped out') {
      chefNote = `The kitchen took a loss on ${symbol || 'this pair'}. `
      if (mistake) {
        chefNote += `You identified the mistake: "${mistake}". That awareness is growth. `
      }
      if (emotion === 'Revenge') {
        chefNote += 'Melissa Mayhem warns: rage cooking burns more than just the dish. Step away. '
      }
      chefNote += 'Review the setup. Was the Pantry Shelf valid? Was confirmation present? Learn and move on.'
    } else if (result === 'No trade taken') {
      chefNote = `No trade taken — and that is often the best decision. `
      if (bias === 'No Bias') {
        chefNote += 'No bias means no trade. The Golden Rule was followed. '
      }
      chefNote += "Chef's Golden Rule: No setup, no serve."
    } else {
      chefNote = `Entry logged for ${symbol || 'this pair'} during ${session || 'the session'}. `
      chefNote += `Bias was ${bias || 'unclear'}. ${setupType ? `Setup: ${setupType}.` : ''} `
      chefNote += 'Review this entry at the end of the week for patterns.'
    }

    return NextResponse.json({ chefNote })
  } catch {
    return NextResponse.json({ chefNote: '' }, { status: 200 })
  }
}
