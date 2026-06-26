'use client'

import { useState } from 'react'
import { saveJournalEntry, type JournalEntry } from '@/lib/tcu/storage'
import { useRouter } from 'next/navigation'

export function JournalEntryForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    symbol: 'XAUUSD',
    session: '',
    timeframe: '',
    setupType: '',
    bias: '',
    liquiditySwept: false,
    liquidityNote: '',
    aoiUsed: '',
    entryReason: '',
    burnPoint: '',
    table1: '',
    table2: '',
    table3: '',
    result: '',
    mistake: '',
    emotion: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      userId: 'guest',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...form,
      screenshotUrl: '',
      chefNote: '',
    }

    // Try to get chef note
    try {
      const res = await fetch('/api/journal-chef-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        const data = await res.json()
        entry.chefNote = data.chefNote || ''
      }
    } catch { /* Chef note is optional */ }

    saveJournalEntry(entry)
    router.push('/journal')
  }

  const fieldClass = "w-full bg-[#0d0d10] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#f5f0e8] placeholder-[#f5f0e8]/30 focus:outline-none focus:border-[#c9a84c]/50"
  const labelClass = "block text-sm font-medium text-[#f5f0e8]/70 mb-1"

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
      <h1 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
        New Journal Entry
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Symbol</label>
          <select name="symbol" value={form.symbol} onChange={handleChange} className={fieldClass}>
            <option value="XAUUSD">XAUUSD (Gold Kitchen)</option>
            <option value="GBPJPY">GBPJPY (Forex)</option>
            <option value="EURUSD">EURUSD (Forex)</option>
            <option value="GBPUSD">GBPUSD (Forex)</option>
            <option value="BTCUSD">BTCUSD (Crypto Lab)</option>
            <option value="SPY">SPY (Stocks)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Session</label>
          <select name="session" value={form.session} onChange={handleChange} className={fieldClass}>
            <option value="">Select session</option>
            <option value="Pre-Asia">Pre-Asia</option>
            <option value="Asia">Asia</option>
            <option value="London">London</option>
            <option value="New York">New York</option>
            <option value="Post-NY">Post-NY</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Timeframe</label>
          <input type="text" name="timeframe" value={form.timeframe} onChange={handleChange} placeholder="e.g. 15m" className={fieldClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Setup Type</label>
        <select name="setupType" value={form.setupType} onChange={handleChange} className={fieldClass}>
          <option value="">Select setup</option>
          <option value="FVG entry">FVG Entry</option>
          <option value="OB entry">Order Block Entry</option>
          <option value="Liquidity sweep entry">Liquidity Sweep Entry</option>
          <option value="Bias continuation">Bias Continuation</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Bias</label>
          <select name="bias" value={form.bias} onChange={handleChange} className={fieldClass}>
            <option value="">Select bias</option>
            <option value="Bullish">Bullish</option>
            <option value="Bearish">Bearish</option>
            <option value="No Bias">No Bias</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Emotion Before Entry</label>
          <select name="emotion" value={form.emotion} onChange={handleChange} className={fieldClass}>
            <option value="">Select emotion</option>
            <option value="Calm">Calm</option>
            <option value="Anxious">Anxious</option>
            <option value="Excited">Excited</option>
            <option value="Revenge">Revenge</option>
            <option value="Bored">Bored</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" name="liquiditySwept" checked={form.liquiditySwept} onChange={handleChange} className="w-4 h-4" />
        <label className="text-sm text-[#f5f0e8]/70">Liquidity Swept?</label>
      </div>
      {form.liquiditySwept && (
        <div>
          <label className={labelClass}>Liquidity Note</label>
          <input type="text" name="liquidityNote" value={form.liquidityNote} onChange={handleChange} placeholder="Where was liquidity swept?" className={fieldClass} />
        </div>
      )}

      <div>
        <label className={labelClass}>AOI Used</label>
        <input type="text" name="aoiUsed" value={form.aoiUsed} onChange={handleChange} placeholder="Describe the pantry shelf / AOI" className={fieldClass} />
      </div>

      <div>
        <label className={labelClass}>Entry Reason</label>
        <textarea name="entryReason" value={form.entryReason} onChange={handleChange} placeholder="Why did you enter?" rows={3} className={fieldClass} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Burn Point (Stop Loss)</label>
          <input type="text" name="burnPoint" value={form.burnPoint} onChange={handleChange} placeholder="e.g. 2,328" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Result</label>
          <select name="result" value={form.result} onChange={handleChange} className={fieldClass}>
            <option value="">Select result</option>
            <option value="TP1 hit">TP1 Hit</option>
            <option value="TP2 hit">TP2 Hit</option>
            <option value="TP3 hit">TP3 Hit</option>
            <option value="Stopped out">Stopped Out</option>
            <option value="Breakeven">Breakeven</option>
            <option value="No trade taken">No Trade Taken</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Table 1 (TP1)</label>
          <input type="text" name="table1" value={form.table1} onChange={handleChange} placeholder="e.g. 2,345" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Table 2 (TP2)</label>
          <input type="text" name="table2" value={form.table2} onChange={handleChange} placeholder="e.g. 2,360" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass}>Table 3 (TP3)</label>
          <input type="text" name="table3" value={form.table3} onChange={handleChange} placeholder="e.g. 2,380" className={fieldClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Mistake (What went wrong?)</label>
        <textarea name="mistake" value={form.mistake} onChange={handleChange} placeholder="Be honest. This is how you improve." rows={2} className={fieldClass} />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-[#c9a84c] text-[#060608] font-semibold rounded-lg hover:bg-[#c9a84c]/90 transition-colors"
      >
        Save Entry
      </button>
    </form>
  )
}
