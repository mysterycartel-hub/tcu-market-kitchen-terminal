"use client";
import { type ChangeEvent, useMemo, useState } from "react";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import { DEFAULT_SYMBOL } from "@/lib/tcu/symbols";
import ChefReadChecklist from "@/components/tcu/ChefReadChecklist";
import { getConceptReviewXp } from "@/lib/tcu/vault";
import { useTCUProgress } from "@/components/tcu/TCUProgressProvider";

export default function ChartUploadPage() {
  const { addXP } = useTCUProgress();
  const [fileName, setFileName] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [analysis, setAnalysis] = useState("");

  const conceptScore = useMemo(() => (notes ? Math.min(5, Math.ceil(notes.length / 80)) : 0), [notes]);
  const xp = getConceptReviewXp(conceptScore);

  const runAnalysis = () => {
    if (notes.trim()) {
      addXP(xp);
    }
    setAnalysis(
      notes.trim()
        ? `Chef Read: review Bias, Liquidity, AOI, then wait for Delivery and Candle Proof. This chart note is structured and calm. XP awarded: +${xp}.`
        : "Add a short chart note first so the review has context.",
    );
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.files?.[0]?.name || "");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <TopMarketBar selectedSymbol={DEFAULT_SYMBOL} grade="--" mode="Upload" onChefRead={() => {}} onChecklist={() => {}} />
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">Chart Upload Analysis</p>
          <h2 className="mt-2 text-3xl font-black">Upload a screenshot and review it like a chef</h2>
          <p className="mt-3 text-slate-300 max-w-3xl">
            This is a structured practice review. It teaches market reading, not live trading.
          </p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">Upload & Note</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:font-bold file:text-white hover:file:bg-violet-500"
            />
            <p className="text-xs text-slate-500">Selected file: {fileName || "none yet"}</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={7}
              placeholder="Write the setup in plain English: bias, liquidity, AOI, delivery, entry, targets..."
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-600"
            />
            <button
              type="button"
              onClick={runAnalysis}
              className="rounded-lg bg-violet-600 px-4 py-2 font-black text-white hover:bg-violet-500 transition"
            >
              Request Analysis
            </button>
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              Concept review XP: +{xp}
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-300">
              {analysis || "Chef Read output will appear here after you submit the note."}
            </div>
          </section>

          <div className="space-y-6">
            <ChefReadChecklist />
            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-black">AI Analysis Logic</p>
              <p className="mt-3 text-sm text-slate-300 leading-6">
                Placeholder logic only: read the note, confirm the roadmap, and return a calm structured summary. No live data or broker actions.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
