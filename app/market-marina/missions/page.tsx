"use client";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import { DEFAULT_SYMBOL } from "@/lib/tcu/symbols";
import CharacterLessons from "@/components/tcu/CharacterLessons";
import { useTCUProgress } from "@/components/tcu/TCUProgressProvider";
import { FIRST_MISSION_ID } from "@/lib/tcu/progress";

export default function MissionsPage() {
  const { progress, completeFirstMission } = useTCUProgress();

  const handleComplete = () => {
    completeFirstMission();
  };

  const firstMissionStatus = progress.completedMissions.includes(FIRST_MISSION_ID);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <TopMarketBar selectedSymbol={DEFAULT_SYMBOL} grade="--" mode="Missions" onChefRead={() => {}} onChecklist={() => {}} />
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">Missions</p>
          <h2 className="mt-2 text-3xl font-black">Character-led learning paths</h2>
          <p className="mt-3 text-slate-300 max-w-3xl">
            Finish lessons, review concepts, and earn XP for calm decision-making.
          </p>
        </section>

        <section className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 font-black">Mission 1</p>
            <h3 className="text-2xl font-black text-white">Complete the first market read</h3>
            <p className="mt-2 text-sm text-slate-200">Open the chart, find the bias, and explain the setup in plain English.</p>
          </div>
          <button
            type="button"
            onClick={handleComplete}
            className="rounded-lg bg-emerald-600 px-4 py-2 font-black text-white hover:bg-emerald-500 transition"
          >
            {firstMissionStatus ? "Mission Completed" : "Complete Mission +60 XP"}
          </button>
        </section>

        <CharacterLessons />

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"><p className="text-xs uppercase text-slate-500 font-bold">XP Reward</p><p className="mt-2 text-2xl font-black text-amber-300">Concept reviews</p></div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"><p className="text-xs uppercase text-slate-500 font-bold">Mindset</p><p className="mt-2 text-2xl font-black text-emerald-300">Burn Alarm</p></div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"><p className="text-xs uppercase text-slate-500 font-bold">Patience Rule</p><p className="mt-2 text-2xl font-black text-violet-300">Grandma Market</p></div>
        </section>
      </main>
    </div>
  );
}
