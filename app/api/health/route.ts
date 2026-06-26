import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'OK',
    service: 'TCU Market Kitchen Terminal',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    mode: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'full' : 'degraded (localStorage)',
  })
}
