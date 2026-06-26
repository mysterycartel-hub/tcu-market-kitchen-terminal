'use client'

import { TCU_LEVELS } from '@/data/tcu-curriculum'
import { getTotalXP, getCompletedLessons } from '@/lib/tcu/storage'
import { useState, useEffect } from 'react'
import { LevelCard } from './LevelCard'
import { XPSystem } from './XPSystem'

export function AcademyHome() {
  const [xp, setXp] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])

  useEffect(() => {
    setXp(getTotalXP())
    setCompletedLessons(getCompletedLessons().map(l => l.lessonId))
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
            TCU Academy
          </h1>
          <p className="text-[#f5f0e8]/60 mt-1">Master the kitchen. Level by level.</p>
        </div>
        <XPSystem xp={xp} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TCU_LEVELS.map((level) => {
          const levelLessons = level.lessons.map(l => l.id)
          const completed = levelLessons.filter(id => completedLessons.includes(id)).length
          const isLocked = xp < level.xpRequired
          return (
            <LevelCard
              key={level.id}
              level={level}
              completedCount={completed}
              totalCount={levelLessons.length}
              isLocked={isLocked}
              currentXp={xp}
            />
          )
        })}
      </div>
    </div>
  )
}
