import { TCU_TABS } from "@/lib/tcu/constants";
import { DEFAULT_SYMBOL, type MarketSymbol } from "@/lib/tcu/symbols";
import CharacterCoachCard, { getCharacterImageSource } from "./CharacterCoachCard";

type BottomTerminalPanelProps = {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  journalEntries: { id: string; direction: string; grade: string; flagged: boolean; message: string; timestamp: string }[];
  mistakeEntries: { id: string; direction: string; grade: string; flagged: boolean; message: string; timestamp: string }[];
  warnings: { step: string; coach: string }[];
  grade: string;
  selectedSymbol?: MarketSymbol;
};

export default function BottomTerminalPanel({
  activeTab,
  onSelectTab,
  journalEntries,
  mistakeEntries,
  warnings,
  grade,
  selectedSymbol,
}: BottomTerminalPanelProps) {
  const activeSymbol = selectedSymbol ?? DEFAULT_SYMBOL;

  const renderActivePanel = () => {
    if (activeTab === "Journal") {
      return (
        <div className="space-y-3 overflow-y-auto max-h-[200px] pr-2">
          {journalEntries.length ? (
            journalEntries.map((entry) => (
              <div key={entry.id} className="rounded-lg border border-white/10 bg-slate-900/50 p-3 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-2 text-xs uppercase text-slate-500 mb-2 font-semibold">
                  <span>🍽️ {entry.direction} Kitchen Ticket</span>
                  <span>{entry.timestamp}</span>
                </div>
                <p className="text-sm text-slate-200">{entry.message}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No kitchen notes yet. Save a ticket to begin.</p>
          )}
        </div>
      );
    }

    if (activeTab === "Mistake Review") {
      return (
        <div className="space-y-3 overflow-y-auto max-h-[200px] pr-2">
          {mistakeEntries.length ? (
            mistakeEntries.map((entry) => (
              <div key={entry.id} className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-2 text-xs uppercase text-rose-400 mb-2 font-semibold">
                  <span>⚠️ {entry.direction} Lesson</span>
                  <span>{entry.timestamp}</span>
                </div>
                <p className="text-sm text-slate-200">{entry.message}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No lessons flagged yet. Practice Anyway saves a learning entry here.</p>
          )}
        </div>
      );
    }

    if (activeTab === "Chart Read") {
      return (
        <div className="space-y-3">
          <p className="text-sm text-slate-400">
            Coach breakdown for {activeSymbol.ticker}. Use these cards to read structure before you plan the ticket.
          </p>
          <div className="grid gap-3 lg:grid-cols-2">
            <CharacterCoachCard
              name="Grandma Market"
              role="Bias"
              description="Start with the bigger picture. Bias first, then setup quality."
              imageSrc={getCharacterImageSource("Grandma Market")}
              accent="indigo"
            />
            <CharacterCoachCard
              name="Louie Liquidity"
              role="Liquidity"
              description="Mark the pool, the sweep, and the path of price before you act."
              imageSrc={getCharacterImageSource("Louie Liquidity")}
              accent="cyan"
            />
            <CharacterCoachCard
              name="Candle Kid"
              role="Candle Proof"
              description="Wait for the candles to confirm the story. No guess entries."
              imageSrc={getCharacterImageSource("Candle Kid")}
              accent="blue"
            />
            <CharacterCoachCard
              name="Melissa Mayhem"
              role="Emotional Traps"
              description="Watch FOMO, revenge, rushing, and news chaos before they take control."
              imageSrc={getCharacterImageSource("Melissa Mayhem")}
              accent="orange"
            />
            <CharacterCoachCard
              name="Nana Value"
              role="Risk Practice"
              description="Keep the size small enough to think clearly and survive the lesson."
              imageSrc={getCharacterImageSource("Nana Value")}
              accent="emerald"
            />
          </div>
        </div>
      );
    }

    if (activeTab === "Trade Plan") {
      return (
        <p className="text-sm text-slate-400">📋 Build the {activeSymbol.ticker} plan: kitchen direction, liquidity flow, prep zone, candle proof, then entry, targets, and management.</p>
      );
    }

    if (activeTab === "TCU Concepts") {
      return (
        <p className="text-sm text-slate-300 leading-6 space-y-2">
          <span className="block font-bold text-violet-300">🎓 Market Structure Concepts:</span>
          <span className="block text-slate-400">
            <span className="font-semibold text-slate-300">SWEEP</span> — Liquidity hunt, price reaching highs/lows
            <br/>
            <span className="font-semibold text-slate-300">FVG</span> — Fair Value Gap, imbalance zone
            <br/>
            <span className="font-semibold text-slate-300">IFVG</span> — Inner FVG, smaller imbalance
            <br/>
            <span className="font-semibold text-slate-300">BOS</span> — Break of Structure, directional shift
            <br/>
            <span className="font-semibold text-slate-300">CHOCH</span> — Change of Character, trend reversal
            <br/>
            <span className="font-semibold text-slate-300">S&D</span> — Supply/Demand, price reaction zones
            <br/>
            <span className="font-semibold text-slate-300">8AM</span> — NY Breakfast Rush, session momentum
          </span>
          <span className="block text-slate-500 text-xs mt-2">Practice identifying these patterns on your charts.</span>
        </p>
      );
    }

    if (activeTab === "Mission Board") {
      return (
        <p className="text-sm text-slate-300 leading-6 space-y-2">
          <span className="block font-bold text-violet-300">🎯 Roadmap Mastery Path:</span>
          <span className="block text-slate-400">
            <span className="font-semibold text-slate-300">Kitchen Direction</span> → Identify bias
            <br/>
            <span className="font-semibold text-slate-300">Flow</span> → Mark liquidity zones
            <br/>
            <span className="font-semibold text-slate-300">Prep Zone</span> → Find AOI accumulation
            <br/>
            <span className="font-semibold text-slate-300">Price Moves</span> → Read candle structure
            <br/>
            <span className="font-semibold text-slate-300">Candle Proof</span> → Wait for confirmation
            <br/>
            <span className="font-semibold text-slate-300">The Pass</span> → Plan entry timing
            <br/>
            <span className="font-semibold text-slate-300">Tables Served</span> → Define targets
            <br/>
            <span className="font-semibold text-slate-300">Protect the Plate</span> → Manage risk and stops
          </span>
          <span className="block text-slate-500 text-xs mt-2">Every step teaches discipline. Journal your thinking.</span>
        </p>
      );
    }

    if (activeTab === "Practice Positions") {
      return (
        <p className="text-sm text-slate-400">📈 Open kitchen tickets from this terminal. Practice only—no real broker connection or live data.</p>
      );
    }

    if (activeTab === "Prep Orders") {
      return (
        <p className="text-sm text-slate-400">⏳ Pending kitchen tickets waiting for market conditions. Build trade plans and wait for confirmation.</p>
      );
    }

    if (activeTab === "Served Plates") {
      return (
        <p className="text-sm text-slate-400">✅ Closed kitchen tickets from your practice journal. Review your targets hit and lessons learned.</p>
      );
    }

    return (
      <p className="text-sm text-slate-400">Select a tab to review kitchen notes, practice tickets, and TCU learning missions.</p>
    );
  };

  return (
    <div className="h-[190px] shrink-0 overflow-hidden border-t border-white/10 bg-slate-950/95 flex flex-col">
      <div className="flex gap-2 px-4 pt-2 overflow-x-auto border-b border-white/10 min-h-12">
        {TCU_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onSelectTab(tab)}
            className={`pb-2 px-4 text-xs font-bold uppercase tracking-widest transition border-b-2 whitespace-nowrap ${
              activeTab === tab
                ? "border-violet-600 text-violet-400"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="px-4 py-2 flex-1 min-h-0 overflow-y-auto">
        {renderActivePanel()}
      </div>
    </div>
  );
}
