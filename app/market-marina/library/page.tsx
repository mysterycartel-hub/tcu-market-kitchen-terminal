"use client";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import ConceptVault from "@/components/tcu/ConceptVault";
import { DEFAULT_SYMBOL } from "@/lib/tcu/symbols";
import Link from "next/link";

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <TopMarketBar selectedSymbol={DEFAULT_SYMBOL} grade="--" mode="Library" onChefRead={() => {}} onChecklist={() => {}} />
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">TCU Concept Vault</p>
            <h2 className="mt-2 text-3xl font-black">Flashcards, structure, and saved learning</h2>
          </div>
          <Link href="/market-marina/dashboard" className="rounded-lg border border-violet-500/40 bg-violet-500/10 px-4 py-2 font-bold text-violet-100">Back to Dashboard</Link>
        </section>
        <ConceptVault />
      </main>
    </div>
  );
}
