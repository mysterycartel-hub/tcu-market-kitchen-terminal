'use client'

import { useState, useEffect } from 'react'
import { getJournalEntries, type JournalEntry } from '@/lib/tcu/storage'
import Link from 'next/link'

export function JournalHome() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [filterSymbol, setFilterSymbol] = useState('')
  const [filterResult, setFilterResult] = useState('')

  useEffect(() => {
    setEntries(getJournalEntries())
  }, [])

  const filtered = entries.filter(e => {
    if (filterSymbol && e.symbol !== filterSymbol) return false
    if (filterResult && e.result !== filterResult) return false
    return true
  })

  const symbols = [...new Set(entries.map(e => e.symbol))].filter(Boolean)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
            Trade Journal
          </h1>
          <p className="text-[#f5f0e8]/50 mt-1">The kitchen log never lies. Write everything.</p>
        </div>
        <Link
          href="/journal/new"
          className="px-5 py-2.5 bg-[#c9a84c] text-[#060608] font-semibold rounded-lg hover:bg-[#c9a84c]/90 transition-colors text-center"
        >
          + New Entry
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <select
          value={filterSymbol}
          onChange={e => setFilterSymbol(e.target.value)}
          className="bg-[#0d0d10] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#f5f0e8] focus:outline-none"
        >
          <option value="">All Symbols</option>
          {symbols.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={filterResult}
          onChange={e => setFilterResult(e.target.value)}
          className="bg-[#0d0d10] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#f5f0e8] focus:outline-none"
        >
          <option value="">All Results</option>
          <option value="TP1 hit">TP1 Hit</option>
          <option value="TP2 hit">TP2 Hit</option>
          <option value="TP3 hit">TP3 Hit</option>
          <option value="Stopped out">Stopped Out</option>
          <option value="Breakeven">Breakeven</option>
          <option value="No trade taken">No Trade</option>
        </select>
      </div>

      {/* Entries List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-4xl mb-4 block">📝</span>
          <p className="text-[#f5f0e8]/50">No journal entries yet.</p>
          <p className="text-sm text-[#f5f0e8]/30 mt-1">Start logging your trades to track progress.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(entry => (
            <Link
              key={entry.id}
              href={`/journal/${entry.id}`}
              className="block bg-[#0d0d10] border border-white/5 rounded-xl p-4 hover:border-[rgba(201,168,76,0.12)] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-[#c9a84c]">{entry.symbol}</span>
                  <span className="text-xs text-[#f5f0e8]/40">{entry.date}</span>
                  <span className="text-xs text-[#f5f0e8]/40">{entry.session}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                  entry.result?.includes('TP') ? 'bg-[#22C55E]/10 text-[#22C55E]' :
                  entry.result === 'Stopped out' ? 'bg-[#EF4444]/10 text-[#EF4444]' :
                  'bg-white/5 text-[#f5f0e8]/50'
                }`}>
                  {entry.result || 'Pending'}
                </span>
              </div>
              {entry.entryReason && (
                <p className="text-sm text-[#f5f0e8]/60 line-clamp-1">{entry.entryReason}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
