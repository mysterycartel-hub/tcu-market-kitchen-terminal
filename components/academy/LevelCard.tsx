'use client'

import Link from 'next/link'
import type { TCULevel } from '@/data/tcu-curriculum'

type Props = {
  level: TCULevel
  completedCount: number
  totalCount: number
  isLocked: boolean
  currentXp: number
}

export function LevelCard({ level, completedCount, totalCount, isLocked, currentXp }: Props) {
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  const xpNeeded = level.xpRequired - currentXp

  return (
    <div className={`relative rounded-xl border p-6 transition-all duration-200 ${
      isLocked
        ? 'border-white/5 bg-[#0d0d10]/50 opacity-60'
        : 'border-[rgba(201,168,76,0.12)] bg-[#0d0d10] hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-0.5'
    }`}>
      {!isLocked && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#c9a84c] rounded-t-xl" />
      )}

      <div className="flex items-start justify-between mb-3">
        <span className="text-4xl font-bold text-[#c9a84c]/20" style={{ fontFamily: 'var(--font-display)' }}>
          {level.number}
        </span>
        {isLocked && (
          <span className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-[#f5f0e8]/40">
            🔒 {xpNeeded} XP needed
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-[#f5f0e8] mb-1">{level.chefTitle}</h3>
      <p className="text-sm text-[#f5f0e8]/50 mb-1">{level.title}</p>
      <p className="text-xs text-[#f5f0e8]/40 mb-4">{level.description}</p>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#c9a84c] rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-[#f5f0e8]/50 font-mono">
          {completedCount}/{totalCount}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-[#f5f0e8]/40">
          {level.character}
        </span>
        {!isLocked && (
          <Link
            href={`/academy/${level.id}`}
            className="text-xs font-medium text-[#c9a84c] hover:text-[#c9a84c]/80 transition-colors"
          >
            Enter →
          </Link>
        )}
      </div>
    </div>
  )
}
