'use client'

import { useEffect, useState } from 'react'
import { getJournalEntry, deleteJournalEntry, type JournalEntry } from '@/lib/tcu/storage'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Props = { entryId: string }

export function JournalEntryView({ entryId }: Props) {
  const [entry, setEntry] = useState<JournalEntry | null>(null)
  const router = useRouter()

  useEffect(() => {
    const e = getJournalEntry(entryId)
    if (e) setEntry(e)
  }, [entryId])

  function handleDelete() {
    if (confirm('Delete this journal entry?')) {
      deleteJournalEntry(entryId)
      router.push('/journal')
    }
  }

  if (!entry) {
    return <p className="text-[#f5f0e8]/50 text-center py-12">Entry not found.</p>
  }

  const fields = [
    { label: 'Symbol', value: entry.symbol },
    { label: 'Date', value: entry.date },
    { label: 'Session', value: entry.session },
    { label: 'Timeframe', value: entry.timeframe },
    { label: 'Setup Type', value: entry.setupType },
    { label: 'Bias', value: entry.bias },
    { label: 'Liquidity Swept', value: entry.liquiditySwept ? `Yes — ${entry.liquidityNote}` : 'No' },
    { label: 'AOI Used', value: entry.aoiUsed },
    { label: 'Entry Reason', value: entry.entryReason },
    { label: 'Burn Point', value: entry.burnPoint },
    { label: 'Table 1', value: entry.table1 },
    { label: 'Table 2', value: entry.table2 },
    { label: 'Table 3', value: entry.table3 },
    { label: 'Result', value: entry.result },
    { label: 'Mistake', value: entry.mistake },
    { label: 'Emotion', value: entry.emotion },
  ].filter(f => f.value)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#f5f0e8]">{entry.symbol} — {entry.date}</h1>
          <p className="text-sm text-[#f5f0e8]/40">{entry.session} • {entry.timeframe}</p>
        </div>
        <span className={`text-sm px-3 py-1 rounded font-mono ${
          entry.result?.includes('TP') ? 'bg-[#22C55E]/10 text-[#22C55E]' :
          entry.result === 'Stopped out' ? 'bg-[#EF4444]/10 text-[#EF4444]' :
          'bg-white/5 text-[#f5f0e8]/50'
        }`}>
          {entry.result || 'Pending'}
        </span>
      </div>

      <div className="bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-xl p-6 space-y-3">
        {fields.map(f => (
          <div key={f.label} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
            <span className="text-xs font-mono text-[#f5f0e8]/40 sm:w-32 shrink-0">{f.label}</span>
            <span className="text-sm text-[#f5f0e8]/80">{f.value}</span>
          </div>
        ))}
      </div>

      {entry.chefNote && (
        <div className="bg-[#0d0d10] border border-[#c9a84c]/20 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-[#c9a84c] mb-2">Chef Note (AI)</h3>
          <p className="text-sm text-[#f5f0e8]/70 italic">{entry.chefNote}</p>
        </div>
      )}

      <div className="flex gap-3">
        <Link href="/journal" className="px-4 py-2 border border-white/10 rounded-lg text-sm text-[#f5f0e8]/60 hover:text-[#f5f0e8] transition-colors">
          ← Back
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 border border-[#EF4444]/30 rounded-lg text-sm text-[#EF4444]/70 hover:text-[#EF4444] hover:border-[#EF4444]/50 transition-colors ml-auto"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
