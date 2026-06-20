"use client";

// When connected to a real charting library (TradingView Lightweight Charts,
// Recharts, ApexCharts, etc.), toggle each key to show/hide the corresponding
// chart overlay. For now, state is local UI-only.

import { useState } from "react";

type Indicator = {
  key: string;
  label: string;
  activeClass: string;
};

const INDICATORS: Indicator[] = [
  { key: "ema20",    label: "EMA 20",      activeClass: "border-blue-500/70 bg-blue-600/25 text-blue-200"    },
  { key: "ema50",    label: "EMA 50",      activeClass: "border-amber-500/70 bg-amber-600/20 text-amber-200" },
  { key: "ema200",   label: "EMA 200",     activeClass: "border-rose-500/70 bg-rose-600/20 text-rose-200"    },
  { key: "liq",      label: "Liq Zones",   activeClass: "border-amber-500/70 bg-amber-600/20 text-amber-200" },
  { key: "fvg",      label: "FVG",         activeClass: "border-blue-500/70 bg-blue-600/25 text-blue-200"    },
  { key: "boschoch", label: "BOS/CHOCH",   activeClass: "border-violet-500/70 bg-violet-600/25 text-violet-200" },
  { key: "session",  label: "Session H/L", activeClass: "border-emerald-500/70 bg-emerald-600/20 text-emerald-200" },
];

const OFF = "border-white/10 bg-slate-800/50 text-slate-500 hover:border-white/20 hover:text-slate-300";

export default function IndicatorBar() {
  const [active, setActive] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="flex items-center gap-1.5 flex-wrap min-w-0">
      <span className="text-[9px] uppercase tracking-widest text-slate-600 font-bold flex-shrink-0 mr-1">
        Overlays
      </span>
      {INDICATORS.map(({ key, label, activeClass }) => (
        <button
          key={key}
          type="button"
          onClick={() => toggle(key)}
          title={active[key] ? `Hide ${label}` : `Show ${label}`}
          className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wide border transition flex-shrink-0 ${
            active[key] ? activeClass : OFF
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
