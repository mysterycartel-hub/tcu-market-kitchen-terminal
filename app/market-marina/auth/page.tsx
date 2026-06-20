"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, type FormEvent, useState } from "react";
import TopMarketBar from "@/components/tcu/TopMarketBar";
import { DEFAULT_SYMBOL } from "@/lib/tcu/symbols";
import { useTCUProgress } from "@/components/tcu/TCUProgressProvider";

function AuthPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createNewAccount, signOut, hasAccount, progress, usingSupabase } = useTCUProgress();
  const [name, setName] = useState(progress.profile?.name || "");
  const [email, setEmail] = useState(progress.profile?.email || "");
  const [status, setStatus] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [sending, setSending] = useState(false);

  const callbackError = searchParams.get("error");
  const callbackErrorDescription = searchParams.get("error_description");
  const fallbackStatus = callbackError
    ? (callbackErrorDescription ? `${callbackError}: ${callbackErrorDescription}` : callbackError)
    : (progress.profile ? "Account loaded from this device." : "");
  const displayStatus = status || fallbackStatus;
  const displayIsError = status ? isError : Boolean(callbackError);

  const handleCreateAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setIsError(false);
    const result = await createNewAccount(name.trim() || "Trading Chef", email.trim());
    setSending(false);

    if (!result.ok) {
      // Local account still created — just surface the Supabase warning.
      setIsError(true);
      setStatus(`Saved locally. Auth warning: ${result.error}`);
      setTimeout(() => router.push("/dashboard"), 1500);
      return;
    }

    if (usingSupabase) {
      setIsError(false);
      setStatus(`✅ Magic link sent to ${email.trim()}. Check your inbox to complete sign-in.`);
      return;
    }

    setStatus("Local account ready.");
    router.push("/dashboard");
  };

  const handleSignOut = async () => {
    await signOut();
    setStatus("Signed out.");
    setIsError(false);
  };

  const statusBorder = displayIsError
    ? "border-rose-500/30 bg-rose-500/10 text-rose-200"
    : "border-emerald-500/20 bg-emerald-500/10 text-emerald-100";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <TopMarketBar selectedSymbol={DEFAULT_SYMBOL} grade="--" mode="Auth" onChefRead={() => {}} onChecklist={() => {}} />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-400 font-black">Kitchen Account</p>
            <h2 className="mt-2 text-3xl font-black">
              {hasAccount ? `Welcome back, ${progress.profile?.name || "Chef"}` : "Create account and start the path"}
            </h2>
            <p className="mt-2 text-slate-300 text-sm">
              {usingSupabase
                ? "Supabase magic-link auth — enter your email and we'll send a sign-in link."
                : "Local fallback mode — Supabase env vars not set. Progress saves to this browser only."}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleCreateAccount}>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40"
                required
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/40"
                required
              />
            </label>
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 py-3 rounded-xl font-black uppercase tracking-widest text-white transition"
            >
              {sending ? "Sending…" : hasAccount ? "Re-send Magic Link" : "Create Account + Send Magic Link"}
            </button>
          </form>

          {displayStatus && (
            <div className={`rounded-2xl border p-4 text-sm ${statusBorder}`}>
              {displayStatus}
            </div>
          )}

          {hasAccount && (
            <div className="border-t border-white/10 pt-4 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                <span className="block font-bold text-slate-400">{progress.profile?.email}</span>
                <span>{progress.xp} XP · {progress.rank}</span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-rose-200 hover:bg-rose-500/20 transition"
              >
                Sign Out
              </button>
            </div>
          )}

          <p className="text-xs text-slate-600 text-center">
            Education only · No broker · No live trading · No profit promises
          </p>
        </section>
      </main>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-slate-100" />}>
      <AuthPageContent />
    </Suspense>
  );
}
