import { CONCEPT_PILLS, TIMEFRAMES } from "@/lib/tcu/constants";
import { MARKET_SYMBOLS, type MarketSymbol } from "@/lib/tcu/symbols";
import PracticeChart from "./PracticeChart";
import SymbolSearch from "./SymbolSearch";
import MarketKitchenSelector from "./MarketKitchenSelector";
import LiveTradingViewChart from "./LiveTradingViewChart";
import CharacterCrew from "./CharacterCrew";
import { type MarketKitchenKey } from "@/lib/tcu/marketKitchens";

type ChartKitchenProps = {
  screenshotPreview: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
  timeframe: string;
  onTimeframeChange: (tf: string) => void;
  selectedRoadmap: Record<string, boolean>;
  onRoadmapToggle: (step: string) => void;
  missingSteps: string[];
  selectedSymbol: MarketSymbol;
  onSymbolChange: (sym: MarketSymbol) => void;
  selectedKitchen: MarketKitchenKey;
  onSelectKitchen: (kitchen: MarketKitchenKey) => void;
  chartMode: "Live Chart" | "Upload Chart" | "Practice Chart";
  onSelectChartMode: (mode: "Live Chart" | "Upload Chart" | "Practice Chart") => void;
};

export default function ChartKitchen({
  screenshotPreview,
  onUpload,
  onClear,
  timeframe,
  onTimeframeChange,
  selectedRoadmap: _selectedRoadmap,
  onRoadmapToggle: _onRoadmapToggle,
  missingSteps: _missingSteps,
  selectedSymbol,
  onSymbolChange,
  selectedKitchen,
  onSelectKitchen,
  chartMode,
  onSelectChartMode,
}: ChartKitchenProps) {
  const isUploadMode = chartMode === "Upload Chart";
  const isPracticeMode = chartMode === "Practice Chart" || selectedKitchen === "Practice Kitchen";

  return (
    <div className="h-full min-h-0 flex flex-col overflow-hidden border-r border-white/10 bg-gradient-to-b from-slate-900/60 to-slate-950/80 px-4 pt-3 pb-3 gap-3">
      <MarketKitchenSelector
        selectedKitchen={selectedKitchen}
        onSelectKitchen={onSelectKitchen}
        selectedTicker={selectedSymbol.ticker}
        onSelectTicker={(ticker) => {
          const nextSymbol = MARKET_SYMBOLS.find((symbol) => symbol.ticker === ticker);
          if (nextSymbol) onSymbolChange(nextSymbol);
        }}
        selectedChartMode={chartMode}
        onSelectChartMode={onSelectChartMode}
      />

      <div className="rounded-xl border border-violet-500/20 bg-violet-500/8 px-3 py-2 text-[10px] font-semibold text-violet-100 leading-5">
        <div className="font-black uppercase tracking-[0.18em] text-violet-300">Trading Chef University</div>
        <div>Bias → Liquidity → AOI → Delivery → Confirmation → Entry → Targets → Management</div>
        <div>Chef warns. Student decides. Practice planning only. No broker execution.</div>
      </div>

      <div className="flex-none space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <SymbolSearch selected={selectedSymbol} onSelect={onSymbolChange} />
          <div className="flex gap-1.5 flex-wrap">
            {TIMEFRAMES.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => onTimeframeChange(label)}
                className={`rounded px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition ${
                  timeframe === label
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/40"
                    : "bg-slate-800/60 text-slate-400 hover:bg-slate-700/80 hover:text-slate-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {CONCEPT_PILLS.map((pill) => (
            <span
              key={pill}
              className="inline-flex rounded-full bg-amber-500/12 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-amber-200 border border-amber-500/25"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>

      <div className="w-full flex-1 min-h-[560px] overflow-hidden rounded-xl border border-white/10 bg-black">
        <div className="relative h-full min-h-[560px] w-full overflow-hidden rounded-xl bg-black">
          {isUploadMode ? (
            screenshotPreview ? (
              <img alt="Uploaded chart preview" src={screenshotPreview} className="h-full w-full object-contain" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-black text-slate-500 text-sm">
                Upload Chart selected. Use the upload button below the chart to add a screenshot.
              </div>
            )
          ) : isPracticeMode ? (
            <PracticeChart />
          ) : (
            <LiveTradingViewChart key={`${selectedSymbol.ticker}-live`} ticker={selectedSymbol.ticker} interval="15" height="100%" />
          )}

          {!isPracticeMode && !isUploadMode && (
            <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-200">
              Live chart active
            </div>
          )}

          {isUploadMode && !screenshotPreview && (
            <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-200">
              Upload chart selected
            </div>
          )}
        </div>
      </div>

      <p className="px-1 text-[10px] font-semibold text-slate-500">
        Chart powered by TradingView · Practice planning only · No broker execution
      </p>

      <CharacterCrew />

      <div className="flex-none flex flex-wrap items-center justify-between gap-3 border-t border-white/6 pt-2">
        <div className="flex flex-wrap gap-2">
          <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-violet-500 shadow-lg shadow-violet-600/30">
            Upload Chart
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onUpload(file);
              }}
            />
          </label>
          {screenshotPreview && (
            <button
              type="button"
              onClick={onClear}
              className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-200 hover:bg-rose-500/15 transition"
            >
              Clear Image
            </button>
          )}
        </div>
        <p className="text-[10px] text-slate-500 font-semibold">
          {selectedSymbol.ticker} chart mode: {chartMode}
        </p>
      </div>
    </div>
  );
}
