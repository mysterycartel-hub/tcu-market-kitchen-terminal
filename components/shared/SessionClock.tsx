'use client'

import { useState, useEffect } from 'react'
import { getCurrentSession } from '@/lib/tcu/session-clock'

export function SessionClock() {
  const [session, setSession] = useState(getCurrentSession())

  useEffect(() => {
    const interval = setInterval(() => setSession(getCurrentSession()), 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono border"
      style={{ borderColor: `${session.color}30`, color: session.color }}
    >
      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: session.isActive ? session.color : '#6B7280' }} />
      <span>{session.emoji} {session.name}</span>
    </div>
  )
}
