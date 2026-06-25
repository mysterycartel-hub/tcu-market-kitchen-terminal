#!/usr/bin/env node

/**
 * TCU Market Kitchen Terminal — Build-Time Environment Variable Validator
 * Runs as "prebuild" script. Fails the build if required vars are missing or placeholders.
 *
 * Skip with: CI_SKIP_ENV_VALIDATE=true (only for CI test pipelines)
 */

if (process.env.CI_SKIP_ENV_VALIDATE === 'true') {
  console.log('⏭  ENV validation skipped (CI_SKIP_ENV_VALIDATE=true)')
  process.exit(0)
}

const required = {
  NEXT_PUBLIC_SUPABASE_URL: {
    validate: (v) => v.startsWith('https://') && v.includes('.supabase.co'),
    hint: 'Must be https://xxxx.supabase.co — find it in Supabase → Settings → API → Project URL',
    example: 'https://abcdefghijkl.supabase.co',
  },
  NEXT_PUBLIC_SUPABASE_ANON_KEY: {
    validate: (v) => v.length > 100 && v.startsWith('eyJ'),
    hint: 'Must be the anon/public JWT (200+ chars, starts with eyJ) — find it in Supabase → Settings → API',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },
  SUPABASE_SERVICE_ROLE_KEY: {
    validate: (v) => v.length > 100 && v.startsWith('eyJ'),
    hint: 'Must be the service_role JWT (different from anon key) — find it in Supabase → Settings → API',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  },
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

const errors = []
const warnings = []

for (const [key, config] of Object.entries(required)) {
  const value = process.env[key]

  if (!value || value.trim() === '') {
    errors.push({
      type: 'MISSING',
      key,
      hint: config.hint,
      example: config.example,
    })
    continue
  }

  // Check if value is literally the key name (placeholder)
  if (value.toLowerCase() === key.toLowerCase() || value.toLowerCase() === key.toLowerCase().replace(/_/g, '')) {
    errors.push({
      type: 'PLACEHOLDER DETECTED',
      key,
      hint: `Value is "${value}" which is just the variable name, not a real value`,
      example: config.example,
    })
    continue
  }

  // Check format
  if (!config.validate(value)) {
    errors.push({
      type: 'INVALID FORMAT',
      key,
      hint: config.hint,
      example: config.example,
    })
  }
}

// Check optional vars (warn only)
for (const [key, config] of Object.entries(optional)) {
  const value = process.env[key]
  if (!value || value.trim() === '') continue // Skip if not set — it's optional

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

if (errors.length > 0) {
  console.error('')
  console.error('╔══════════════════════════════════════════════════════════════════╗')
  console.error('║  ❌  ENV VAR VALIDATION FAILED — Build cannot continue          ║')
  console.error('╚══════════════════════════════════════════════════════════════════╝')
  console.error('')

  for (const err of errors) {
    console.error(`  [${err.type}] ${err.key}`)
    console.error(`    → ${err.hint}`)
    if (err.example) console.error(`    → Example: ${err.example}`)
    console.error('')
  }

  console.error('──────────────────────────────────────────────────────────────────')
  console.error('  Fix these in Vercel → Settings → Environment Variables')
  console.error('  Then redeploy. See ENV-SETUP.md for detailed instructions.')
  console.error('──────────────────────────────────────────────────────────────────')
  console.error('')

  process.exit(1)
}

console.log('✓ All environment variables validated — build continuing')
