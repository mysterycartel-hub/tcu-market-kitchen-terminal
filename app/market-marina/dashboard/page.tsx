"use client";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import Link from "next/link";
import { DEFAULT_SYMBOL } from "@/lib/tcu/symbols";
import ConceptVault from "@/components/tcu/ConceptVault";
import DailyKitchenReview from "@/components/tcu/DailyKitchenReview";
import { useTCUProgress } from "@/components/tcu/TCUProgressProvider";
import { FIRST_MISSION_ID } from "@/lib/tcu/progress";
import { useState } from "react";

type RecentAnalysis = {
  id: string;
  summary: string;
  symbol: string;
  timeframe: string;
  createdAt: string;
};

export default function DashboardPage() {
  const { progress } = useTCUProgress();
  const [recentAnalyses] = useState<RecentAnalysis[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem("tcu.chart-analyses.recent") || "[]";
      return JSON.parse(raw) as RecentAnalysis[];
    } catch {
      return [];
    }
  });

  const hasFirstMission = progress.completedMissions.includes(FIRST_MISSION_ID);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <TopMarketBar selectedSymbol={DEFAULT_SYMBOL} grade="B" mode="Practice" onChefRead={() => {}} onChecklist={() => {}} />
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">Market Marina Dashboard</p>
          <h2 className="mt-2 text-3xl font-black text-white">Your kitchen command center</h2>
          <p className="mt-2 text-slate-400 text-sm">
            {progress.profile ? `Welcome back, ${progress.profile.name}.` : "Create your account to begin."}
          </p>
          <p className="mt-3 max-w-3xl text-slate-300">
            Track XP, review concepts, protect your mindset, and keep the chart language simple.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/market-marina/tcu-terminal" className="rounded-lg bg-violet-600 px-4 py-2 font-bold text-white">Open Chart Kitchen</Link>
            <Link href="/market-marina/vault" className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 font-bold text-amber-100">Open TCU Concept Vault</Link>
            <Link href="/market-marina/journal" className="rounded-lg border border-white/10 px-4 py-2 font-bold text-slate-200">Open Journal</Link>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"><p className="text-xs uppercase text-slate-500 font-bold">XP</p><p className="mt-2 text-3xl font-black text-amber-300">{progress.xp}</p><p className="text-sm text-slate-400 mt-2">Earn XP by reviewing concepts and finishing missions.</p></div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"><p className="text-xs uppercase text-slate-500 font-bold">Rank</p><p className="mt-2 text-3xl font-black text-violet-300">{progress.rank}</p><p className="text-sm text-slate-400 mt-2">Advance by learning the roadmap in order.</p></div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"><p className="text-xs uppercase text-slate-500 font-bold">Analyses Saved</p><p className="mt-2 text-3xl font-black text-cyan-300">{recentAnalyses.length}</p><p className="text-sm text-slate-400 mt-2">Saved from Chart Kitchen AI coach.</p></div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"><p className="text-xs uppercase text-slate-500 font-bold">Journal Entries</p><p className="mt-2 text-3xl font-black text-emerald-300">{progress.journalCount}</p><p className="text-sm text-slate-400 mt-2">Track lessons and avoid repeat mistakes.</p></div>
            </section>

            <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 font-black">Mission Status</p>
              <p className="mt-2 text-sm text-slate-100">First mission: {hasFirstMission ? "Completed" : "Open"}</p>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 font-black">Recent Chart Analyses</p>
                <span className="text-xs text-slate-500">Missions completed: {progress.completedMissions.length}</span>
              </div>
              {recentAnalyses.length ? (
                <div className="space-y-2">
                  {recentAnalyses.slice(0, 5).map((entry) => (
                    <div key={entry.id} className="rounded-xl border border-white/10 bg-slate-900/70 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-black">{entry.symbol} · {entry.timeframe}</p>
                      <p className="mt-1 text-sm text-slate-200 leading-5">{entry.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">No saved analyses yet. Run Analyze Chart in Chart Kitchen and save to Journal.</p>
              )}
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-black">First Mission</p>
                  <h3 className="text-2xl font-black">Read the first chart like a chef</h3>
                </div>
                <Link href="/market-marina/missions" className="rounded-lg border border-white/10 px-4 py-2 text-sm font-bold text-slate-200">Open Missions</Link>
              </div>
              <p className="text-sm text-slate-300 leading-6">
                Bias → Liquidity → AOI → Delivery → Confirmation → Entry → Targets → Management.
              </p>
              <Link href="/market-marina/tcu-terminal" className="inline-flex rounded-lg bg-violet-600 px-4 py-2 font-bold text-white">Continue to Chart Kitchen</Link>
            </section>

            <DailyKitchenReview />
            <ConceptVault />
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">Daily Mission Focus</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>• Review Bias before touching Entry.</li>
                <li>• Mark Liquidity and AOI before saving a plan.</li>
                <li>• Use Burn Alarm if the setup feels rushed.</li>
                <li>• End each session with Journal review.</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-rose-400 font-black">Overtrading Watch</p>
              <p className="mt-3 text-sm text-slate-300">Too many clicks are usually a process problem, not a market problem. Slow down and reset the kitchen.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
