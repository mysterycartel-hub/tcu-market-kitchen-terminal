'use client'

import { useState, useEffect } from 'react'
import type { TCULesson } from '@/data/tcu-curriculum'
import { isLessonComplete, markLessonComplete } from '@/lib/tcu/storage'
import Link from 'next/link'

type Props = {
  lesson: TCULesson
  nextLessonId?: string
  levelId: string
}

export function LessonView({ lesson, nextLessonId, levelId }: Props) {
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    setCompleted(isLessonComplete(lesson.id))
  }, [lesson.id])

  function handleComplete() {
    markLessonComplete(lesson.id, lesson.xp)
    setCompleted(true)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-mono bg-[#c9a84c]/10 text-[#c9a84c] px-2 py-0.5 rounded">
            {lesson.duration}
          </span>
          <span className="text-xs font-mono bg-white/5 text-[#f5f0e8]/60 px-2 py-0.5 rounded capitalize">
            {lesson.type}
          </span>
          <span className="text-xs font-mono bg-[#22C55E]/10 text-[#22C55E] px-2 py-0.5 rounded">
            +{lesson.xp} XP
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#f5f0e8]">{lesson.chefTitle}</h1>
        <p className="text-sm text-[#f5f0e8]/50">{lesson.title}</p>
        <p className="text-xs text-[#f5f0e8]/40">Taught by: {lesson.character}</p>
      </div>

      {/* Summary */}
      <div className="bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-xl p-6">
        <p className="text-[#f5f0e8]/80 leading-relaxed">{lesson.summary}</p>
      </div>

      {/* Key Points */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-[#f5f0e8]">Key Points</h2>
        <ul className="space-y-2">
          {lesson.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-[#f5f0e8]/70">
              <span className="text-[#c9a84c] mt-0.5">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chef Quote */}
      <blockquote className="border-l-2 border-[#c9a84c] pl-4 py-2 italic text-[#c9a84c]/90">
        &ldquo;{lesson.chefQuote}&rdquo;
      </blockquote>

      {/* Glossary Terms */}
      {lesson.glossaryTerms.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-[#f5f0e8]/60">Glossary Terms</h3>
          <div className="flex flex-wrap gap-2">
            {lesson.glossaryTerms.map(term => (
              <Link
                key={term}
                href="/glossary"
                className="text-xs bg-white/5 border border-white/10 rounded px-2 py-1 text-[#f5f0e8]/60 hover:text-[#c9a84c] transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
        {!completed ? (
          <button
            onClick={handleComplete}
            className="px-6 py-2.5 bg-[#c9a84c] text-[#060608] font-semibold rounded-lg hover:bg-[#c9a84c]/90 transition-colors"
          >
            Mark Complete (+{lesson.xp} XP)
          </button>
        ) : (
          <span className="px-4 py-2 bg-[#22C55E]/10 text-[#22C55E] text-sm font-medium rounded-lg">
            ✓ Completed
          </span>
        )}

        {nextLessonId && (
          <Link
            href={`/academy/${levelId}/${nextLessonId}`}
            className="px-4 py-2 border border-[#c9a84c]/30 text-[#c9a84c] text-sm font-medium rounded-lg hover:bg-[#c9a84c]/5 transition-colors"
          >
            Next Lesson →
          </Link>
        )}
      </div>
    </div>
  )
}
