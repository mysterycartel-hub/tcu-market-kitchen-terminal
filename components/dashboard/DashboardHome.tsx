'use client'

import { useState, useEffect } from 'react'
import { getTotalXP, getCompletedLessons, getJournalEntries, getTodayPrep, saveTodayPrep } from '@/lib/tcu/storage'
import { getCurrentSession } from '@/lib/tcu/session-clock'
import { TRADING_CHEF_ROAD_MAP } from '@/data/tcu-curriculum'
import { getRank, getXpProgress } from '@/lib/tcu/xp'
import Link from 'next/link'

export function DashboardHome() {
  const [xp, setXp] = useState(0)
  const [lessonsCompleted, setLessonsCompleted] = useState(0)
  const [recentJournal, setRecentJournal] = useState<{ id: string; symbol: string; date: string; result: string }[]>([])
  const [prep, setPrep] = useState(getTodayPrep())
  const [session, setSession] = useState(getCurrentSession())

  useEffect(() => {
    setXp(getTotalXP())
    setLessonsCompleted(getCompletedLessons().length)
    const entries = getJournalEntries().slice(0, 3)
    setRecentJournal(entries.map(e => ({ id: e.id, symbol: e.symbol, date: e.date, result: e.result })))
    setPrep(getTodayPrep())
    setSession(getCurrentSession())
    const interval = setInterval(() => setSession(getCurrentSession()), 60000)
    return () => clearInterval(interval)
  }, [])

  function toggleChecklist(idx: number) {
    const updated = { ...prep, roadmapChecklist: [...prep.roadmapChecklist] }
    updated.roadmapChecklist[idx] = !updated.roadmapChecklist[idx]
    setPrep(updated)
    saveTodayPrep(updated)
  }

  function updatePrepField(field: string, value: string) {
    const updated = { ...prep, [field]: value }
    setPrep(updated)
    saveTodayPrep(updated)
  }

  const rank = getRank(xp)
  const { pct } = getXpProgress(xp)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
            Dashboard
          </h1>
          <p className="text-[#f5f0e8]/50 mt-1">Your daily trading prep station.</p>
        </div>
        {/* Session Clock */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10" style={{ borderColor: `${session.color}30` }}>
          <span>{session.emoji}</span>
          <span className="text-sm font-mono" style={{ color: session.color }}>{session.name}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* XP Card */}
        <div className="bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">{rank.emoji}</span>
            <div>
              <p className="text-sm font-semibold text-[#f5f0e8]">{rank.rank}</p>
              <p className="text-xs text-[#f5f0e8]/40 font-mono">{xp} XP • {lessonsCompleted} lessons</p>
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#c9a84c] rounded-full" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Today's Menu */}
        <div className="bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#c9a84c] mb-2">Today&apos;s Menu (Bias)</h3>
          <input
            type="text"
            value={prep.todaysMenu}
            onChange={e => updatePrepField('todaysMenu', e.target.value)}
            placeholder="Bullish / Bearish / No Trade"
            className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-sm text-[#f5f0e8] placeholder-[#f5f0e8]/20 focus:outline-none focus:border-[#c9a84c]/50"
          />
        </div>

        {/* Recent Journal */}
        <div className="bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-[#c9a84c] mb-2">Recent Journal</h3>
          {recentJournal.length === 0 ? (
            <p className="text-xs text-[#f5f0e8]/30">No entries yet</p>
          ) : (
            <div className="space-y-2">
              {recentJournal.map(e => (
                <Link key={e.id} href={`/journal/${e.id}`} className="flex items-center justify-between text-xs hover:text-[#c9a84c] transition-colors">
                  <span className="text-[#f5f0e8]/60">{e.symbol} • {e.date}</span>
                  <span className={e.result?.includes('TP') ? 'text-[#22C55E]' : e.result === 'Stopped out' ? 'text-[#EF4444]' : 'text-[#f5f0e8]/30'}>
                    {e.result || '—'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Road Map Checklist */}
      <div className="bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-xl p-5">
        <h3 className="text-sm font-semibold text-[#c9a84c] mb-3">Today&apos;s Market Prep Checklist</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {TRADING_CHEF_ROAD_MAP.map((step, idx) => (
            <label key={step.step} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={prep.roadmapChecklist[idx] || false}
                onChange={() => toggleChecklist(idx)}
                className="w-4 h-4 rounded"
              />
              <span className={`${prep.roadmapChecklist[idx] ? 'text-[#22C55E]' : 'text-[#f5f0e8]/60'}`}>
                {step.step}. {step.title}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link href="/academy" className="bg-[#0d0d10] border border-white/5 rounded-lg p-4 text-center hover:border-[#c9a84c]/30 transition-colors">
          <span className="text-2xl block mb-1">📚</span>
          <span className="text-xs text-[#f5f0e8]/60">Academy</span>
        </Link>
        <Link href="/journal/new" className="bg-[#0d0d10] border border-white/5 rounded-lg p-4 text-center hover:border-[#c9a84c]/30 transition-colors">
          <span className="text-2xl block mb-1">📝</span>
          <span className="text-xs text-[#f5f0e8]/60">New Entry</span>
        </Link>
        <Link href="/roadmap" className="bg-[#0d0d10] border border-white/5 rounded-lg p-4 text-center hover:border-[#c9a84c]/30 transition-colors">
          <span className="text-2xl block mb-1">🗺️</span>
          <span className="text-xs text-[#f5f0e8]/60">Road Map</span>
        </Link>
        <Link href="/chart-upload" className="bg-[#0d0d10] border border-white/5 rounded-lg p-4 text-center hover:border-[#c9a84c]/30 transition-colors">
          <span className="text-2xl block mb-1">📊</span>
          <span className="text-xs text-[#f5f0e8]/60">Chart AI</span>
        </Link>
      </div>
    </div>
  )
}
