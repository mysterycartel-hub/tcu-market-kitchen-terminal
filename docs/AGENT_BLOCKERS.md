# AGENT BLOCKERS
# When an agent hits a wall, it writes here and keeps moving.
# Maurice reviews blockers as CEO decisions only.

---

## BLOCKER: git index.lock — Persistent
**Date:** 2026-06-21
**Agent:** Claude (Cowork) via bash sandbox
**Issue:** Bash cannot write to `.git/` objects on OneDrive-mounted Windows repo.
**Workaround:** Run git commands from Windows PowerShell directly, not from Claude bash.
**Fix command:**
```powershell
Remove-Item .git\index.lock -Force -EA SilentlyContinue
```
**Status:** Recurring. Not fixable from bash. Always use PowerShell for git on this machine.

---

## BLOCKER: AI Coach live mode — No API key
**Date:** 2026-06-21
**Agent:** Claude (Cowork)
**Issue:** `OPENAI_API_KEY` not set in Vercel env vars. AI Coach runs demo mode only.
**CEO Decision Needed:** Add API key to Vercel project settings.
**Path:** Vercel → tcu-market-kitchen-terminal → Settings → Environment Variables → Add OPENAI_API_KEY
**Status:** Waiting on Maurice decision (costs money — his call).

---

## BLOCKER: Supabase not configured
**Date:** 2026-06-21
**Agent:** Claude (Cowork)
**Issue:** Journal and chart-analyses API routes exist but Supabase DB is not set up. Data saves to local storage only.
**CEO Decision Needed:** Create Supabase project, run `lib/tcu/schema.sql`, add env vars to Vercel.
**Status:** Waiting on Maurice decision.

---

## BLOCKER: chef-goldie.png stray file
**Date:** 2026-06-21
**Agent:** Claude (Cowork)
**Issue:** SVG content accidentally written to `.png` extension. File not referenced anywhere.
**Workaround:** Not referenced in any code. Safe to ignore.
**Fix:** Delete from Windows Explorer: `public\tcu\characters\chef-goldie.png`
**Status:** Minor. Not affecting build.
