'use client'

import { use } from 'react'
import { TCU_LEVELS } from '@/data/tcu-curriculum'
import { LessonView } from '@/components/academy/LessonView'

export default function LessonPage({ params }: { params: Promise<{ levelId: string; lessonId: string }> }) {
  const { levelId, lessonId } = use(params)
  const level = TCU_LEVELS.find(l => l.id === levelId)
  const lesson = level?.lessons.find(l => l.id === lessonId)

  if (!level || !lesson) {
    return <p className="text-center text-[#f5f0e8]/50 py-12">Lesson not found.</p>
  }

  const lessonIdx = level.lessons.findIndex(l => l.id === lessonId)
  const nextLesson = level.lessons[lessonIdx + 1]

  return (
    <LessonView
      lesson={lesson}
      nextLessonId={nextLesson?.id}
      levelId={levelId}
    />
  )
}
