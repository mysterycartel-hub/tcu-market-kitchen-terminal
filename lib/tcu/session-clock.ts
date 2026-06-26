/**
 * TCU Session Clock — Shows current trading session based on UTC
 * OPS/011
 */

export type SessionInfo = {
  name: string
  color: string
  emoji: string
  isActive: boolean
}

export function getCurrentSession(): SessionInfo {
  const utcHour = new Date().getUTCHours()

  if (utcHour >= 0 && utcHour < 7) {
    return { name: 'Asian Session — Inventory Count', color: '#3B82F6', emoji: '🌏', isActive: true }
  }
  if (utcHour >= 7 && utcHour < 8) {
    return { name: 'London Prep — Watch for Sweep', color: '#F97316', emoji: '🇬🇧', isActive: true }
  }
  if (utcHour >= 8 && utcHour < 12) {
    return { name: 'London Session — Plates Clearing', color: '#22C55E', emoji: '🍽️', isActive: true }
  }
  if (utcHour >= 12 && utcHour < 13) {
    return { name: 'London/NY Overlap — Rush Hour', color: '#EF4444', emoji: '🔥', isActive: true }
  }
  if (utcHour >= 13 && utcHour < 17) {
    return { name: 'New York Session — Main Service', color: '#A855F7', emoji: '🗽', isActive: true }
  }
  if (utcHour >= 17 && utcHour < 21) {
    return { name: 'Post-NY — Kitchen Review', color: '#6B7280', emoji: '📝', isActive: false }
  }
  return { name: 'Kitchen Closed — Pre-Asia Prep', color: '#374151', emoji: '🌙', isActive: false }
}

export function getSessionLabel(): string {
  return getCurrentSession().name
}
