# ENV-SETUP.md — TCU Market Kitchen Terminal Environment Variables

> **This is your permanent reference.** Before adding env vars to Vercel, confirm each value matches the format below. If it doesn't match, it's wrong — don't add it.

---

## Quick Rules

1. All 3 Supabase vars must come from the **SAME** project: **"tcu-market-kitchen"** (us-east-1)
2. Never copy keys from "mysterycartel-hub's Project" — that's for the mystermyself repo
3. If a value looks like a placeholder (matches the key name, is short, or doesn't match the format), it IS wrong
4. After adding vars, visit: **https://tcu-market-kitchen-terminal.vercel.app/api/health** — instant proof of what works

---

## Required Variables

### SUPABASE (3 vars) — All from the SAME project

| Variable | Where to Find | Format |
|----------|---------------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | supabase.com → Project → Settings → API → Project URL | `https://xxxxxxxxxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | supabase.com → Project → Settings → API → anon public key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long JWT, 200+ chars) |
| `SUPABASE_SERVICE_ROLE_KEY` | supabase.com → Project → Settings → API → service_role secret key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long JWT, different from anon) |

**Which Supabase project?**
→ Use **"tcu-market-kitchen"** (region: us-east-1)
→ Do NOT use "mysterycartel-hub's Project" — that belongs to the mystermyself repo

**Common mistakes:**
- ❌ Pasting "supabase_url" or "your-project-url" as the value
- ❌ Pasting a URL that doesn't end in `.supabase.co`
- ❌ Using the anon key where the service role key should go (they look similar but are different)
- ❌ Copying keys from "mysterycartel-hub's Project" into this repo

---

### BEEHIIV (2 vars) — Optional but recommended

| Variable | Where to Find | Format |
|----------|---------------|--------|
| `BEEHIIV_API_KEY` | beehiiv.com → Settings → Integrations → API Keys → Create/copy | Long alphanumeric string (40+ chars) |
| `BEEHIIV_PUBLICATION_ID` | beehiiv.com → Settings → scroll down to Publication ID | `pub_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |

**Your known publication ID:** `pub_0c50a01f-a27b-4dbb-b230-3bb5c6b22bc7`

**Common mistakes:**
- ❌ Value is literally `"beehiiv_publication_id"` — that's placeholder text, not a real ID
- ❌ Publication ID doesn't start with `pub_`
- ❌ API key returns 401 — it's expired. Create a new one in Beehiiv → Settings → API Keys

---

### STRIPE (2 vars) — Optional for paid plans

| Variable | Where to Find | Format |
|----------|---------------|--------|
| `STRIPE_SECRET_KEY` | stripe.com → Developers → API Keys → Secret key | `sk_live_...` or `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | stripe.com → Developers → Webhooks → select endpoint → Signing secret | `whsec_...` |

**Additional Stripe price vars (optional):**
- `STRIPE_PRICE_PRO_MONTHLY` — Price ID for Pro plan
- `STRIPE_PRICE_MASTER_MONTHLY` — Price ID for Master plan
- `STRIPE_PRICE_STARTER_MONTHLY` — Price ID for Starter plan

---

### OPTIONAL (app runs in demo mode without these)

| Variable | Purpose | Format |
|----------|---------|--------|
| `OPENAI_API_KEY` | AI trading coach | `sk-...` |
| `NEXT_PUBLIC_MARKET_DATA_PROVIDER` | Live candles source | `twelve_data` or `polygon` or empty |
| `MARKET_DATA_API_KEY` | Market data key | Provider-specific |
| `BLOB_READ_WRITE_TOKEN` | Chart screenshot uploads | Vercel Blob token |

---

## After Adding Vars

1. Go to: **https://tcu-market-kitchen-terminal.vercel.app/api/health**
2. You'll see a JSON response showing:
   - ✅ Green = connected and working
   - ❌ Red = broken with exact reason
3. Fix only the broken ones. Don't touch what's green.

---

## Vercel Project

- **Project ID:** `prj_gg3jZV489O1xK5vW3msrmf21pRBG`
- **Dashboard:** https://vercel.com/mysterycartel-hub/tcu-market-kitchen-terminal/settings/environment-variables
- **Where to add vars:** Settings → Environment Variables → add each one for Production + Preview + Development

---

## Checklist Before Deploy

- [ ] `NEXT_PUBLIC_SUPABASE_URL` starts with `https://` and ends with `.supabase.co`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` starts with `eyJ` and is 200+ characters
- [ ] `SUPABASE_SERVICE_ROLE_KEY` starts with `eyJ`, is different from anon key
- [ ] All 3 Supabase vars come from **"tcu-market-kitchen"** project
- [ ] `BEEHIIV_PUBLICATION_ID` starts with `pub_` (if using newsletter)
- [ ] `STRIPE_SECRET_KEY` starts with `sk_live_` or `sk_test_` (if using payments)
