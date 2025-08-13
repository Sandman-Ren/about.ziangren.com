export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/Sandman-Ren"
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Ziang Ren
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/Sandman-Ren/about.ziangren.com"
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium underline underline-offset-4 hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
