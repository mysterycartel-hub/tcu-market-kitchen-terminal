'use client'

import { useState, useEffect } from 'react'
import { getProfile, saveProfile, type TCUUserProfile } from '@/lib/tcu/storage'
import { getAllSymbols } from '@/data/tcu-markets'

export function SettingsPage() {
  const [profile, setProfile] = useState<TCUUserProfile | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setProfile(getProfile())
  }, [])

  function handleSave() {
    if (profile) {
      saveProfile(profile)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  if (!profile) return null

  const allSymbols = getAllSymbols()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
        Settings
      </h1>

      <div className="bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#f5f0e8]/70 mb-1">Display Name</label>
          <input
            type="text"
            value={profile.displayName}
            onChange={e => setProfile({ ...profile, displayName: e.target.value })}
            className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#f5f0e8] focus:outline-none focus:border-[#c9a84c]/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#f5f0e8]/70 mb-1">Lane</label>
          <select
            value={profile.selectedLane}
            onChange={e => setProfile({ ...profile, selectedLane: e.target.value })}
            className="w-full bg-[#0d0d10] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#f5f0e8] focus:outline-none focus:border-[#c9a84c]/50"
          >
            <option value="trading">Trading</option>
            <option value="education">Education Only</option>
            <option value="demo">Demo / Paper Trading</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#f5f0e8]/70 mb-2">Active Symbols</label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {allSymbols.map(sym => (
              <label key={sym} className="flex items-center gap-2 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.activeSymbols.includes(sym)}
                  onChange={() => {
                    const symbols = profile.activeSymbols.includes(sym)
                      ? profile.activeSymbols.filter(s => s !== sym)
                      : [...profile.activeSymbols, sym]
                    setProfile({ ...profile, activeSymbols: symbols })
                  }}
                  className="w-3.5 h-3.5 rounded"
                />
                <span className="text-[#f5f0e8]/60 font-mono">{sym}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2.5 bg-[#c9a84c] text-[#060608] font-semibold rounded-lg hover:bg-[#c9a84c]/90 transition-colors"
        >
          {saved ? '✓ Saved' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
