'use client'

import { getRank, getXpProgress, getNextRank } from '@/lib/tcu/xp'

type Props = {
  xp: number
}

export function XPSystem({ xp }: Props) {
  const rank = getRank(xp)
  const next = getNextRank(xp)
  const { pct } = getXpProgress(xp)

  return (
    <div className="flex items-center gap-4 bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-xl px-4 py-3">
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-white/5"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            className="text-[#c9a84c]"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray={`${pct}, 100`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg">
          {rank.emoji}
        </span>
      </div>
      <div>
        <div className="text-sm font-semibold text-[#f5f0e8]">{rank.rank}</div>
        <div className="text-xs text-[#f5f0e8]/50 font-mono">
          {xp} XP {next ? `• ${next.minXp - xp} to ${next.rank}` : '• MAX'}
        </div>
      </div>
    </div>
  )
}
