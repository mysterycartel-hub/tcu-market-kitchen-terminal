TCU Market Kitchen Terminal — MVP Scaffold

This workspace contains a Next.js App Router skeleton for the Trading Chef University (TCU) Market Kitchen Terminal.

Files added by the CTO Builder agent:
- `app/market-marina/*` — placeholder pages: landing, auth, dashboard, chart-upload, roadmap, characters, missions, journal, library, admin
- `app/api/upload/route.ts` — chart upload placeholder
- `app/api/ai-analyze/route.ts` — AI analysis placeholder
- `lib/tcu/schema.sql` — DB schema for MVP
- `lib/tcu/seed.json` — sample seed data
- `components/tcu/SiteShell.tsx` — simple site wrapper

How to run:
1. Install deps: `npm install` (already set in project)
2. Run dev server:
```bash
npm run dev
```

Notes:
- This is a UI/UX scaffold and placeholder APIs. No broker connections or live data.
- Next steps: wire auth, persistence, AI services, and Stripe integration.
