import { CHEF_READ_STEPS } from "@/lib/tcu/vault";

export default function ChefReadChecklist() {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">Chef Read</p>
        <h2 className="text-2xl font-black text-white">Structured chart review</h2>
        <p className="mt-2 text-sm text-slate-400">
          Follow the full sequence, then save the idea only after the chart answers each step.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {CHEF_READ_STEPS.map((item, index) => (
          <div key={item.step} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Step {index + 1}</p>
            <h3 className="mt-1 text-lg font-black text-white">{item.step}</h3>
            <p className="mt-2 text-sm text-amber-300 font-semibold">{item.meaning}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
