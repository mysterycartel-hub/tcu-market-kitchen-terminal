'use client'

import { useState } from 'react'
import { TCU_CHARACTERS, type TCUCharacter } from '@/data/tcu-character-canon'

export function CharacterGuide() {
  const [selected, setSelected] = useState<TCUCharacter | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#f5f0e8]" style={{ fontFamily: 'var(--font-display)' }}>
          The Kitchen Crew
        </h1>
        <p className="text-[#f5f0e8]/50 mt-1">Meet the 10 characters of Trading Chef University.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TCU_CHARACTERS.map(char => (
          <button
            key={char.id}
            onClick={() => setSelected(char)}
            className="text-left bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-xl p-5 hover:border-[rgba(201,168,76,0.3)] hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{char.emoji}</span>
              <div>
                <h3 className="font-semibold text-[#f5f0e8] text-sm">{char.name}</h3>
                <p className="text-xs text-[#f5f0e8]/40">{char.role}</p>
              </div>
            </div>
            <p className="text-xs italic text-[#c9a84c]/70 line-clamp-2">&ldquo;{char.quote}&rdquo;</p>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div
            className="bg-[#0d0d10] border border-[rgba(201,168,76,0.12)] rounded-2xl p-6 max-w-md w-full space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <span className="text-5xl">{selected.emoji}</span>
              <div>
                <h2 className="text-xl font-bold text-[#f5f0e8]">{selected.name}</h2>
                <p className="text-sm text-[#f5f0e8]/50">{selected.role}</p>
              </div>
            </div>

            <p className="text-sm text-[#f5f0e8]/70 leading-relaxed">{selected.description}</p>

            <blockquote className="border-l-2 pl-3 italic text-sm text-[#c9a84c]/80" style={{ borderColor: selected.color }}>
              &ldquo;{selected.quote}&rdquo;
            </blockquote>

            <div>
              <h4 className="text-xs font-semibold text-[#f5f0e8]/50 mb-2 uppercase tracking-wide">Teaches</h4>
              <div className="flex flex-wrap gap-2">
                {selected.teaches.map(t => (
                  <span key={t} className="text-xs bg-white/5 border border-white/10 rounded px-2 py-0.5 text-[#f5f0e8]/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="w-full py-2 text-sm text-[#f5f0e8]/50 hover:text-[#f5f0e8] border border-white/10 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
