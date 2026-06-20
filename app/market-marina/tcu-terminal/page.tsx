"use client";

import { useMemo, useState } from "react";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import ChartKitchen from "@/components/tcu/ChartKitchen";
import ExecutionPanel from "@/components/tcu/ExecutionPanel";
import BottomTerminalPanel from "@/components/tcu/BottomTerminalPanel";
import KitchenTicketModal from "@/components/tcu/KitchenTicketModal";
import { CHARACTER_CARDS, getCharacterWarningForMissing } from "@/lib/tcu/characters";
import { ROADMAP_STEPS, TCU_TABS } from "@/lib/tcu/constants";
import { getSetupGrade } from "@/lib/tcu/scoring";
import { MARKET_SYMBOLS, DEFAULT_SYMBOL, type MarketSymbol } from "@/lib/tcu/symbols";
import { useTCUProgress } from "@/components/tcu/TCUProgressProvider";
import { type MarketKitchenKey, getDefaultTickerForKitchen, getMarketKitchenConfig } from "@/lib/tcu/marketKitchens";
import { FIRST_MISSION_ID } from "@/lib/tcu/progress";

type RoadmapState = Record<string, boolean>;

type JournalEntry = {
  id: string;
  direction: string;
  grade: string;
  flagged: boolean;
  message: string;
  timestamp: string;
};

const defaultRoadmap: RoadmapState = ROADMAP_STEPS.reduce(
  (acc, step) => ({ ...acc, [step]: false }),
  {} as RoadmapState,
);

export default function MarketKitchenTerminalPage() {
  const { addJournalEntry, addTradePlan, addXP, completeFirstMission, progress } = useTCUProgress();
  const [selectedKitchen, setSelectedKitchen] = useState<MarketKitchenKey>("Forex Kitchen");
  const [selectedSymbol, setSelectedSymbol] = useState<MarketSymbol>(DEFAULT_SYMBOL);
  const [chartMode, setChartMode] = useState<"Live Chart" | "Upload Chart" | "Practice Chart">("Live Chart");
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapState>(defaultRoadmap);
  const [ticketDirection, setTicketDirection] = useState<"BUY" | "SELL" | null>(null);
  const [activeTab, setActiveTab] = useState<string>(TCU_TABS[3]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [mistakeEntries, setMistakeEntries] = useState<JournalEntry[]>([]);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1H");
  const [marketType, setMarketType] = useState("Market");
  const [riskMode, setRiskMode] = useState("Standard");
  const [lotSize, setLotSize] = useState("1.0");
  const [stopLoss, setStopLoss] = useState("0.00");
  const [takeProfit, setTakeProfit] = useState("0.00");
  const [trailingStop, setTrailingStop] = useState("");

  const kitchenConfig = getMarketKitchenConfig(selectedKitchen);

  const grade = getSetupGrade(selectedRoadmap);
  const missingSteps = useMemo(
    () => ROADMAP_STEPS.filter((step) => !selectedRoadmap[step]),
    [selectedRoadmap],
  );

  const warningCards = missingSteps.map((step) => ({
    step,
    coach: getCharacterWarningForMissing(step),
  }));

  const handleRoadmapToggle = (step: string) => {
    setSelectedRoadmap((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  const handleSelectKitchen = (kitchen: MarketKitchenKey) => {
    setSelectedKitchen(kitchen);
    const defaultTicker = getDefaultTickerForKitchen(kitchen);
    const nextSymbol = MARKET_SYMBOLS.find((symbol) => symbol.ticker === defaultTicker);
    if (nextSymbol) {
      setSelectedSymbol(nextSymbol);
    }
  };

  const saveEntry = (direction: string, flagged: boolean) => {
    const timestamp = new Date().toLocaleString();
    const message = [
      `Mode: Practice`,
      `Symbol: ${selectedSymbol.ticker}`,
      `Recipe grade: ${grade}`,
      `Missing: ${missingSteps.length ? missingSteps.join(", ") : "None"}`,
      `Risk mode: ${riskMode}`,
    ].join(" · ");
    const entry: JournalEntry = {
      id: `${Date.now()}-${direction}`,
      direction,
      grade,
      flagged,
      message,
      timestamp,
    };
    setJournalEntries((prev) => [entry, ...prev]);
    if (flagged) setMistakeEntries((prev) => [entry, ...prev]);
    addJournalEntry(message);
    addXP(flagged ? 10 : 15);
    setTicketDirection(null);
  };

  const handleTradePlanSaved = (plan: { content: string; symbol: string }) => {
    addTradePlan(plan.content, plan.symbol);
  };

  const handleAnalysisSaved = (summary: string) => {
    addJournalEntry(summary);
    if (!progress.completedMissions.includes(FIRST_MISSION_ID)) {
      completeFirstMission();
    } else {
      addXP(20);
    }
  };

  const handleScreenshotUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setScreenshotPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">

      {/* ── Top bar ── */}
      <TopMarketBar
        selectedSymbol={selectedSymbol}
        grade={grade}
        mode={chartMode}
        marketStatus={chartMode === "Live Chart" ? "Price shown on chart" : chartMode}
        marketTitle={kitchenConfig.title}
        marketSubtitle={kitchenConfig.subtitle}
        focusCharacters={kitchenConfig.focusCharacters}
        onChefRead={() => void 0}
        onChecklist={() => void 0}
        showNav={false}
      />

      {/* ── Main grid: chart | execution panel ── */}
      <div className="flex-1 min-h-0 grid grid-cols-[1fr_360px] overflow-hidden">
        <ChartKitchen
          screenshotPreview={screenshotPreview}
          onUpload={handleScreenshotUpload}
          onClear={() => setScreenshotPreview(null)}
          timeframe={selectedTimeframe}
          onTimeframeChange={setSelectedTimeframe}
          selectedRoadmap={selectedRoadmap}
          onRoadmapToggle={handleRoadmapToggle}
          missingSteps={missingSteps}
          selectedSymbol={selectedSymbol}
          onSymbolChange={setSelectedSymbol}
          selectedKitchen={selectedKitchen}
          onSelectKitchen={handleSelectKitchen}
          chartMode={chartMode}
          onSelectChartMode={setChartMode}
        />

        <ExecutionPanel
          marketType={marketType}
          onToggleMarketType={() =>
            setMarketType((prev) => (prev === "Market" ? "Pending" : "Market"))
          }
          lotSize={lotSize}
          onLotSizeChange={setLotSize}
          riskMode={riskMode}
          onToggleRiskMode={() =>
            setRiskMode((prev) => (prev === "Standard" ? "Risk Practice" : "Standard"))
          }
          stopLoss={stopLoss}
          onStopLossChange={setStopLoss}
          takeProfit={takeProfit}
          onTakeProfitChange={setTakeProfit}
          trailingStop={trailingStop}
          onTrailingStopChange={setTrailingStop}
          onBuy={() => setTicketDirection("BUY")}
          onSell={() => setTicketDirection("SELL")}
          onSave={() => ticketDirection && saveEntry(ticketDirection, false)}
          onTradePlanSaved={handleTradePlanSaved}
          grade={grade}
          selectedRoadmap={selectedRoadmap}
          onRoadmapToggle={handleRoadmapToggle}
          selectedSymbol={selectedSymbol}
          selectedKitchen={selectedKitchen}
          selectedTimeframe={selectedTimeframe}
          onAnalysisSaved={handleAnalysisSaved}
        />
      </div>

      {/* ── Bottom terminal panel ── */}
      <div className="h-[190px] shrink-0 overflow-hidden">
        <BottomTerminalPanel
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          journalEntries={journalEntries}
          mistakeEntries={mistakeEntries}
          warnings={warningCards}
          grade={grade}
          selectedSymbol={selectedSymbol}
        />
      </div>

      {/* ── Kitchen Ticket Modal ── */}
      <KitchenTicketModal
        open={ticketDirection !== null}
        direction={ticketDirection}
        grade={grade}
        warnings={warningCards}
        characterCards={CHARACTER_CARDS}
        focusCharacters={kitchenConfig.focusCharacters}
        onSave={() => ticketDirection && saveEntry(ticketDirection, false)}
        onPracticeAnyway={() => ticketDirection && saveEntry(ticketDirection, true)}
        onReplayLater={() => setTicketDirection(null)}
        onBack={() => setTicketDirection(null)}
      />
    </div>
  );
}
