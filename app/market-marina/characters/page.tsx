"use client";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import { CHARACTER_CARDS } from "@/lib/tcu/characters";
import { DEFAULT_SYMBOL } from "@/lib/tcu/symbols";
import { useTCUProgress } from "@/components/tcu/TCUProgressProvider";
import { CHARACTER_LESSONS } from "@/lib/tcu/vault";

const UNLOCK_XP: Record<string, number> = {
  "Grandma Market": 80,
  "Wickie": 150,
  "Louie the Liquidity Chef": 200,
  "Burn Alarm": 250,
  "Profit Plate": 300,
  "Melissa Mayhem": 400,
  "Chef Goldie": 500,
  "Melody Mayhem": 600,
};

export default function CharactersPage() {
  const { progress } = useTCUProgress();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TopMarketBar selectedSymbol={DEFAULT_SYMBOL} grade="--" mode="Coaches" onChefRead={() => {}} onChecklist={() => {}} />
      <main className="p-8 max-w-5xl mx-auto space-y-6">
        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">Character Coaches</p>
          <h2 className="mt-2 text-3xl font-black text-white">TCU Kitchen Crew</h2>
          <p className="mt-2 text-slate-400 text-sm">
            Each coach unlocks as you earn XP. Your current XP: <span className="text-amber-300 font-black">{progress.xp}</span>
          </p>
        </section>

        {/* Trading Chef — always unlocked */}
        <div className="rounded-2xl border border-violet-500/40 bg-violet-500/10 p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">👨‍🍳</span>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-violet-300 font-bold">Always Unlocked · Main Guide</p>
              <h3 className="text-xl font-black text-white">Trading Chef</h3>
            </div>
            <span className="ml-auto rounded-lg bg-emerald-600/30 border border-emerald-500/40 px-2 py-1 text-[10px] font-bold text-emerald-200">UNLOCKED</span>
          </div>
          <p className="text-sm text-slate-300 leading-6">Keep the plan clean and structured. Follow all 8 steps in order.</p>
        </div>

        {/* Remaining characters from vault lessons */}
        <div className="grid gap-4 md:grid-cols-2">
          {CHARACTER_LESSONS.map((lesson) => {
            const unlockAt = UNLOCK_XP[lesson.name] ?? 0;
            const isUnlocked = progress.xp >= unlockAt || progress.unlockedCharacters.includes(lesson.name) || unlockAt === 0;
            return (
              <div
                key={lesson.name}
                className={`rounded-2xl border p-4 transition ${
                  isUnlocked
                    ? "border-violet-500/30 bg-slate-900/60"
                    : "border-white/8 bg-slate-950/40 opacity-70"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{lesson.role}</p>
                    <h3 className={`text-lg font-black ${isUnlocked ? "text-white" : "text-slate-400"}`}>{lesson.name}</h3>
                  </div>
                  {isUnlocked ? (
                    <span className="shrink-0 rounded-lg bg-emerald-600/25 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold text-emerald-300">UNLOCKED</span>
                  ) : (
                    <span className="shrink-0 rounded-lg bg-slate-800 border border-white/10 px-2 py-0.5 text-[9px] font-bold text-slate-500">
                      🔒 {unlockAt} XP
                    </span>
                  )}
                </div>
                {isUnlocked ? (
                  <>
                    <p className="text-sm text-slate-300 leading-5 mb-3">{lesson.lesson}</p>
                    <p className="text-xs text-violet-200/70 italic leading-5">&quot;{lesson.prompt}&quot;</p>
                  </>
                ) : (
                  <p className="text-sm text-slate-600">Earn {unlockAt} XP to unlock this coach.</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Raw character cards as bonus grid */}
        {CHARACTER_CARDS.length > 0 && (
          <section className="rounded-3xl border border-white/8 bg-slate-900/40 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 font-black mb-4">All Characters</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {CHARACTER_CARDS.map((c) => (
                <div key={c.name} className="rounded-xl bg-slate-900/60 border border-white/8 p-3">
                  <p className="font-bold text-white text-sm">{c.name}</p>
                  <p className="text-xs text-slate-400 mt-1 leading-4">{c.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
