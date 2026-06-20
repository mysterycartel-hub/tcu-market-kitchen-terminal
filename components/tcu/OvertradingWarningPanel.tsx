import { OVERTRADING_WARNINGS } from "@/lib/tcu/vault";

export default function OvertradingWarningPanel() {
  return (
    <section className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-5">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-rose-300 font-black">Burn Alarm</p>
        <h2 className="text-2xl font-black text-white">Overtrading warning panel</h2>
        <p className="mt-2 text-sm text-rose-100/80">
          If the kitchen feels rushed, the Burn Alarm tells you to pause before opening another ticket.
        </p>
      </div>
      <div className="space-y-3">
        {OVERTRADING_WARNINGS.map((item) => (
          <div key={item} className="rounded-2xl border border-rose-500/20 bg-slate-950/60 p-4 text-sm text-slate-200">
            {item}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
        Grandma Market patience rule: one clear setup beats three rushed ideas.
      </div>
    </section>
  );
}
