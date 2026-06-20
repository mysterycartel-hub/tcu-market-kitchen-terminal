"use client";

import { useMemo, useState } from "react";
import { CONCEPT_CARDS, getConceptReviewXp } from "@/lib/tcu/vault";
import { useTCUProgress } from "@/components/tcu/TCUProgressProvider";

export default function ConceptVault() {
  const { progress, reviewConcept } = useTCUProgress();
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const reviewedCount = useMemo(
    () => CONCEPT_CARDS.filter((c) => progress.completedConcepts.includes(c.id)).length,
    [progress.completedConcepts],
  );
  const xpEarned = getConceptReviewXp(reviewedCount);

  const handleCardClick = (id: string, xp: number) => {
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!progress.completedConcepts.includes(id)) {
      reviewConcept(id, xp);
    }
  };

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-slate-950/20">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">TCU Concept Vault</p>
          <h2 className="text-2xl font-black text-white">Flashcards for structured learning</h2>
        </div>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-right">
          <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold">XP from reviews</p>
          <p className="text-2xl font-black text-emerald-200">+{xpEarned}</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {CONCEPT_CARDS.map((card) => {
          const isReviewed = progress.completedConcepts.includes(card.id);
          const isFlipped = flipped[card.id];
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(card.id, card.xp)}
              className={`text-left rounded-2xl border p-4 transition ${
                isReviewed
                  ? "border-emerald-400/40 bg-emerald-500/10"
                  : "border-white/10 bg-slate-900/60 hover:border-violet-400/40 hover:bg-slate-900/80"
              }`}
            >
              {!isFlipped ? (
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{card.shorthand}</p>
                      <h3 className="text-xl font-black text-white">{card.title}</h3>
                    </div>
                    <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-1 text-[10px] font-bold text-violet-200 shrink-0">
                      {card.xp} XP
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-6">{card.definition}</p>
                  <div className="mt-4 flex items-center justify-between gap-2 text-xs">
                    <span className="text-slate-500">Tap to reveal tip</span>
                    <span className={isReviewed ? "text-emerald-300 font-bold" : "text-slate-400"}>
                      {isReviewed ? "Reviewed ✓" : "Pending"}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold mb-2">Chef&apos;s Tip</p>
                  <p className="text-sm text-amber-200 leading-6 italic">{card.clue}</p>
                  <p className="mt-3 text-[10px] text-slate-500">Tap again to flip back</p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-violet-100">
          {reviewedCount} / {CONCEPT_CARDS.length} cards reviewed. All reviews are saved and award XP.
        </p>
        <span className="text-xs text-slate-500">Reviews persist across sessions via XP tracker.</span>
      </div>
    </section>
  );
}
