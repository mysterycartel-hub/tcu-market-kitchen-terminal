'use client'

import { use } from 'react'
import { JournalEntryView } from '@/components/journal/JournalEntryView'

export default function JournalViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return <JournalEntryView entryId={id} />
}
