"use client";

import { useState, useRef, useEffect } from "react";
import { MARKET_SYMBOLS, SYMBOL_CATEGORIES, type MarketSymbol, type MarketCategory } from "@/lib/tcu/symbols";
import { WATCHLISTS } from "@/lib/market/symbols";
import type { WatchlistKey } from "@/lib/market/types";

type SymbolSearchProps = {
  selected: MarketSymbol;
  onSelect: (symbol: MarketSymbol) => void;
};

const biasColor = (bias: string) =>
  bias === "Bullish" ? "text-emerald-400" : bias === "Bearish" ? "text-rose-400" : "text-slate-400";

const changeColor = (change: string) =>
  change.startsWith("+") ? "text-emerald-400" : "text-rose-400";

type ActiveFilter =
  | { mode: "category"; value: MarketCategory | "All" }
  | { mode: "watchlist"; key: WatchlistKey };

export default function SymbolSearch({ selected, onSelect }: SymbolSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ActiveFilter>({ mode: "category", value: "All" });
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = window.localStorage.getItem("tcu.market.favorites");
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored) as string[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const filtered = MARKET_SYMBOLS.filter((s) => {
    const q = query.toLowerCase();
    const matchQuery = !q || s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q);

    if (filter.mode === "watchlist") {
      if (filter.key === "favorites") {
        return matchQuery && favorites.includes(s.ticker);
      }

      const wl = WATCHLISTS.find((w) => w.key === filter.key);
      return matchQuery && (wl?.symbols.includes(s.ticker) ?? false);
    }

    const matchCat = filter.value === "All" || s.category === filter.value;
    return matchQuery && matchCat;
  });

  const handleSelect = (sym: MarketSymbol) => {
    onSelect(sym);
    setOpen(false);
    setQuery("");
    setFilter({ mode: "category", value: "All" });
  };

  const toggleFavorite = (ticker: string) => {
    const next = favorites.includes(ticker)
      ? favorites.filter((item) => item !== ticker)
      : [...favorites, ticker];
    setFavorites(next);
    window.localStorage.setItem("tcu.market.favorites", JSON.stringify(next));
  };

  return (
    <div ref={ref} className="relative flex-shrink-0">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-lg border border-amber-500/30 bg-slate-900/80 px-4 py-2 transition hover:border-amber-500/60 hover:bg-slate-800/80 min-w-[220px]"
      >
        <div className="flex flex-col text-left flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-amber-300 font-black text-base tracking-wide leading-none">{selected.ticker}</span>
            <span className={`text-[10px] font-bold leading-none ${changeColor(selected.change)}`}>
              {selected.change} ({selected.changePercent})
            </span>
          </div>
          <span className="text-[10px] text-slate-400 leading-none mt-0.5 truncate">{selected.name}</span>
        </div>
        <svg
          className={`w-3 h-3 text-slate-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 w-[440px] rounded-xl border border-violet-600/30 bg-slate-950 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.95)] overflow-hidden">

          {/* Search input */}
          <div className="p-3 border-b border-white/10 bg-slate-900/60">
            <div className="flex items-center gap-2 rounded-lg bg-slate-950/80 border border-white/10 px-3 py-2">
              <svg className="w-3.5 h-3.5 text-violet-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ticker or name…"
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} className="text-slate-500 hover:text-slate-300 text-base leading-none">×</button>
              )}
            </div>
          </div>

          {/* Watchlists */}
          <div className="border-b border-white/10 bg-slate-950/60 p-2.5">
            <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600 font-bold mb-1.5 px-1">Watchlists</p>
            <div className="flex gap-1.5 overflow-x-auto">
              {WATCHLISTS.map((wl) => {
                const active = filter.mode === "watchlist" && filter.key === wl.key;
                return (
                  <button
                    key={wl.key}
                    type="button"
                    onClick={() =>
                      setFilter(
                        active
                          ? { mode: "category", value: "All" }
                          : { mode: "watchlist", key: wl.key },
                      )
                    }
                    className={`whitespace-nowrap flex-shrink-0 rounded-md px-2.5 py-1 text-[10px] font-bold transition ${
                      active
                        ? "bg-amber-500/20 text-amber-200 border border-amber-500/40"
                        : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-transparent"
                    }`}
                  >
                    {wl.emoji} {wl.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category filter */}
          <div className="flex gap-1.5 p-2.5 border-b border-white/10 bg-slate-950/40 overflow-x-auto">
            {(["All", ...SYMBOL_CATEGORIES] as const).map((cat) => {
              const active = filter.mode === "category" && filter.value === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter({ mode: "category", value: cat })}
                  className={`whitespace-nowrap rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition flex-shrink-0 ${
                    active
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Results list */}
          <div className="max-h-64 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="p-6 text-sm text-slate-500 text-center">No symbols match &quot;{query}&quot;</p>
            ) : (
              filtered.map((sym) => (
                <div
                  key={sym.ticker}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelect(sym)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleSelect(sym);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition border-b border-white/5 last:border-0 cursor-pointer ${
                    selected.ticker === sym.ticker
                      ? "bg-violet-600/15"
                      : "hover:bg-slate-800/70"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-20 flex-shrink-0">
                      <p className="text-sm font-black text-amber-300 leading-none">{sym.ticker}</p>
                      <span className="inline-block mt-1 rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider bg-slate-800 text-slate-400">{sym.category}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-300 truncate">{sym.name}</p>
                      <p className={`text-[9px] font-semibold mt-0.5 ${biasColor(sym.bias)}`}>{sym.bias} · {sym.session}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2 flex items-center gap-2">
                    <div>
                      <p className="text-xs font-bold text-slate-100 leading-none">{sym.basePrice}</p>
                      <p className={`text-[10px] font-semibold leading-none mt-0.5 ${changeColor(sym.change)}`}>{sym.changePercent}</p>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggleFavorite(sym.ticker);
                      }}
                      className={`rounded px-1.5 py-1 text-xs transition ${
                        favorites.includes(sym.ticker)
                          ? "text-amber-300 bg-amber-600/20"
                          : "text-slate-500 bg-slate-900/70 hover:text-slate-200"
                      }`}
                      aria-label={`Toggle ${sym.ticker} favorite`}
                    >
                      ★
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 border-t border-white/10 bg-slate-950/80 text-center">
            <p className="text-[9px] text-slate-600">
              Sample prices · TradingView chart is live · Education only · Not financial advice
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
