"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Github, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { EXTERNAL_URLS } from "@/lib/constants"

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Fun",
    href: "/fun",
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-lg">
              Ziang Ren
            </span>
          </Link>
        </div>

        {/* Desktop Navigation & Theme Toggle */}
        <div className="flex items-center space-x-6">
          {/* GitHub Link with Tooltip */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={EXTERNAL_URLS.GITHUB_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:block text-foreground/60 hover:text-foreground transition-colors"
                  aria-label="View source code on GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Built by Ziang Ren</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Separator */}
          <Separator orientation="vertical" className="hidden md:block h-6" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  isActive(item.href)
                    ? "text-foreground font-semibold"
                    : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <MobileNav onNavigate={() => setIsOpen(false)} isActive={isActive} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

interface MobileNavProps {
  onNavigate: () => void
  isActive: (href: string) => boolean
}

function MobileNav({ onNavigate, isActive }: MobileNavProps) {
  return (
    <div className="flex flex-col space-y-3">
      <Link href="/" className="flex items-center space-x-2" onClick={onNavigate}>
        <span className="font-bold">Ziang Ren</span>
      </Link>
      <div className="flex flex-col space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "transition-colors hover:text-foreground",
              isActive(item.href)
                ? "text-foreground font-semibold"
                : "text-foreground/70"
            )}
          >
            {item.title}
          </Link>
        ))}

        {/* Separator */}
        <Separator className="my-2" />

        {/* GitHub Link */}
        <a
          href={EXTERNAL_URLS.GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onNavigate}
          className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
        >
          <Github className="h-4 w-4" />
          <span>Source Code</span>
        </a>
      </div>
    </div>
  )
}
