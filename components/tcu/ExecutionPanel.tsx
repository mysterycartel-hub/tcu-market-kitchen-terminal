"use client";

import { useState } from "react";
import { ROADMAP_STEPS } from "@/lib/tcu/constants";
import { type MarketSymbol } from "@/lib/tcu/symbols";
import CharacterCoachCard, { getCharacterImageSource } from "./CharacterCoachCard";
import { type MarketKitchenKey } from "@/lib/tcu/marketKitchens";
import type { AICoachResult } from "@/lib/aiCoach";

type ExecutionPanelProps = {
  marketType: string;
  onToggleMarketType: () => void;
  lotSize: string;
  onLotSizeChange: (value: string) => void;
  riskMode: string;
  onToggleRiskMode: () => void;
  stopLoss: string;
  onStopLossChange: (value: string) => void;
  takeProfit: string;
  onTakeProfitChange: (value: string) => void;
  trailingStop: string;
  onTrailingStopChange: (value: string) => void;
  onBuy: () => void;
  onSell: () => void;
  onSave: () => void;
  onTradePlanSaved?: (plan: { content: string; symbol: string }) => void;
  grade: string;
  selectedRoadmap: Record<string, boolean>;
  onRoadmapToggle: (step: string) => void;
  selectedSymbol: MarketSymbol;
  selectedKitchen: MarketKitchenKey;
  selectedTimeframe: string;
  onAnalysisSaved?: (summary: string) => void;
};

export default function ExecutionPanel({
  marketType,
  onToggleMarketType,
  lotSize,
  onLotSizeChange,
  riskMode,
  onToggleRiskMode,
  stopLoss,
  onStopLossChange,
  takeProfit,
  onTakeProfitChange,
  trailingStop,
  onTrailingStopChange,
  onBuy,
  onSell,
  onSave,
  onTradePlanSaved,
  grade,
  selectedRoadmap,
  onRoadmapToggle,
  selectedSymbol,
  selectedKitchen,
  selectedTimeframe,
  onAnalysisSaved,
}: ExecutionPanelProps) {
  const [tradePlan, setTradePlan] = useState("");
  const [planSaved, setPlanSaved] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AICoachResult | null>(null);
  const [analysisStatus, setAnalysisStatus] = useState<string>("");

  const completed = ROADMAP_STEPS.filter((step) => selectedRoadmap[step]).length;

  const handleSavePlan = () => {
    if (!tradePlan.trim()) return;
    onTradePlanSaved?.({ content: tradePlan.trim(), symbol: selectedSymbol.ticker });
    setPlanSaved(true);
    setTimeout(() => setPlanSaved(false), 2500);
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    setAnalysisStatus("");
    try {
      const response = await fetch("/api/ai-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: selectedSymbol.ticker,
          timeframe: selectedTimeframe,
          notes: tradePlan,
        }),
      });

      const payload = await response.json().catch(() => null) as { analysis?: AICoachResult; error?: string } | null;

      if (!response.ok || !payload?.analysis) {
        setAnalysisStatus(payload?.error || "Analysis request failed.");
        return;
      }

      setAnalysis(payload.analysis);
      setAnalysisStatus(payload.analysis.message || "Analysis ready.");
    } catch {
      setAnalysisStatus("Analysis service unavailable. Try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const saveAnalysisToJournal = async () => {
    if (!analysis) return;

    const summary = [
      `${selectedSymbol.ticker} ${selectedTimeframe}`,
      `Bias: ${analysis.primaryBias}`,
      `Liquidity: ${analysis.liquidityMap}`,
      `AOI: ${analysis.aoi}`,
      `Entry: ${analysis.entryIdea}`,
      `Burn Point: ${analysis.burnPoint}`,
      `Tables Served: ${analysis.tablesServed}`,
      `Invalidation: ${analysis.invalidation}`,
      `Character: ${analysis.characterLesson}`,
    ].join(" | ");

    try {
      // Best-effort structured analysis persistence.
      void fetch("/api/chart-analyses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: selectedSymbol.ticker,
          timeframe: selectedTimeframe,
          bias: analysis.primaryBias,
          liquidity: analysis.liquidityMap,
          aoi: analysis.aoi,
          entry: analysis.entryIdea,
          burn_point: analysis.burnPoint,
          tables_served: analysis.tablesServed,
          invalidation: analysis.invalidation,
          ai_summary: analysis.journalSummary,
          character_lesson: analysis.characterLesson,
        }),
      });

      const response = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: summary }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null) as { error?: string } | null;
        setAnalysisStatus(payload?.error || "Could not save to journal. Check auth/Supabase config.");
        return;
      }

      if (typeof window !== "undefined") {
        const key = "tcu.chart-analyses.recent";
        const existing = JSON.parse(window.localStorage.getItem(key) || "[]") as Array<{ id: string; summary: string; symbol: string; timeframe: string; createdAt: string }>;
        const next = [{
          id: `${Date.now()}`,
          summary: analysis.journalSummary,
          symbol: selectedSymbol.ticker,
          timeframe: selectedTimeframe,
          createdAt: new Date().toISOString(),
        }, ...existing].slice(0, 10);
        window.localStorage.setItem(key, JSON.stringify(next));
      }

      onAnalysisSaved?.(summary);
      setAnalysisStatus("Saved to Journal.");
    } catch {
      setAnalysisStatus("Could not save to journal. Check Supabase setup.");
    }
  };

  const biasColor =
    selectedSymbol.bias === "Bullish"
      ? "text-emerald-400"
      : selectedSymbol.bias === "Bearish"
      ? "text-rose-400"
      : "text-slate-400";

  const activeCoachesByKitchen: Record<MarketKitchenKey, Array<{ name: string; role: string; description: string }>> = {
    "Forex Kitchen": [
      { name: "Louie Liquidity", role: "Liquidity Coach", description: "Marks the pool, the sweep, and the path of flow." },
      { name: "Candle Kid", role: "Candle Coach", description: "Waits for candle proof before the entry is trusted." },
    ],
    "Gold Kitchen": [
      { name: "Chef Goldie", role: "Gold Specialist", description: "XAUUSD timing, volatility, and respect for the move." },
    ],
    "Index Kitchen": [
      { name: "Grandma Market", role: "Bias Coach", description: "Keeps the higher-timeframe direction in view." },
      { name: "Louie Liquidity", role: "Liquidity Coach", description: "Marks where the index is likely to hunt stops." },
    ],
    "Stock Kitchen": [
      { name: "Nana Value", role: "Value Coach", description: "Patient entries and value-first risk handling." },
      { name: "Trading Chef", role: "Execution Coach", description: "Measured execution with clean setup logic." },
    ],
    "Crypto Kitchen": [
      { name: "Melissa Mayhem", role: "Emotion Coach", description: "FOMO, chaos, and emotional trap detection." },
      { name: "Melody Mayhem", role: "Rhythm Coach", description: "Read volatility rhythm before committing risk." },
    ],
    "Practice Kitchen": [
      { name: "Grandma Market", role: "Patience Coach", description: "Bias first. Wait for structure before you act." },
      { name: "Candle Kid", role: "Confirmation Coach", description: "Read the candles before calling the move real." },
    ],
  };

  const activeCoaches = activeCoachesByKitchen[selectedKitchen] ?? activeCoachesByKitchen["Forex Kitchen"];

  return (
    <div className="w-[360px] max-w-[360px] flex-shrink-0 flex flex-col gap-3 border-l border-violet-600/20 bg-gradient-to-b from-slate-900/80 to-slate-950/95 p-4 overflow-y-auto">

      {/* ── Symbol banner ── */}
      <div className="rounded-lg border border-amber-500/25 bg-amber-600/8 p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-amber-400/70 font-bold">Active Kitchen Symbol</p>
            <p className="text-2xl font-black text-amber-300 leading-none mt-0.5">{selectedSymbol.ticker}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{selectedSymbol.name}</p>
            <p className="text-[10px] font-black uppercase tracking-wider text-violet-300 mt-1">Price shown on chart</p>
          </div>
          <div className="text-right">
            <p className={`text-[10px] font-bold mt-0.5 ${biasColor}`}>{selectedSymbol.bias} Bias</p>
            <p className="mt-1 text-[10px] font-black uppercase tracking-wider text-slate-400">Live chart active</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.2em] text-violet-300 font-black">Active Coach</p>
        {activeCoaches.map((coach) => (
          <CharacterCoachCard
            key={coach.name}
            name={coach.name}
            role={coach.role}
            description={coach.description}
            imageSrc={getCharacterImageSource(coach.name)}
            accent={selectedKitchen === "Gold Kitchen" ? "amber" : selectedKitchen === "Crypto Kitchen" ? "orange" : selectedKitchen === "Stock Kitchen" ? "emerald" : "violet"}
          />
        ))}
      </div>

      {/* ── Header ── */}
      <div className="rounded-lg border border-violet-500/30 bg-violet-600/10 p-2.5 text-center">
        <p className="text-xs uppercase tracking-widest text-violet-300 font-black">🍽️ Kitchen Ticket Builder</p>
        <p className="text-[10px] text-violet-200/60 mt-0.5">Practice Planning Mode · No Real Execution</p>
      </div>

      {/* ── BUY / SELL ── */}
      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={onBuy}
          className="flex-1 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 px-3 py-4 text-base font-black uppercase tracking-wide text-white transition hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-600/40 border border-emerald-500/40"
        >
          🟢 BUY
        </button>
        <button
          type="button"
          onClick={onSell}
          className="flex-1 rounded-lg bg-gradient-to-br from-rose-600 to-rose-700 px-3 py-4 text-base font-black uppercase tracking-wide text-white transition hover:from-rose-500 hover:to-rose-600 shadow-lg shadow-rose-600/40 border border-rose-500/40"
        >
          🔴 SELL
        </button>
      </div>

      {/* ── Grade + Progress ── */}
      <div className="flex gap-2.5">
        <div className="flex-1 rounded-lg border border-amber-500/30 bg-amber-600/10 p-2.5 text-center">
          <p className="text-[9px] uppercase text-amber-300/70 tracking-widest font-black">Recipe Grade</p>
          <p className="mt-1 text-3xl font-black text-amber-400 drop-shadow-lg leading-none">{grade}</p>
        </div>
        <div className="flex-1 rounded-lg border border-violet-500/30 bg-violet-600/10 p-2.5">
          <p className="text-[9px] uppercase text-violet-300/70 tracking-widest font-black">Roadmap</p>
          <p className="mt-1 text-sm font-bold text-violet-200 leading-none">{completed}/{ROADMAP_STEPS.length} Steps</p>
          <div className="mt-2 h-2 rounded-full bg-slate-800/80 overflow-hidden border border-violet-500/20">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all"
              style={{ width: `${(completed / ROADMAP_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Order mode toggles ── */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onToggleMarketType}
          className="flex-1 rounded-lg border border-white/20 bg-slate-900/80 px-3 py-2 text-left text-xs font-bold text-white hover:bg-slate-800 transition"
        >
          <span className="text-[9px] uppercase text-slate-500 block font-semibold">Order Mode</span>
          <span className="text-slate-100">{marketType}</span>
        </button>
        <button
          type="button"
          onClick={onToggleRiskMode}
          className="flex-1 rounded-lg border border-white/20 bg-slate-900/80 px-3 py-2 text-left text-xs font-bold text-white hover:bg-slate-800 transition"
        >
          <span className="text-[9px] uppercase text-slate-500 block font-semibold">Risk Mode</span>
          <span className="text-slate-100">{riskMode}</span>
        </button>
      </div>

      {/* ── Fields ── */}
      <div className="space-y-2">
        <label className="block text-xs">
          <span className="uppercase tracking-wide text-slate-500 font-black text-[10px]">Lot Size</span>
          <input
            value={lotSize}
            onChange={(e) => onLotSizeChange(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/40"
          />
        </label>
        <div className="flex gap-2">
          <label className="block text-xs flex-1">
            <span className="uppercase tracking-wide text-rose-400/70 font-black text-[10px]">Stop Loss / Burn Point</span>
            <input
              value={stopLoss}
              onChange={(e) => onStopLossChange(e.target.value)}
              className="mt-1 w-full rounded-lg border border-rose-500/25 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400/40"
            />
          </label>
          <label className="block text-xs flex-1">
            <span className="uppercase tracking-wide text-emerald-400/70 font-black text-[10px]">Take Profit / Tables Served</span>
            <input
              value={takeProfit}
              onChange={(e) => onTakeProfitChange(e.target.value)}
              className="mt-1 w-full rounded-lg border border-emerald-500/25 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40"
            />
          </label>
        </div>
        <label className="block text-xs">
          <span className="uppercase tracking-wide text-slate-500 font-black text-[10px]">Runner / Trailing Stop</span>
          <input
            value={trailingStop}
            onChange={(e) => onTrailingStopChange(e.target.value)}
            placeholder="Trailing stop or runner note…"
            className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400/40 placeholder:text-slate-600"
          />
        </label>
      </div>

      {/* ── Roadmap selectors ── */}
      <div className="rounded-lg border border-white/10 bg-slate-950/50 p-2.5">
        <p className="text-[9px] uppercase tracking-widest text-slate-500 font-black mb-2">Roadmap Selectors</p>
        <div className="grid grid-cols-2 gap-1.5">
          {ROADMAP_STEPS.map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => onRoadmapToggle(step)}
              className={`rounded px-2 py-1.5 text-[10px] font-bold uppercase tracking-wide border transition ${
                selectedRoadmap[step]
                  ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-200"
                  : "border-white/10 bg-slate-900/70 text-slate-400 hover:bg-slate-800"
              }`}
            >
              {step}
            </button>
          ))}
        </div>
      </div>

      {/* ── Save Kitchen Ticket ── */}
      <button
        type="button"
        onClick={onSave}
        className="w-full rounded-lg bg-gradient-to-r from-violet-700 to-violet-600 px-3 py-2.5 text-sm font-black uppercase tracking-wider text-white transition hover:from-violet-600 hover:to-violet-500 shadow-lg shadow-violet-600/30"
      >
        💾 Save Kitchen Ticket
      </button>

      {/* ── Trade Plan ── */}
      <div className="rounded-lg border border-amber-500/25 bg-amber-600/8 p-3 space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-amber-300 font-black">📋 Save Trade Plan</p>
        <textarea
          value={tradePlan}
          onChange={(e) => setTradePlan(e.target.value)}
          rows={3}
          placeholder={`${selectedSymbol.ticker} plan: Bias is ${selectedSymbol.bias}. Looking for…`}
          className="w-full rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 text-xs text-white outline-none resize-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 placeholder:text-slate-600"
        />
        <button
          type="button"
          onClick={handleSavePlan}
          className={`w-full rounded-lg px-3 py-2 text-xs font-black uppercase tracking-wider transition ${
            planSaved
              ? "bg-emerald-600/30 border border-emerald-500/50 text-emerald-200"
              : "bg-amber-600/20 border border-amber-500/40 text-amber-100 hover:bg-amber-600/30"
          }`}
        >
          {planSaved ? "✅ Trade Plan Saved!" : "💾 Save Trade Plan"}
        </button>
      </div>

      <div className="rounded-lg border border-cyan-500/25 bg-cyan-500/8 p-3 space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-cyan-300 font-black">AI Coach Panel</p>
        <button
          type="button"
          onClick={runAnalysis}
          disabled={analyzing}
          className="w-full rounded-lg bg-cyan-600/20 border border-cyan-500/40 px-3 py-2 text-xs font-black uppercase tracking-wider text-cyan-100 hover:bg-cyan-600/30 transition disabled:opacity-60"
        >
          {analyzing ? "Analyzing…" : "Analyze Chart"}
        </button>

        {analysisStatus && (
          <p className="text-xs text-cyan-100/80 leading-5">{analysisStatus}</p>
        )}

        {analysis && (
          <div className="rounded-lg border border-white/10 bg-slate-950/70 p-3 text-xs text-slate-200 space-y-1.5 leading-5">
            <p><span className="font-black text-slate-100">Primary bias:</span> {analysis.primaryBias}</p>
            <p><span className="font-black text-slate-100">Liquidity map:</span> {analysis.liquidityMap}</p>
            <p><span className="font-black text-slate-100">AOI:</span> {analysis.aoi}</p>
            <p><span className="font-black text-slate-100">Setup quality:</span> {analysis.setupQuality}</p>
            <p><span className="font-black text-slate-100">The pass:</span> {analysis.entryIdea}</p>
            <p><span className="font-black text-slate-100">Burn point:</span> {analysis.burnPoint}</p>
            <p><span className="font-black text-slate-100">Tables served:</span> {analysis.tablesServed}</p>
            <p><span className="font-black text-slate-100">Invalidation:</span> {analysis.invalidation}</p>
            <p><span className="font-black text-slate-100">Risk note:</span> {analysis.riskNote}</p>
            <p><span className="font-black text-slate-100">Character lesson:</span> {analysis.characterLesson}</p>
            <button
              type="button"
              onClick={saveAnalysisToJournal}
              className="mt-2 w-full rounded-lg border border-emerald-500/40 bg-emerald-600/20 px-3 py-2 text-xs font-black uppercase tracking-wider text-emerald-100 hover:bg-emerald-600/30 transition"
            >
              Save to Journal
            </button>
          </div>
        )}
      </div>

      {/* ── Educational disclaimer ── */}
      <div className="rounded-lg border border-slate-700/50 bg-slate-950/60 p-3 text-xs text-slate-400 space-y-1.5">
        <p className="font-black text-slate-300 text-[10px] uppercase tracking-wider">⚠️ Disclaimer</p>
        <p className="text-slate-500 leading-5">
          Education only · Not financial advice · No live trading or brokerage execution · No real broker connection · No live data · Practice setup planning only
        </p>
      </div>
    </div>
  );
}
