"use client";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import { ROADMAP_STEPS } from "@/lib/tcu/constants";
import { DEFAULT_SYMBOL } from "@/lib/tcu/symbols";

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TopMarketBar selectedSymbol={DEFAULT_SYMBOL} grade="--" mode="Roadmap" onChefRead={() => {}} onChecklist={() => {}} />
      <main className="p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-black">TCU Roadmap Checklist</h2>
        <div className="mt-4 grid gap-3">
          {ROADMAP_STEPS.map((s) => (
            <div key={s} className="rounded-lg bg-slate-900 p-3 flex items-center justify-between">
              <div>{s}</div>
              <div className="text-xs text-slate-400">Status: Practice</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
