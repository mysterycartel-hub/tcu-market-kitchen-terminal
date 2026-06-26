/**
 * TCU Storage Layer — localStorage fallback for all data
 * Graceful degradation: works without Supabase
 * OPS/011
 */

const KEYS = {
  progress: 'tcu_progress',
  xp: 'tcu_xp',
  journal: 'tcu_journal',
  prep: 'tcu_prep',
  profile: 'tcu_profile',
} as const

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

function setItem(key: string, value: unknown): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    console.warn(`[TCU] Failed to save to localStorage: ${key}`)
  }
}

// ─── Progress ──────────────────────────────────────────

export type LessonCompletion = {
  lessonId: string
  completedAt: string
  xpEarned: number
  quizScore?: number
}

export function getCompletedLessons(): LessonCompletion[] {
  return getItem<LessonCompletion[]>(KEYS.progress, [])
}

export function markLessonComplete(lessonId: string, xp: number, quizScore?: number): void {
  const lessons = getCompletedLessons()
  if (lessons.find(l => l.lessonId === lessonId)) return
  lessons.push({ lessonId, completedAt: new Date().toISOString(), xpEarned: xp, quizScore })
  setItem(KEYS.progress, lessons)
  addXP(xp)
}

export function isLessonComplete(lessonId: string): boolean {
  return getCompletedLessons().some(l => l.lessonId === lessonId)
}

// ─── XP ────────────────────────────────────────────────

export function getTotalXP(): number {
  return getItem<number>(KEYS.xp, 0)
}

export function addXP(amount: number): number {
  const current = getTotalXP()
  const newTotal = current + amount
  setItem(KEYS.xp, newTotal)
  return newTotal
}

export function getCurrentLevel(totalXp: number): number {
  if (totalXp >= 1200) return 9
  if (totalXp >= 1000) return 8
  if (totalXp >= 800) return 7
  if (totalXp >= 600) return 6
  if (totalXp >= 450) return 5
  if (totalXp >= 300) return 4
  if (totalXp >= 150) return 3
  if (totalXp >= 50) return 2
  return 1
}


// ─── Journal ───────────────────────────────────────────

export type JournalEntry = {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
  date: string
  symbol: string
  session: string
  timeframe: string
  setupType: string
  bias: string
  liquiditySwept: boolean
  liquidityNote: string
  aoiUsed: string
  entryReason: string
  burnPoint: string
  table1: string
  table2: string
  table3: string
  result: string
  mistake: string
  emotion: string
  screenshotUrl: string
  chefNote: string
  rawData?: Record<string, unknown>
}

export function getJournalEntries(): JournalEntry[] {
  return getItem<JournalEntry[]>(KEYS.journal, [])
}

export function saveJournalEntry(entry: JournalEntry): void {
  const entries = getJournalEntries()
  const idx = entries.findIndex(e => e.id === entry.id)
  if (idx >= 0) {
    entries[idx] = { ...entry, updatedAt: new Date().toISOString() }
  } else {
    entries.unshift(entry)
  }
  setItem(KEYS.journal, entries)
}

export function deleteJournalEntry(id: string): void {
  const entries = getJournalEntries().filter(e => e.id !== id)
  setItem(KEYS.journal, entries)
}

export function getJournalEntry(id: string): JournalEntry | undefined {
  return getJournalEntries().find(e => e.id === id)
}

// ─── Market Prep ───────────────────────────────────────

export type MarketPrep = {
  date: string
  todaysMenu: string
  asiaHigh: string
  asiaLow: string
  prevDayHigh: string
  prevDayLow: string
  grandmaMarket: string
  nanaValue: string
  liquidityNotes: string
  aoiNotes: string
  roadmapChecklist: boolean[]
}

export function getTodayPrep(): MarketPrep {
  const today = new Date().toISOString().split('T')[0]
  const prep = getItem<MarketPrep | null>(KEYS.prep, null)
  if (prep && prep.date === today) return prep
  return {
    date: today,
    todaysMenu: '',
    asiaHigh: '',
    asiaLow: '',
    prevDayHigh: '',
    prevDayLow: '',
    grandmaMarket: '',
    nanaValue: '',
    liquidityNotes: '',
    aoiNotes: '',
    roadmapChecklist: [false, false, false, false, false, false, false, false],
  }
}

export function saveTodayPrep(prep: MarketPrep): void {
  setItem(KEYS.prep, prep)
}

// ─── Profile ───────────────────────────────────────────

export type TCUUserProfile = {
  displayName: string
  selectedLane: string
  activeSymbols: string[]
  notificationPrefs: Record<string, boolean>
}

export function getProfile(): TCUUserProfile {
  return getItem<TCUUserProfile>(KEYS.profile, {
    displayName: 'Student Chef',
    selectedLane: 'trading',
    activeSymbols: ['XAUUSD'],
    notificationPrefs: {},
  })
}

export function saveProfile(profile: TCUUserProfile): void {
  setItem(KEYS.profile, profile)
}
