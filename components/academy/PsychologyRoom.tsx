'use client'

import Link from 'next/link'

const PSYCHOLOGY_TOPICS = [
  { title: 'Patience', description: 'Learning to wait for the setup instead of forcing trades.', lessonId: 'l8-03', emoji: '⏳' },
  { title: 'Waiting for Confirmation', description: 'Never enter without LTF confirmation. Trust the process.', lessonId: 'l8-03', emoji: '✅' },
  { title: 'Not Chasing', description: 'If you missed the entry, let it go. Another setup will come.', lessonId: 'l8-01', emoji: '🚫' },
  { title: 'Protecting the Plate', description: 'Risk management is not optional. It is survival.', lessonId: 'l8-02', emoji: '🛡️' },
  { title: 'Revenge Trades', description: 'The worst trades come from wanting to get your money back.', lessonId: 'l8-05', emoji: '💢' },
  { title: 'Market Cycles', description: 'Markets breathe. They expand and contract. Accept the rhythm.', lessonId: 'l8-01', emoji: '🔄' },
]

export function PsychologyRoom() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
          Psychology Room
        </h1>
        <p className="text-[#f5f0e8]/50 mt-1">Master your mind. The market rewards discipline.</p>
      </div>

      {/* Melissa Mayhem Featured Quote */}
      <div className="bg-[#0d0d10] border border-[#EF4444]/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🔥</span>
          <div>
            <h3 className="font-semibold text-[#f5f0e8]">Melissa Mayhem</h3>
            <p className="text-xs text-[#f5f0e8]/40">Psychology Coach</p>
          </div>
        </div>
        <blockquote className="italic text-[#EF4444]/80 text-lg">
          &ldquo;I know the chaos. I have lived it. Every mistake you are about to make — I have already made it twice. Learn from my fire so you do not burn.&rdquo;
        </blockquote>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PSYCHOLOGY_TOPICS.map((topic) => (
          <Link
            key={topic.title}
            href={`/academy/level-8/${topic.lessonId}`}
            className="bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-xl p-5 hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-0.5 transition-all block"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{topic.emoji}</span>
              <h3 className="font-semibold text-[#f5f0e8]">{topic.title}</h3>
            </div>
            <p className="text-sm text-[#f5f0e8]/60">{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
