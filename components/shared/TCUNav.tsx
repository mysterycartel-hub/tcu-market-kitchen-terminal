'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', emoji: '📊' },
  { href: '/academy', label: 'Academy', emoji: '📚' },
  { href: '/roadmap', label: 'Road Map', emoji: '🗺️' },
  { href: '/journal', label: 'Journal', emoji: '📝' },
  { href: '/glossary', label: 'Glossary', emoji: '📖' },
  { href: '/characters', label: 'Crew', emoji: '👨‍🍳' },
  { href: '/psychology', label: 'Psychology', emoji: '🧠' },
  { href: '/chart-upload', label: 'Chart AI', emoji: '📈' },
]

export function TCUNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-white/5 bg-[#060608] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-1 overflow-x-auto">
        <Link href="/" className="font-bold text-[#c9a84c] mr-4 whitespace-nowrap text-sm" style={{ fontFamily: 'var(--font-display)' }}>
          TCU
        </Link>
        {NAV_ITEMS.map(item => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#c9a84c]/10 text-[#c9a84c] font-medium'
                  : 'text-[#f5f0e8]/50 hover:text-[#f5f0e8] hover:bg-white/5'
              }`}
            >
              <span className="mr-1">{item.emoji}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
