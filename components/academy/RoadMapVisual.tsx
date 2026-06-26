'use client'

import { useState } from 'react'
import { TRADING_CHEF_ROAD_MAP } from '@/data/tcu-curriculum'
import Link from 'next/link'

export function RoadMapVisual() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
          The Trading Chef Road Map
        </h1>
        <p className="text-[#f5f0e8]/50 mt-2">8 steps from bias to execution. Follow the recipe.</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {TRADING_CHEF_ROAD_MAP.map((step) => (
          <div
            key={step.step}
            className="relative bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-xl overflow-hidden cursor-pointer hover:border-[rgba(201,168,76,0.3)] transition-all"
            onClick={() => setExpanded(expanded === step.step ? null : step.step)}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#c9a84c]" />
            <div className="p-5">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-bold text-[#c9a84c]/15" style={{ fontFamily: 'var(--font-display)' }}>
                  {step.step}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#f5f0e8]">{step.chefTitle}</h3>
                  <p className="text-sm text-[#f5f0e8]/50">{step.title} • {step.character}</p>
                </div>
                <span className="text-[#f5f0e8]/30 text-xl">
                  {expanded === step.step ? '−' : '+'}
                </span>
              </div>

              {expanded === step.step && (
                <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
                  <p className="text-[#f5f0e8]/70">{step.description}</p>
                  <p className="text-sm italic text-[#f5f0e8]/50">{step.chefMetaphor}</p>
                  <blockquote className="border-l-2 border-[#c9a84c] pl-3 text-sm italic text-[#c9a84c]/80">
                    &ldquo;{step.chefQuote}&rdquo;
                  </blockquote>
                  <Link
                    href={`/academy/level-7/${step.lessonId}`}
                    className="inline-block text-xs text-[#c9a84c] hover:text-[#c9a84c]/80 font-medium"
                  >
                    Go to lesson →
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-xl italic text-[#c9a84c] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
          Chef&apos;s Golden Rule: No setup, no serve.
        </p>
      </div>
    </div>
  )
}
