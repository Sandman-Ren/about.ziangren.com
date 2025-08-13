import { Navigation } from "@/components/layout/navigation"

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
      <footer className="border-t border-border/40 py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by{" "}
              <a
                href="https://github.com/Sandman-Ren"
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium underline underline-offset-4"
              >
                Ziang Ren
              </a>
              . The source code is available on{" "}
              <a
                href="https://github.com/Sandman-Ren/about.ziangren.com"
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
