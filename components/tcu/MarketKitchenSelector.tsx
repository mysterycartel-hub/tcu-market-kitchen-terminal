"use client";

import { MARKET_KITCHENS, type MarketKitchenKey } from "@/lib/tcu/marketKitchens";

type MarketKitchenSelectorProps = {
  selectedKitchen: MarketKitchenKey;
  onSelectKitchen: (kitchen: MarketKitchenKey) => void;
  selectedTicker?: string;
  onSelectTicker: (ticker: string) => void;
  selectedChartMode: "Live Chart" | "Upload Chart" | "Practice Chart";
  onSelectChartMode: (mode: "Live Chart" | "Upload Chart" | "Practice Chart") => void;
};

export default function MarketKitchenSelector({
  selectedKitchen,
  onSelectKitchen,
  selectedTicker,
  onSelectTicker,
  selectedChartMode,
  onSelectChartMode,
}: MarketKitchenSelectorProps) {
  const activeKitchen = MARKET_KITCHENS.find((kitchen) => kitchen.key === selectedKitchen) ?? MARKET_KITCHENS[0];

  return (
    <div className="space-y-2 overflow-hidden">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-slate-950/75 px-3 py-2">
        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black mr-1">Market Kitchen</p>
        {MARKET_KITCHENS.map((kitchen) => {
          const active = selectedKitchen === kitchen.key;
          return (
            <button
              key={kitchen.key}
              type="button"
              onClick={() => onSelectKitchen(kitchen.key)}
              className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider transition whitespace-nowrap ${
                active
                  ? "border-violet-500/60 bg-violet-600/20 text-violet-100"
                  : "border-white/10 bg-slate-900/70 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              {kitchen.key}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-slate-950/75 px-3 py-2">
        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black mr-1">Chart Mode</p>
        {(["Live Chart", "Upload Chart", "Practice Chart"] as const).map((mode) => {
          const active = selectedChartMode === mode;
          return (
            <button
              key={mode}
              type="button"
              onClick={() => onSelectChartMode(mode)}
              className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider transition whitespace-nowrap ${
                active
                  ? "border-emerald-500/60 bg-emerald-600/20 text-emerald-100"
                  : "border-white/10 bg-slate-900/70 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              {mode}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-slate-950/75 px-3 py-2 overflow-x-auto">
        <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black mr-1">Symbols</p>
        {activeKitchen.options.map((option) => {
          const isActiveTicker = option.ticker && selectedTicker === option.ticker;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => option.ticker && onSelectTicker(option.ticker)}
              className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider transition whitespace-nowrap ${
                isActiveTicker
                  ? "border-emerald-500/50 bg-emerald-600/20 text-emerald-100"
                  : "border-white/10 bg-slate-900/70 text-slate-300 hover:border-white/20 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
