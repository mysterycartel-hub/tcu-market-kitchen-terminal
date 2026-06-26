import { TCUNav } from '@/components/shared/TCUNav'
import { TCUDisclaimer } from '@/components/shared/TCUDisclaimer'

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TCUNav />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>
      <TCUDisclaimer />
    </div>
  )
}
