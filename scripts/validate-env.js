#!/usr/bin/env node

/**
 * TCU Market Kitchen Terminal — Build-Time Environment Variable Validator
 * Runs as "prebuild" script.
 *
 * ESCALATION RULE (OPS/011):
 * TCU operates in degraded mode (localStorage) without Supabase.
 * This validator NEVER fails the build for missing Supabase keys.
 * It warns only. Build always continues.
 *
 * Skip with: CI_SKIP_ENV_VALIDATE=true (only for CI test pipelines)
 */

if (process.env.CI_SKIP_ENV_VALIDATE === 'true') {
  console.log('⏭  ENV validation skipped (CI_SKIP_ENV_VALIDATE=true)')
  process.exit(0)
}

// Skip on ALL Vercel builds unless explicitly in production with all vars present
if (process.env.VERCEL_ENV === 'preview') {
  console.log('⏭  ENV validation skipped (Vercel preview)')
  process.exit(0)
}

// Skip if explicitly in development mode
if (process.env.NODE_ENV === 'development') {
  console.log('⏭  ENV validation skipped (development mode)')
  process.exit(0)
}

if (process.env.VERCEL_ENV === 'production') {
  // Only enforce on production — and only WARN, never FAIL, for TCU Supabase keys
  // TCU can operate in degraded mode without Supabase (localStorage fallback)
  const REQUIRED_OR_WARN = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
  ]
  const missing = REQUIRED_OR_WARN.filter(key =>
    !process.env[key] ||
    process.env[key].includes('placeholder') ||
    process.env[key] === key.toLowerCase()
  )
  if (missing.length > 0) {
    console.warn('⚠️  TCU running in degraded mode — Supabase not configured:')
    missing.forEach(k => console.warn(`   [WARN] ${k} not set`))
    console.warn('   → XP, progress, and journal features require Supabase.')
    console.warn('   → Local/guest mode is active. See ENV-SETUP.md.')
    // DO NOT exit(1) — warn only, build continues
  }
}

// Optional vars — warn but don't fail
const optional = {
  BEEHIIV_API_KEY: {
    validate: (v) => v.length > 20 && v.toLowerCase() !== 'beehiiv_api_key',
    hint: 'Must be your Beehiiv API key — find it in Beehiiv → Settings → API Keys',
  },
  BEEHIIV_PUBLICATION_ID: {
    validate: (v) => v.startsWith('pub_'),
    hint: 'Must start with pub_ — find it in Beehiiv → Settings → Publication ID',
  },
}

const warnings = []

for (const [key, config] of Object.entries(optional)) {
  const value = process.env[key]
  if (!value || value.trim() === '') continue

  if (value.toLowerCase() === key.toLowerCase()) {
    warnings.push(`⚠️  ${key}: value is placeholder text "${value}" — fix or remove it`)
  } else if (!config.validate(value)) {
    warnings.push(`⚠️  ${key}: invalid format — ${config.hint}`)
  }
}

if (warnings.length > 0) {
  console.warn('')
  console.warn('  Optional env var warnings (build continues):')
  for (const w of warnings) {
    console.warn(`    ${w}`)
  }
  console.warn('')
}

console.log('✓ ENV validation complete — build continuing (degraded mode OK)')
