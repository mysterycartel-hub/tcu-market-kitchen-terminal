"use client";
import Link from "next/link";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import { DEFAULT_SYMBOL } from "@/lib/tcu/symbols";

const ROADMAP = ["Bias", "Liquidity", "AOI", "Delivery", "Confirmation", "Entry", "Targets", "Management"];

const FEATURES = [
  { icon: "📖", title: "Chef Read",        desc: "8-step structured chart review following the full TCU roadmap." },
  { icon: "🎴", title: "Concept Vault",    desc: "Flashcards for every term — tap to reveal, earn XP per review." },
  { icon: "🍽️", title: "Kitchen Tickets",  desc: "Practice trade plans with BUY/SELL, risk fields, and grade scoring." },
  { icon: "📋", title: "Daily Review",     desc: "Pre-session checklist that keeps Burn Alarm armed and Grandma Market happy." },
  { icon: "📓", title: "Journal",          desc: "Write chart stories, save entries, track how your thinking improves." },
  { icon: "🏅", title: "XP & Ranks",      desc: "Earn XP for every review and entry. Rise from Apprentice to Trading Chef Master." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <TopMarketBar
        selectedSymbol={DEFAULT_SYMBOL}
        grade="--"
        mode="Welcome"
        onChefRead={() => void 0}
        onChecklist={() => void 0}
      />

      <main className="mx-auto max-w-5xl px-6 py-14 space-y-20">

        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5">
            <span className="text-xs font-black uppercase tracking-widest text-amber-300">Market Marina · Scott-King Coast</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight">
            Trade Like a Chef.<br />
            <span className="text-amber-300">Read the Market</span> Before You Risk the Plate.
          </h1>
          <p className="mx-auto max-w-xl text-slate-300 text-lg leading-relaxed">
            Trading Chef University teaches chart reading, structure, and decision discipline using kitchen language, characters, and a step-by-step roadmap.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/market-marina/auth"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-violet-700 px-6 py-3 text-base font-black uppercase tracking-wider text-white shadow-lg shadow-violet-600/40 hover:from-violet-500 hover:to-violet-600 transition"
            >
              Create Free Account
            </Link>
            <Link
              href="/market-marina/tcu-terminal"
              className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-6 py-3 text-base font-bold text-amber-100 hover:bg-amber-500/20 transition"
            >
              Open the Chart Kitchen
            </Link>
          </div>
          <p className="text-xs text-slate-500">
            Education only · No broker · No live trading · No profit promises
          </p>
        </section>

        {/* Roadmap */}
        <section>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-violet-400 font-black mb-4">The TCU Roadmap</p>
          <div className="flex flex-wrap justify-center gap-2">
            {ROADMAP.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-3 py-2 text-center">
                  <p className="text-[9px] uppercase text-violet-400 font-bold tracking-wider">Step {i + 1}</p>
                  <p className="text-sm font-black text-white">{step}</p>
                </div>
                {i < ROADMAP.length - 1 && (
                  <span className="text-slate-600 font-bold text-sm">→</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500 mt-4">Follow the 8 steps in order before every trade plan. No shortcuts.</p>
        </section>

        {/* Features */}
        <section>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-amber-400 font-black mb-6">What&apos;s Inside the Kitchen</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/8 bg-slate-900/60 p-5">
                <span className="text-2xl">{f.icon}</span>
                <h3 className="mt-2 font-black text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-400 leading-5">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-violet-500/20 bg-violet-600/10 p-10 text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">Start the journey</p>
          <h2 className="text-3xl font-black">Ready to open the kitchen?</h2>
          <p className="text-slate-300 max-w-md mx-auto">
            Create your free practice account, follow the roadmap, earn XP, and build real discipline — one session at a time.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/market-marina/auth"
              className="rounded-xl bg-violet-600 px-6 py-3 font-black uppercase tracking-wider text-white hover:bg-violet-500 transition"
            >
              Create Account — It&apos;s Free
            </Link>
            <Link
              href="/market-marina/roadmap"
              className="rounded-xl border border-white/20 px-6 py-3 font-bold text-slate-200 hover:bg-slate-800 transition"
            >
              Get the Free TCU Roadmap
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <footer className="text-center text-xs text-slate-600 space-y-1">
          <p>⚠️ Education only · Not financial advice · No live trading or brokerage execution</p>
          <p>© 2026 MysterMyself · Trading Chef University · Market Marina · Scott-King Coast</p>
        </footer>
      </main>
    </div>
  );
}
