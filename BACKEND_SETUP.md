# TCU Market Kitchen Terminal — Backend Setup Guide

## Overview

This project uses Vercel as the deployment platform with the following backend services:

| Service | Status | Purpose |
|---|---|---|
| Vercel | Production host | Deploys Next.js, serves API routes |
| Supabase | Auth + DB | User profiles, progress, journals, trade plans |
| Vercel Blob | File storage | Chart screenshot uploads |
| Stripe | Payments | Subscription billing (wired but not live) |
| Beehiiv | Email list | Subscriber capture on signup |
| TradingView | Live charts | Embedded widget — no key required |

---

## 1. Vercel Deployment

### Deploy

1. Push the repo to GitHub / GitLab / Bitbucket.
2. Import the repository at **vercel.com/new**.
3. Framework preset: **Next.js** (auto-detected).
4. Set all environment variables (see section 6 below) in the Vercel dashboard under **Settings → Environment Variables**.
5. Deploy.

### Environment Variables on Vercel

Go to **Project → Settings → Environment Variables** and add each variable listed in `.env.example`. Set the scope per variable:

- `NEXT_PUBLIC_*` — all environments (Production, Preview, Development)
- Secret keys — Production only (or Production + Preview if you use test keys for Preview)

### Routes confirmed working

| Route | Type | Notes |
|---|---|---|
| `/market-marina/landing` | Page | Marketing / entry point |
| `/market-marina/tcu-terminal` | Page | Main chart terminal |
| `/market-marina/auth` | Page | Magic-link sign-in |
| `/market-marina/dashboard` | Page | User command centre |
| `/market-marina/missions` | Page | Mission board |
| `/market-marina/journal` | Page | Journal + mindset |
| `/market-marina/vault` | Page | Concept flashcards |
| `/market-marina/characters` | Page | Coach crew |
| `/api/auth/callback` | Route Handler | Magic-link redirect from Supabase |
| `/api/email/subscribe` | Route Handler | Beehiiv subscriber POST |
| `/api/stripe/webhook` | Route Handler | Stripe event sync |

---

## 2. Supabase Setup

### Create a project

1. Go to **supabase.com** → New project.
2. Note the **Project URL** and **Anon Key** from **Settings → API**.

### Run the schema

1. In the Supabase Dashboard, open the **SQL Editor**.
2. Paste the entire contents of `supabase/schema.sql` and click **Run**.
3. Paste the entire contents of `supabase/seed.sql` and click **Run**.

### Tables created

| Table | Purpose |
|---|---|
| `profiles` | User XP, rank, mission/concept/character progress |
| `missions` | Static mission definitions |
| `mission_progress` | Completed missions per user |
| `journal_entries` | Full text of journal notes |
| `trade_plans` | Practice kitchen tickets |
| `character_unlocks` | Coach unlock events |
| `charts` | Chart upload sessions + Blob key |
| `characters` | Static coach definitions |
| `vault_items` | Concept flashcard definitions |
| `vault_progress` | Per-user flashcard reviews |
| `subscriptions` | Stripe subscription state |
| `library_items` | Educational content (admin-seeded) |

### Auth configuration

In Supabase Dashboard → **Authentication → Email**:

- Enable **Magic Link** (OTP / passwordless).
- Set **Site URL** to your Vercel production URL, e.g. `https://your-project.vercel.app`.
- Add `http://localhost:3000` to **Redirect URLs** for local dev.
- The auth callback is handled at `/api/auth/callback` (already implemented).

### Environment variables required

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # server-side only, never expose to browser
```

---

## 3. Vercel Blob Setup (Chart Uploads)

1. In the Vercel Dashboard → **Storage → Create Database → Blob**.
2. Connect the Blob store to your project.
3. Vercel automatically adds `BLOB_READ_WRITE_TOKEN` to your environment.

### Current behaviour without Blob

- Local chart upload preview still works using base64 data-URL in state.
- The upload is not persisted to a permanent URL.
- The blob helper in `lib/storage/blob.ts` logs a warning and returns `ok: false` gracefully.

---

## 4. Stripe Setup (Subscriptions)

No payments are processed in the current build. The structure is wired and ready.

### When ready to go live

1. Create a Stripe account at **dashboard.stripe.com**.
2. Create Products + Prices for each plan in the Stripe Dashboard.
3. Add the Price IDs to your Vercel env vars.
4. Create a webhook endpoint pointing to `https://your-project.vercel.app/api/stripe/webhook`.
5. Select events: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`.
6. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

### Plans configured (in `lib/billing/plans.ts`)

| ID | Name | Price |
|---|---|---|
| `free` | Free Kitchen | $0/mo |
| `starter` | Starter Chef | $9/mo |
| `pro` | Pro Kitchen | $27/mo |
| `founding` | Founding Member | $47/mo |

### Environment variables required

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER_MONTHLY=price_...
STRIPE_PRICE_PRO_MONTHLY=price_...
STRIPE_PRICE_FOUNDING_MONTHLY=price_...
```

---

## 5. Beehiiv Email Capture

1. Create a Beehiiv account at **app.beehiiv.com**.
2. Create a publication and note the **Publication ID** (UUID).
3. Generate an **API Key** at Settings → API.

### Current behaviour without Beehiiv

- `lib/email/beehiiv.ts` detects missing env vars and returns `{ ok: true, status: "mock" }`.
- Signup flow is never blocked.

### API endpoint

`POST /api/email/subscribe` — accepts `{ email: string }` JSON body.

### Environment variables required

```
BEEHIIV_API_KEY=...
BEEHIIV_PUBLICATION_ID=pub_...
```

---

## 6. Full Environment Variable Reference

Copy `.env.local.example` to `.env.local` for local development. All production values go in Vercel Dashboard → Settings → Environment Variables.

```
# App
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Beehiiv
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_STARTER_MONTHLY=
STRIPE_PRICE_PRO_MONTHLY=
STRIPE_PRICE_FOUNDING_MONTHLY=

# Vercel Blob
BLOB_READ_WRITE_TOKEN=

# Market data
NEXT_PUBLIC_MARKET_PROVIDER=tradingview-widget
TWELVE_DATA_API_KEY=
FINNHUB_API_KEY=
POLYGON_API_KEY=
ALPACA_API_KEY=
```

---

## 7. What Works Now (without any env vars)

| Feature | Status |
|---|---|
| Landing page | ✅ Live |
| TCU Terminal + Chef Read roadmap | ✅ Live |
| TradingView chart embed | ✅ Live (no key needed) |
| Symbol search + watchlists + favorites | ✅ Live |
| Journal, missions, vault, characters | ✅ Live |
| XP + rank tracking | ✅ Live |
| Local progress persistence (localStorage) | ✅ Live |
| Auth page UI | ✅ Live |
| Beehiiv subscribe endpoint | ✅ Returns mock success |
| Stripe webhook endpoint | ✅ Returns 200, no-op |
| Chart upload preview | ✅ In-memory preview |

## 8. What Is Mocked / Requires Env Vars

| Feature | Needs | Status |
|---|---|---|
| Magic-link email auth | Supabase env vars | Mocked — falls back to local account |
| Progress sync to cloud | Supabase env vars | Mocked — localStorage only |
| Chart screenshot storage | BLOB_READ_WRITE_TOKEN | Mocked — in-memory preview only |
| Beehiiv list subscription | Beehiiv env vars | Mocked — logs + returns success |
| Stripe payment processing | Stripe env vars | Not yet wired — structure in place |
| Stripe webhook sync | Stripe + Supabase env vars | Not yet wired — endpoint returns 200 |
