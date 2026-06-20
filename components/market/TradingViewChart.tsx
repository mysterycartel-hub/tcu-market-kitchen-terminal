"use client";

import { useEffect, useId, useRef } from "react";

// Maps TCU timeframe labels to TradingView interval strings
const TV_INTERVAL: Record<string, string> = {
  "1m":  "1",
  "5m":  "5",
  "15m": "15",
  "30m": "30",
  "1H":  "60",
  "4H":  "240",
  "1D":  "D",
  "1W":  "W",
};

type TradingViewChartProps = {
  // Full TradingView symbol identifier, e.g. "OANDA:XAUUSD" or "NASDAQ:AAPL"
  symbol?: string;
  theme?: "dark" | "light";
  // TCU timeframe label ("1H", "4H", etc.) or a raw TV interval ("60", "D")
  interval?: string;
  height?: string | number;
  onReady?: () => void;
};

export default function TradingViewChart({
  symbol = "OANDA:XAUUSD",
  theme = "dark",
  interval = "60",
  height = "100%",
  onReady,
}: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartId = useId().replace(/:/g, "-");
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  const resolvedSymbol = symbol || "TVC:GOLD";

  const resolvedInterval = TV_INTERVAL[interval] ?? interval;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;

    const renderWidget = () => {
      if (cancelled || !container || !window.TradingView?.widget) {
        return;
      }

      container.innerHTML = "";
      const inner = document.createElement("div");
      inner.id = chartId;
      inner.style.height = "100%";
      inner.style.width = "100%";
      container.appendChild(inner);

      new window.TradingView.widget({
        container_id: chartId,
        autosize: true,
        symbol: resolvedSymbol,
        interval: resolvedInterval,
        timezone: "Etc/UTC",
        theme,
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: true,
        calendar: false,
        hide_top_toolbar: false,
        hide_legend: false,
        hide_side_toolbar: false,
        hide_volume: false,
        save_image: true,
        withdateranges: true,
        support_host: "https://www.tradingview.com",
        onChartReady: () => onReadyRef.current?.(),
      });
    };

    if (window.TradingView?.widget) {
      renderWidget();
    } else {
      const existing = document.querySelector<HTMLScriptElement>('script[src="https://s3.tradingview.com/tv.js"]');
      if (existing) {
        existing.addEventListener("load", renderWidget, { once: true });
      } else {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;
        script.onload = renderWidget;
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      container.innerHTML = "";
    };
  }, [chartId, resolvedInterval, resolvedSymbol, theme]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
      style={{ height, width: "100%" }}
    />
  );
}

declare global {
  interface Window {
    TradingView?: {
      widget: new (options: Record<string, unknown>) => unknown;
    };
  }
}
