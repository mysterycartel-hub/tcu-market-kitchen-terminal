"use client";

import { useEffect, useState } from "react";
import TradingViewChart from "@/components/market/TradingViewChart";
import { getCandles, type Candle } from "@/lib/marketData";
import { buildTCUOverlay } from "@/lib/tcuOverlayEngine";
import OverlayPanel from "./OverlayPanel";
import { resolveTradingViewSymbolForTicker } from "@/lib/tcu/marketKitchens";

type TCUChartProps = {
  symbol: string;
  timeframe: string;
};

export default function TCUChart({ symbol, timeframe }: TCUChartProps) {
  const currentKey = `${symbol}-${timeframe}`;
  const [state, setState] = useState<{ key: string; candles: Candle[]; error: string | null; loading: boolean }>({
    key: currentKey,
    candles: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    let active = true;

    void getCandles(symbol, timeframe)
      .then((result) => {
        if (!active) return;
        setState({
          key: currentKey,
          candles: result.candles,
          error: result.error ?? null,
          loading: false,
        });
      })
      .catch(() => {
        if (!active) return;
        setState({
          key: currentKey,
          candles: [],
          error: "Unable to load market data. Showing chart with demo context.",
          loading: false,
        });
      });

    return () => {
      active = false;
    };
  }, [currentKey, symbol, timeframe]);

  const overlay = buildTCUOverlay(state.candles);
  const loading = state.loading || state.key !== currentKey;
  const error = state.error;

  return (
    <div className="space-y-3">
      <div className="h-[560px] min-h-[560px] w-full overflow-hidden rounded-xl border border-white/10 bg-black">
        <TradingViewChart
          symbol={resolveTradingViewSymbolForTicker(symbol)}
          interval={timeframe}
          theme="dark"
          height="100%"
        />
      </div>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <p>Latest price display is provided by the chart canvas.</p>
        {loading ? <p>Loading chart context…</p> : error ? <p>{error}</p> : <p>Chart context loaded.</p>}
      </div>
      <OverlayPanel overlay={overlay} />
    </div>
  );
}
