'use client'

import { use, useEffect, useState } from 'react'
import { TCU_LEVELS } from '@/data/tcu-curriculum'
import { isLessonComplete } from '@/lib/tcu/storage'
import Link from 'next/link'

export default function LevelPage({ params }: { params: Promise<{ levelId: string }> }) {
  const { levelId } = use(params)
  const level = TCU_LEVELS.find(l => l.id === levelId)
  const [completedSet, setCompletedSet] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (level) {
      const set = new Set<string>()
      level.lessons.forEach(l => {
        if (isLessonComplete(l.id)) set.add(l.id)
      })
      setCompletedSet(set)
    }
  }, [level])

  if (!level) {
    return <p className="text-center text-[#f5f0e8]/50 py-12">Level not found.</p>
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <Link href="/academy" className="text-xs text-[#c9a84c] hover:text-[#c9a84c]/80 mb-2 inline-block">
          ← Back to Academy
        </Link>
        <h1 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
          Level {level.number}: {level.chefTitle}
        </h1>
        <p className="text-[#f5f0e8]/50 mt-1">{level.title} • {level.character}</p>
        <p className="text-sm text-[#f5f0e8]/40 mt-2">{level.description}</p>
      </div>

      <div className="space-y-3">
        {level.lessons.map((lesson, idx) => {
          const isComplete = completedSet.has(lesson.id)
          return (
            <Link
              key={lesson.id}
              href={`/academy/${levelId}/${lesson.id}`}
              className="block bg-[#0d0d10] border border-white/5 rounded-xl p-5 hover:border-[rgba(201,168,76,0.12)] transition-all"
            >
              <div className="flex items-center gap-4">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  isComplete ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-white/5 text-[#f5f0e8]/30'
                }`}>
                  {isComplete ? '✓' : idx + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[#f5f0e8]">{lesson.chefTitle}</h3>
                  <p className="text-xs text-[#f5f0e8]/40">{lesson.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#f5f0e8]/30">{lesson.duration}</span>
                  <span className="text-xs font-mono bg-[#c9a84c]/10 text-[#c9a84c] px-2 py-0.5 rounded">
                    +{lesson.xp}
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
