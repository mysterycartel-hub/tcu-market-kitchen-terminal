"use client";
import Link from "next/link";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import { DEFAULT_SYMBOL } from "@/lib/tcu/symbols";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <TopMarketBar selectedSymbol={DEFAULT_SYMBOL} grade="--" mode="TCU" onChefRead={() => {}} onChecklist={() => {}} />
      <nav className="p-3 bg-slate-900/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex gap-4">
          <Link href="/market-marina/landing" className="text-sm">Home</Link>
          <Link href="/market-marina/dashboard" className="text-sm">Dashboard</Link>
          <Link href="/market-marina/tcu-terminal" className="text-sm">Chart Kitchen</Link>
          <Link href="/market-marina/roadmap" className="text-sm">Roadmap</Link>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto p-4">{children}</div>
    </div>
  );
}
