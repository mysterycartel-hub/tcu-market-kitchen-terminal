"use client";

import { useState } from "react";
import CharacterCoachCard, { BRAND_IMAGE_SOURCES, getCharacterImageSource } from "./CharacterCoachCard";

const crew = [
  { name: "Trading Chef", role: "Main Coach", description: "Discipline, execution habits, and clean chart review.", accent: "violet" as const },
  { name: "Chef Goldie", role: "Gold Specialist", description: "XAUUSD timing, bias, and respect for volatility.", accent: "amber" as const },
  { name: "Louie Liquidity", role: "Liquidity Coach", description: "Sweeps, flow, and where the market grabs stops.", accent: "cyan" as const },
  { name: "Candle Kid", role: "Candle Coach", description: "Candle proof and beginner confirmation.", accent: "blue" as const },
  { name: "Wickie", role: "Confirmation Coach", description: "Explains confirmation candles before the pass.", accent: "blue" as const },
  { name: "Grandma Market", role: "Patience Coach", description: "Higher-timeframe wisdom and market bias.", accent: "indigo" as const },
  { name: "Melissa Mayhem", role: "Emotion Coach", description: "FOMO, chaos, and revenge-trade pressure.", accent: "orange" as const },
  { name: "Nana Value", role: "Value Coach", description: "Risk practice, patience, and value before speed.", accent: "emerald" as const },
  { name: "Melody Mayhem", role: "Rhythm Coach", description: "Session rhythm and timing discipline.", accent: "rose" as const },
];

export default function CharacterCrew() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/70 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center justify-between gap-3 border-b border-white/10 px-3 py-2 text-left transition hover:bg-slate-800/30"
      >
        <div className="flex items-center gap-3 text-left">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg border border-violet-500/30 bg-violet-600/10">
            <img
              src={BRAND_IMAGE_SOURCES.logo}
              alt="MysterMyself logo"
              className="h-full w-full object-cover"
              onError={(event) => {
                const target = event.currentTarget;
                target.style.display = "none";
              }}
            />
            <span className="absolute text-[10px] font-black tracking-[0.3em] text-white">MS</span>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">TCU Coach Strip</p>
            <p className="text-[10px] text-slate-500">Real character coaches, compact for the trading screen</p>
          </div>
        </div>
        <span className="text-slate-500 text-xs font-bold">
          {collapsed ? "▼ Show" : "▲ Hide"}
        </span>
      </button>

      {!collapsed && (
        <div className="flex gap-2 overflow-x-auto p-3 scroll-smooth">
          {crew.map((coach) => (
            <CharacterCoachCard
              key={coach.name}
              name={coach.name}
              role={coach.role}
              description={coach.description}
              imageSrc={getCharacterImageSource(coach.name)}
              accent={coach.accent}
              compact
            />
          ))}
        </div>
      )}
    </div>
  );
}
