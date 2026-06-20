import type { TCUOverlayResult } from "@/lib/tcuOverlayEngine";

type OverlayPanelProps = {
  overlay: TCUOverlayResult;
};

export default function OverlayPanel({ overlay }: OverlayPanelProps) {
  return (
    <section className="rounded-xl border border-white/10 bg-slate-950/70 p-3 text-xs text-slate-200">
      <p className="text-[10px] uppercase tracking-[0.2em] text-violet-300 font-black">TCU Overlay Engine</p>
      <div className="mt-2 grid gap-2 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-slate-900/70 p-2">
          <p className="font-black text-slate-100">Trend State</p>
          <p>{overlay.trendState.toUpperCase()}</p>
          <p className="mt-1">BOS: {overlay.bos}</p>
          <p>CHOCH: {overlay.choch}</p>
        </div>
        <div className="rounded-lg border border-white/10 bg-slate-900/70 p-2">
          <p className="font-black text-slate-100">Trade Plan (Recipe)</p>
          <p>Bias: {overlay.tradePlan.bias}</p>
          <p>The pass: {overlay.tradePlan.entryArea}</p>
          <p>Burn point: {overlay.tradePlan.burnPoint}</p>
          <p>Tables served: {overlay.tradePlan.tablesServed}</p>
        </div>
      </div>
    </section>
  );
}
