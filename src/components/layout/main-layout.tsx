import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"

interface MainLayoutProps {
  children: React.ReactNode
  /** Whether to show the footer (default: true) */
  showFooter?: boolean
}

export function MainLayout({ children, showFooter = true }: MainLayoutProps) {
  return (
    <div className="relative flex h-full flex-col bg-background">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}
