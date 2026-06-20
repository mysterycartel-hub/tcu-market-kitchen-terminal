import { CHARACTER_CARDS } from "@/lib/tcu/characters";
import CharacterCoachCard, { getCharacterImageSource } from "./CharacterCoachCard";

type KitchenTicketModalProps = {
  open: boolean;
  direction: "BUY" | "SELL" | null;
  grade: string;
  warnings: { step: string; coach: string }[];
  characterCards: { name: string; description: string }[];
  focusCharacters?: string[];
  onSave: () => void;
  onPracticeAnyway: () => void;
  onReplayLater: () => void;
  onBack: () => void;
};

export default function KitchenTicketModal({
  open,
  direction,
  grade,
  warnings,
  characterCards,
  focusCharacters,
  onSave,
  onPracticeAnyway,
  onReplayLater,
  onBack,
}: KitchenTicketModalProps) {
  if (!open || !direction) return null;

  const directionColor = direction === "BUY" ? "emerald" : "rose";
  const descriptionByName = new Map(CHARACTER_CARDS.map((card) => [card.name, card.description]));

  const warningCoachCards = warnings.map((warning) => {
    if (warning.step === "Bias") {
      return {
        name: "Grandma Market",
        role: "Bias",
        description: descriptionByName.get("Grandma Market") ?? warning.coach,
        accent: "indigo" as const,
      };
    }

    if (warning.step === "Liquidity") {
      return {
        name: "Louie Liquidity",
        role: "Liquidity",
        description: descriptionByName.get("Louie the Liquidity Chef") ?? warning.coach,
        accent: "cyan" as const,
      };
    }

    if (warning.step === "Confirmation") {
      return {
        name: "Candle Kid",
        role: "Confirmation",
        description: descriptionByName.get("Candle Kid") ?? warning.coach,
        accent: "blue" as const,
      };
    }

    if (warning.step === "Burn Point") {
      return {
        name: "Nana Value",
        role: "Risk",
        description: descriptionByName.get("Nana Value") ?? warning.coach,
        accent: "emerald" as const,
      };
    }

    if (warning.step === "Targets") {
      return {
        name: "Chef Goldie",
        role: "Targets",
        description: descriptionByName.get("Chef Goldie") ?? warning.coach,
        accent: "amber" as const,
      };
    }

    return {
      name: warning.step,
      role: "Setup",
      description: warning.coach,
      accent: "slate" as const,
    };
  });

  const focusCoachCards = (focusCharacters ?? []).map((coach) => ({
    name: coach,
    role: "Focus",
    description: descriptionByName.get(coach) ?? "Market focus coach.",
    accent: coach.includes("Goldie") ? ("amber" as const) : coach.includes("Melissa") ? ("orange" as const) : coach.includes("Grandma") ? ("indigo" as const) : coach.includes("Louie") ? ("cyan" as const) : coach.includes("Candle") ? ("blue" as const) : "violet" as const,
  }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-violet-600/30 bg-gradient-to-b from-slate-900/95 to-slate-950 p-8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.95)]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">🍽️ Kitchen Ticket Practice</p>
            <h2 className={`mt-2 text-4xl font-black uppercase tracking-wider text-${directionColor}-400`}>
              {direction === "BUY" ? "🟢 PRACTICE BUY" : "🔴 PRACTICE SELL"}
            </h2>
          </div>
          <div className={`rounded-xl bg-${directionColor}-600/15 px-4 py-3 border border-${directionColor}-500/40`}>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-black">Recipe Grade</p>
            <p className="mt-1 text-3xl font-black text-amber-400 drop-shadow-lg">{grade}</p>
          </div>
        </div>

        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div className="space-y-3">
            {focusCharacters?.length ? (
              <div className="rounded-xl border border-amber-500/25 bg-amber-500/8 p-4">
                <h3 className="font-black text-amber-300 uppercase tracking-wider text-sm mb-3">👥 Market Focus Coaches</h3>
                <div className="grid gap-2">
                  {focusCoachCards.map((coach) => (
                    <CharacterCoachCard
                      key={coach.name}
                      name={coach.name}
                      role={coach.role}
                      description={coach.description}
                      imageSrc={getCharacterImageSource(coach.name)}
                      accent={coach.accent}
                      compact
                    />
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-xl border border-violet-500/30 bg-violet-600/10 p-4">
              <h3 className="font-black text-violet-300 uppercase tracking-wider text-sm mb-3">🗺️ Kitchen Roadmap Status</h3>
              <p className="text-sm text-slate-200 leading-6">
                Complete kitchen steps for discipline. Missing ingredients are learning notes—not blockers. Chef warns, you decide.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-black text-white uppercase tracking-wider text-sm">⚠️ Chef Warnings</h3>
              {warnings.length ? (
                warningCoachCards.map((coach) => (
                  <CharacterCoachCard
                    key={coach.name + coach.role}
                    name={coach.name}
                    role={coach.role}
                    description={coach.description}
                    imageSrc={getCharacterImageSource(coach.name)}
                    accent={coach.accent}
                  />
                ))
              ) : (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/8 px-4 py-3 text-sm">
                  <p className="font-bold text-emerald-300">✅ Recipe is Clean</p>
                  <p className="mt-1 text-emerald-100/80 text-xs">All ingredients ready. Maintain discipline and journal your trading thinking.</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-black text-white uppercase tracking-wider text-sm">👨‍🍳 TCU Chef Crew Coaching</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {characterCards.map((coach) => (
                <CharacterCoachCard
                  key={coach.name}
                  name={coach.name}
                  role="Coach"
                  description={coach.description}
                  imageSrc={getCharacterImageSource(coach.name)}
                  accent={coach.name.includes("Goldie") ? "amber" : coach.name.includes("Louie") ? "cyan" : coach.name.includes("Grandma") ? "indigo" : coach.name.includes("Melissa") ? "orange" : coach.name.includes("Nana") ? "emerald" : coach.name.includes("Melody") ? "rose" : coach.name.includes("Candle") || coach.name.includes("Wickie") ? "blue" : "violet"}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 rounded-lg border border-violet-500/30 bg-violet-600/5 space-y-2">
          <p className="text-sm font-black text-violet-300 uppercase tracking-wider">📚 Practice Terminal Disclaimer</p>
          <p className="text-xs text-slate-200 leading-6">
            This kitchen ticket is for <span className="font-bold">education and practice only</span>. 
            No real broker connection. No live market data. No automatic execution. 
            Practice planning, keep a journal, and learn from every session.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row mb-4">
          <button
            type="button"
            onClick={onSave}
            className="flex-1 rounded-lg bg-gradient-to-r from-slate-700 to-slate-600 px-4 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:from-slate-600 hover:to-slate-500 border border-slate-600/50"
          >
            💾 Save Kitchen Ticket
          </button>
          <button
            type="button"
            onClick={onPracticeAnyway}
            className={`flex-1 rounded-lg bg-gradient-to-r from-${directionColor}-600 to-${directionColor}-700 px-4 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:from-${directionColor}-500 hover:to-${directionColor}-600 shadow-lg shadow-${directionColor}-600/40 border border-${directionColor}-500/40`}
          >
            {direction === "BUY" ? "🟢 PRACTICE BUY" : "🔴 PRACTICE SELL"}
          </button>
          <button
            type="button"
            onClick={onReplayLater}
            className="flex-1 rounded-lg border border-white/25 bg-slate-900/60 px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-100 transition hover:bg-slate-800 hover:border-white/40"
          >
            ⏱️ Replay Later
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-black uppercase tracking-wider text-slate-500 transition hover:text-slate-300"
          >
            ← Back to Chart
          </button>
        </div>
      </div>
    </div>
  );
}
