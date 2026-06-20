"use client";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import OvertradingWarningPanel from "@/components/tcu/OvertradingWarningPanel";
import { DEFAULT_SYMBOL } from "@/lib/tcu/symbols";
import { useState } from "react";
import { useTCUProgress } from "@/components/tcu/TCUProgressProvider";

type JournalEntry = { id: string; text: string; savedAt: string };

const JOURNAL_KEY = "tcu.journal.entries";

function loadEntries(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(JOURNAL_KEY) || "[]") as JournalEntry[];
  } catch {
    return [];
  }
}

function saveEntries(entries: JournalEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries));
}

export default function JournalPage() {
  const { progress, addJournalEntry } = useTCUProgress();
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState<JournalEntry[]>(() => loadEntries());
  const [saved, setSaved] = useState(false);

  const saveJournal = () => {
    if (!note.trim()) return;
    const entry: JournalEntry = {
      id: `${Date.now()}`,
      text: note.trim(),
      savedAt: new Date().toLocaleString(),
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    saveEntries(updated);
    addJournalEntry(note.trim());
    setNote("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <TopMarketBar selectedSymbol={DEFAULT_SYMBOL} grade="--" mode="Journal" onChefRead={() => {}} onChecklist={() => {}} />
      <main className="mx-auto max-w-7xl px-6 py-8 space-y-6">
        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">Journal</p>
          <h2 className="mt-2 text-3xl font-black">Practice tickets, notes, and lessons</h2>
          <p className="mt-3 text-slate-300 max-w-3xl">Write the chart story, save it, and come back tomorrow to continue the streak.</p>
          <p className="mt-1 text-sm text-slate-400">{progress.journalCount} total entries saved · +15 XP per entry</p>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
          {/* Write section */}
          <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-black">New Journal Entry</p>
            <div className="space-y-2 text-sm text-slate-400 leading-6">
              <p>1. What was the bias?</p>
              <p>2. Where was liquidity?</p>
              <p>3. Did AOI and delivery line up?</p>
              <p>4. Did Burn Alarm and Grandma Market both agree?</p>
              <p>5. Would you take the same trade again?</p>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={6}
              placeholder="Write a journal entry here..."
              className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-600 resize-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
            />
            <button
              type="button"
              onClick={saveJournal}
              className={`rounded-xl px-5 py-2.5 font-black uppercase tracking-wider text-sm transition ${
                saved
                  ? "bg-emerald-600/30 border border-emerald-500/50 text-emerald-200"
                  : "bg-violet-600 text-white hover:bg-violet-500"
              }`}
            >
              {saved ? "✅ Entry Saved! +15 XP" : "Save Journal Entry"}
            </button>

            {/* Past entries */}
            {entries.length > 0 && (
              <div className="border-t border-white/8 pt-4 space-y-3">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-bold">Previous Entries ({entries.length})</p>
                {entries.map((e) => (
                  <div key={e.id} className="rounded-xl border border-white/8 bg-slate-900/50 p-3">
                    <p className="text-[10px] text-slate-500 font-bold mb-1">{e.savedAt}</p>
                    <p className="text-sm text-slate-300 leading-5 whitespace-pre-wrap">{e.text}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <OvertradingWarningPanel />
        </div>
      </main>
    </div>
  );
}
