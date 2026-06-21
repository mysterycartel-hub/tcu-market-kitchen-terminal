"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MarketSymbol } from "@/lib/tcu/symbols";
import { useTCUProgress } from "@/components/tcu/TCUProgressProvider";
import { BRAND_IMAGE_SOURCES } from "./CharacterCoachCard";

type TopMarketBarProps = {
  selectedSymbol: MarketSymbol;
  grade: string;
  mode: string;
  marketStatus?: string;
  marketTitle?: string;
  marketSubtitle?: string;
  focusCharacters?: string[];
  onChefRead: () => void;
  onChecklist: () => void;
  showNav?: boolean;
};

const NAV_LINKS = [
  { href: "/market-marina/dashboard",   label: "Dashboard"  },
  { href: "/market-marina/tcu-terminal",label: "Terminal"   },
  { href: "/market-marina/missions",    label: "Missions"   },
  { href: "/market-marina/journal",     label: "Journal"    },
  { href: "/market-marina/vault",       label: "Vault"      },
  { href: "/market-marina/characters",  label: "Characters" },
];

export default function TopMarketBar({
  selectedSymbol,
  grade,
  mode,
  marketStatus,
  marketTitle,
  marketSubtitle,
  focusCharacters,
  onChefRead,
  onChecklist,
  showNav = true,
}: TopMarketBarProps) {
  const pathname = usePathname();
  const { progress } = useTCUProgress();
  return (
    <header className="flex-none border-b border-violet-600/20 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-md shadow-lg shadow-violet-900/20">
      <div className={`flex items-center justify-between gap-4 px-6 ${showNav ? "py-3" : "h-[88px]"}`}>

        {/* Left: Brand */}
        <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
          <div className="flex flex-col gap-1">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-amber-400/40 bg-slate-950 shadow-lg shadow-amber-900/30">
              <img
                src={BRAND_IMAGE_SOURCES.logo}
                alt="TCU logo"
                className="h-full w-full object-contain"
                onError={(event) => {
                  const target = event.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <span className="absolute hidden items-center justify-center text-[10px] font-black tracking-widest text-amber-300">TCU</span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.2em] text-violet-400 font-extrabold text-center">MysterMyself</span>
          </div>
          <div className="border-l border-violet-600/30 pl-4">
            <h1 className="text-xs font-black uppercase tracking-[0.25em] text-white leading-tight">🍽️ {marketTitle ?? "Trading Chef University"}</h1>
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-amber-300 mt-0.5">{marketSubtitle ?? "TCU Market Kitchen Terminal"}</h2>
            <p className="text-[9px] text-violet-300 tracking-[0.15em] mt-0.5 font-semibold">
              Market Marina · Scott-King Coast
              {focusCharacters?.length ? ` · Character focus: ${focusCharacters.join(", ")}` : ""}
            </p>
          </div>
        </div>

        {/* Center: Chart status bar */}
        <div className="flex min-w-0 flex-1 items-center justify-center gap-4 px-4 overflow-hidden">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[9px] uppercase text-slate-500 tracking-widest font-bold">Symbol</span>
            <span className="text-xl font-black text-amber-300 leading-none">{selectedSymbol.ticker}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[9px] uppercase text-slate-500 tracking-widest font-bold">Chart</span>
            <span className="rounded-full border border-violet-500/30 bg-violet-600/15 px-3 py-1 text-xs font-black text-violet-100 leading-none">
              {marketStatus ?? "Price shown on chart"}
            </span>
          </div>
        </div>

        {/* Right: Grade, mode, actions */}
        <div className="flex items-center gap-3 border-l border-violet-600/30 pl-4 flex-shrink-0">
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[9px] uppercase text-slate-500 tracking-widest font-bold">Grade</span>
            <span className="text-3xl font-black text-amber-400 drop-shadow-lg leading-none">{grade}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[9px] uppercase text-slate-500 tracking-widest font-bold">Mode</span>
            <span className="inline-block rounded-lg bg-violet-600/40 px-2 py-1 text-[10px] font-bold text-violet-200 border border-violet-500/40">{mode}</span>
          </div>
          <button
            type="button"
            onClick={onChefRead}
            className="rounded-lg bg-gradient-to-r from-violet-600 to-violet-700 px-3 py-2 text-[11px] font-black uppercase text-white transition hover:from-violet-500 hover:to-violet-600 tracking-wider shadow-lg shadow-violet-600/40"
          >
            📖 Chef Read
          </button>
          <button
            type="button"
            onClick={onChecklist}
            className="rounded-lg border border-violet-500/40 bg-violet-600/20 px-3 py-2 text-[11px] font-bold uppercase text-violet-100 transition hover:bg-violet-600/30 tracking-wider hover:border-violet-400/60"
          >
            ✓ Checklist
          </button>
        </div>
      </div>

      {showNav && (
        <div className="border-t border-violet-600/15 px-6 py-1.5 flex items-center justify-between gap-4 overflow-x-auto">
          <nav className="flex items-center gap-1 shrink-0">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href || pathname?.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition whitespace-nowrap ${
                    active
                      ? "bg-violet-600/50 text-violet-100 border border-violet-500/60"
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3 shrink-0">
            {progress.profile && (
              <span className="text-[10px] text-slate-500 font-bold hidden sm:block">
                {progress.profile.name}
              </span>
            )}
            <span className="text-[10px] text-amber-400 font-black">
              ✦ {progress.xp} XP
            </span>
            <span className="text-[10px] text-violet-400 font-bold">
              {progress.rank}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
