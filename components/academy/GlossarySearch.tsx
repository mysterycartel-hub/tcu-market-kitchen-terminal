'use client'

import { useState, useMemo } from 'react'
import { TCU_FULL_GLOSSARY } from '@/data/tcu-curriculum'

export function GlossarySearch() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'kitchen' | 'traditional' | string>('all')

  const levels = useMemo(() => {
    const set = new Set(TCU_FULL_GLOSSARY.map(e => e.level))
    return Array.from(set).sort()
  }, [])

  const filtered = useMemo(() => {
    return TCU_FULL_GLOSSARY.filter(entry => {
      const matchesSearch = search === '' ||
        entry.term.toLowerCase().includes(search.toLowerCase()) ||
        entry.kitchenTerm.toLowerCase().includes(search.toLowerCase()) ||
        entry.definition.toLowerCase().includes(search.toLowerCase())

      const matchesFilter = filter === 'all' ||
        filter === 'kitchen' ||
        filter === 'traditional' ||
        entry.level === filter

      return matchesSearch && matchesFilter
    })
  }, [search, filter])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <h1 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
          TCU Glossary
        </h1>
        <span className="text-sm text-[#f5f0e8]/40 font-mono">{TCU_FULL_GLOSSARY.length} terms</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terms..."
          className="flex-1 bg-[#0d0d10] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-[#c9a84c]/50"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-[#0d0d10] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-[#f5f0e8] focus:outline-none focus:border-[#c9a84c]/50"
        >
          <option value="all">All</option>
          {levels.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {filtered.map((entry, i) => (
          <div key={i} className="bg-[#0d0d10] border border-white/5 rounded-lg p-4 hover:border-[rgba(201,168,76,0.12)] transition-colors">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <span className="font-semibold text-[#c9a84c]">{entry.kitchenTerm}</span>
              <span className="text-[#f5f0e8]/30 hidden sm:inline">|</span>
              <span className="text-sm text-[#f5f0e8]/60">{entry.term}</span>
              <span className="text-xs font-mono bg-white/5 rounded px-2 py-0.5 text-[#f5f0e8]/40 ml-auto">
                {entry.level}
              </span>
            </div>
            <p className="text-sm text-[#f5f0e8]/70">{entry.definition}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[#f5f0e8]/40 py-8">No terms found matching your search.</p>
        )}
      </div>
    </div>
  )
}
