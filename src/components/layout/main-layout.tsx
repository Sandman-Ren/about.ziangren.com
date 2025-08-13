import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
