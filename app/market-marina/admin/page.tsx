"use client";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import { DEFAULT_SYMBOL } from "@/lib/tcu/symbols";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TopMarketBar
        selectedSymbol={DEFAULT_SYMBOL}
        grade="--"
        mode="Admin"
        onChefRead={() => {}}
        onChecklist={() => {}}
      />
      <main className="p-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-black">Content Manager (Admin)</h2>
        <p className="mt-2 text-slate-400">Placeholder admin area for managing missions, characters, and content.</p>
      </main>
    </div>
  );
}
