"use client";

import { useMemo, useState } from "react";
import { DAILY_REVIEW } from "@/lib/tcu/vault";

export default function DailyKitchenReview() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  const completedCount = useMemo(() => Object.values(done).filter(Boolean).length, [done]);

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
      <div className="flex items-end justify-between gap-3 mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-black">Daily Kitchen Review</p>
          <h2 className="text-2xl font-black text-white">Checklist before you trade</h2>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Complete</p>
          <p className="text-2xl font-black text-amber-300">{completedCount}/{DAILY_REVIEW.length}</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {DAILY_REVIEW.map((item) => {
          const checked = done[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setDone((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
              className={`rounded-2xl border p-4 text-left transition ${
                checked
                  ? "border-emerald-400/30 bg-emerald-500/10"
                  : "border-white/10 bg-slate-900/60 hover:border-amber-400/30 hover:bg-slate-900/80"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-black text-white">{item.title}</h3>
                <span className={checked ? "text-emerald-300 font-bold text-xs" : "text-slate-500 text-xs"}>
                  {checked ? "Done" : "Open"}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-300 leading-6">{item.note}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 p-4 text-sm text-indigo-100">
        Grandma Market rule: if the checklist feels rushed, slow down and finish the full review first.
      </div>
    </section>
  );
}
