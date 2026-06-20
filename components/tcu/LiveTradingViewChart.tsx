"use client";

import { useEffect, useRef, useState } from "react";
import TradingViewChart from "@/components/market/TradingViewChart";
import { getTradingViewSymbolCandidates } from "@/lib/tcu/marketKitchens";
import PracticeChart from "./PracticeChart";

const DEFAULT_INTERVAL = "15";

type LiveTradingViewChartProps = {
  ticker: string;
  interval?: string;
  height?: string | number;
};

export default function LiveTradingViewChart({
  ticker,
  interval = DEFAULT_INTERVAL,
  height = "100%",
}: LiveTradingViewChartProps) {
  const chartReadyRef = useRef(false);
  const [showFallback, setShowFallback] = useState(false);

  const symbol = getTradingViewSymbolCandidates(ticker)[0] ?? ticker;

  useEffect(() => {
    chartReadyRef.current = false;
    const timeout = window.setTimeout(() => {
      if (!chartReadyRef.current) {
        setShowFallback(true);
      }
    }, 15000);

    return () => window.clearTimeout(timeout);
  }, [symbol, interval]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-black">
      {showFallback ? (
        <div className="relative h-full w-full">
          <PracticeChart />
          <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-200">
            Live chart unavailable. Practice chart loaded.
          </div>
        </div>
      ) : (
        <TradingViewChart
          symbol={symbol}
          theme="dark"
          interval={interval}
          height={height}
          onReady={() => {
            chartReadyRef.current = true;
          }}
        />
      )}
      {!showFallback && (
        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-200">
          Live chart active
        </div>
      )}
    </div>
  );
}
