import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// ─── Placeholder Detection ───────────────────────────────────────────────────

function detectStatus(key: string, value: string | undefined): 'present' | 'missing' | 'placeholder' {
  if (!value || value.trim() === '') return 'missing'
  const lower = value.toLowerCase().trim()
  // Value matches its own key name
  if (lower === key.toLowerCase()) return 'placeholder'
  if (lower === key.toLowerCase().replace(/_/g, '')) return 'placeholder'
  // Too short to be real
  if (value.length < 20) return 'placeholder'
  return 'present'
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && value.includes('.supabase.co')
  } catch {
    return false
  }
}

function isValidPublicationId(value: string): boolean {
  return value.startsWith('pub_')
}

// ─── Live Tests ──────────────────────────────────────────────────────────────

async function testSupabase(): Promise<{
  connected: boolean
  error: string | null
  url_present: boolean
  url_valid_format: boolean
  anon_key_present: boolean
  service_key_present: boolean
}> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

  const result = {
    connected: false,
    error: null as string | null,
    url_present: url.length > 0,
    url_valid_format: isValidUrl(url),
    anon_key_present: anonKey.length > 100,
    service_key_present: serviceKey.length > 100,
  }

  if (!url || !anonKey) {
    result.error = 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    return result
  }

  if (!isValidUrl(url)) {
    result.error = `NEXT_PUBLIC_SUPABASE_URL is not a valid Supabase URL: must be https://xxx.supabase.co`
    return result
  }

  try {
    // Test with a simple REST call to Supabase — no SDK needed
    const response = await fetch(`${url}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
      },
    })

    if (response.status === 200 || response.status === 204) {
      result.connected = true
    } else if (response.status === 401) {
      result.error = 'Supabase returned 401 — anon key is invalid or from a different project'
    } else if (response.status === 404) {
      // 404 on /rest/v1/ still means the connection worked
      result.connected = true
    } else {
      result.error = `Supabase returned unexpected status: ${response.status}`
    }
  } catch (err) {
    result.error = `Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`
  }

  return result
}

async function testBeehiiv(): Promise<{
  connected: boolean
  error: string | null
  api_key_present: boolean
  publication_id_present: boolean
  publication_id_valid_format: boolean
}> {
  const apiKey = process.env.BEEHIIV_API_KEY || ''
  const pubId = process.env.BEEHIIV_PUBLICATION_ID || ''

  const result = {
    connected: false,
    error: null as string | null,
    api_key_present: apiKey.length > 20,
    publication_id_present: pubId.length > 0,
    publication_id_valid_format: isValidPublicationId(pubId),
  }

  if (!apiKey || apiKey.length < 20) {
    result.error = 'Missing or too short BEEHIIV_API_KEY — not configured (optional for this repo)'
    return result
  }

  if (!pubId || !isValidPublicationId(pubId)) {
    result.error = `BEEHIIV_PUBLICATION_ID is invalid — must start with "pub_", got: "${pubId.slice(0, 10)}..."`
    return result
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.status === 200) {
      result.connected = true
    } else if (response.status === 401 || response.status === 403) {
      result.error = 'Beehiiv returned 401 — API key is invalid or expired. Create a new key in Beehiiv → Settings → API Keys'
    } else if (response.status === 404) {
      result.error = 'Beehiiv returned 404 — Publication ID not found. Check Beehiiv → Settings → Publication ID'
    } else {
      result.error = `Beehiiv returned unexpected status: ${response.status}`
    }
  } catch (err) {
    result.error = `Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`
  }

  return result
}

async function testStripe(): Promise<{
  connected: boolean
  error: string | null
  secret_key_present: boolean
  webhook_secret_present: boolean
}> {
  const secretKey = process.env.STRIPE_SECRET_KEY || ''
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

  const result = {
    connected: false,
    error: null as string | null,
    secret_key_present: secretKey.startsWith('sk_'),
    webhook_secret_present: webhookSecret.startsWith('whsec_'),
  }

  if (!secretKey || !secretKey.startsWith('sk_')) {
    result.error = 'Missing or invalid STRIPE_SECRET_KEY — not configured (optional for this repo)'
    return result
  }

  try {
    const response = await fetch('https://api.stripe.com/v1/balance', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${secretKey}`,
      },
    })

    if (response.status === 200) {
      result.connected = true
    } else if (response.status === 401) {
      result.error = 'Stripe returned 401 — secret key is invalid'
    } else {
      result.error = `Stripe returned unexpected status: ${response.status}`
    }
  } catch (err) {
    result.error = `Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`
  }

  return result
}

// ─── Main Handler ────────────────────────────────────────────────────────────

export async function GET() {
  const [supabase, beehiiv, stripe] = await Promise.all([
    testSupabase(),
    testBeehiiv(),
    testStripe(),
  ])

  // For TCU, only Supabase is truly required — beehiiv and stripe are optional
  const coreConnected = supabase.connected
  const optionalConnected = beehiiv.connected && stripe.connected

  let status: string
  if (coreConnected && optionalConnected) {
    status = 'healthy'
  } else if (coreConnected) {
    status = 'degraded'
  } else {
    status = 'broken'
  }

  const envVars: Record<string, string> = {
    NEXT_PUBLIC_SUPABASE_URL: detectStatus('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: detectStatus('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    SUPABASE_SERVICE_ROLE_KEY: detectStatus('SUPABASE_SERVICE_ROLE_KEY', process.env.SUPABASE_SERVICE_ROLE_KEY),
    BEEHIIV_API_KEY: detectStatus('BEEHIIV_API_KEY', process.env.BEEHIIV_API_KEY),
    BEEHIIV_PUBLICATION_ID: detectStatus('BEEHIIV_PUBLICATION_ID', process.env.BEEHIIV_PUBLICATION_ID),
    STRIPE_SECRET_KEY: detectStatus('STRIPE_SECRET_KEY', process.env.STRIPE_SECRET_KEY),
    STRIPE_WEBHOOK_SECRET: detectStatus('STRIPE_WEBHOOK_SECRET', process.env.STRIPE_WEBHOOK_SECRET),
  }

  // Additional placeholder checks specific to known bad values
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  if (supabaseUrl && !isValidUrl(supabaseUrl)) {
    envVars.NEXT_PUBLIC_SUPABASE_URL = 'placeholder'
  }
  const pubId = process.env.BEEHIIV_PUBLICATION_ID || ''
  if (pubId && !isValidPublicationId(pubId)) {
    envVars.BEEHIIV_PUBLICATION_ID = 'placeholder'
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    project: 'tcu-market-kitchen',
    status,
    integrations: {
      supabase,
      beehiiv,
      stripe,
    },
    env_vars: envVars,
  })
}
