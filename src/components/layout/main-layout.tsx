import { Navigation } from "@/components/layout/navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex h-full flex-col bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
