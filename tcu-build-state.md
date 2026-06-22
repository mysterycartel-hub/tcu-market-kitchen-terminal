# TCU BUILD STATE
Last Updated: 2025-06-22
Last Tool: Kiro
Last Action: Initial audit

## BUILD STATUS
npm run build: PASS
Last Error: None — build compiles successfully (Next.js 16.2.9 Turbopack, 32 static pages, all routes generated)
Last Good Commit: 6e9f79b feat: chart model overlays, timeframe fix, button wiring, bridge protocol

## FILE STRUCTURE
- app/ — Next.js App Router pages (chart-kitchen, dashboard, journal, missions, roadmap, auth, market-marina, api)
- components/ — React components (chart/, market/, tcu/)
- lib/ — Business logic (aiCoach.ts, marketData.ts, tcuOverlayEngine.ts, billing/, db/, email/, market/, storage/, stripe/, supabase/, tcu/)
- public/ — Static assets and TCU character images
- supabase/ — Supabase config
- docs/ — Architecture docs and agent blockers
- _build-bibles/ — Canon and build rules
- assets/ — Brand assets

## NEXT STEP FOR CLAUDE
No build error to fix. Build passes clean. Runtime blockers exist:
1. OPENAI_API_KEY not set in Vercel — AI Coach stuck in demo mode
2. Supabase not configured — journal/chart-analyses save to localStorage only
3. public/tcu/characters/chef-goldie.png contains SVG content in wrong extension (cosmetic, not blocking)

## WAITING ON MAURICE
1. Add OPENAI_API_KEY to Vercel environment variables (costs money — CEO decision)
2. Create Supabase project, run lib/tcu/schema.sql, add env vars to Vercel
3. Approve live AI coaching spend
