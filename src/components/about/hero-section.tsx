"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin, ArrowRight, Clock, Server, Gamepad2, Terminal } from "lucide-react"
import { useEasterEgg } from "@/hooks/useEasterEgg"
import { springs } from "@/lib/animations"
import { EXTERNAL_URLS } from "@/lib/constants"
import { getAllBlogPosts } from "@/lib/blog/registry"
import { formatDate } from "@/lib/formatting"

// Game quotes database - Blizzard classics
const GAME_QUOTES = [
  // StarCraft II quotes
  "My life for Aiur!",
  "You must construct additional pylons.",
  "Nuclear launch detected.",
  "We require more vespene gas.",
  "Carrier has arrived.",
  "In the rear with the gear.",
  "Show me the money!",
  "Power overwhelming!",
  "There is no cow level.",
  "Radio free zerg.",

  // WarCraft quotes
  "Work complete.",
  "Jobs done!",
  "Ready to work!",
  "Something need doing?",
  "Zug zug.",
  "Lok'tar ogar!",
  "For the Horde!",
  "Time is money, friend!",
  "I'm not ready!",
  "More work?",
  "Okey dokey.",
  "Dabu!",
  "Me not that kind of orc!",
  "Stop poking me!",
  "Ready to serve!",
  "Off I go then!",
  "What joy!",
  "I hear and obey!",
] as const

interface ChatBubbleProps {
  quote: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function ChatBubble({ quote, onMouseEnter, onMouseLeave }: ChatBubbleProps) {
  return (
    // Outer div handles positioning (CSS transforms not affected by Framer Motion)
    <div className="absolute top-full mt-3 left-[45%] -translate-x-1/2 md:top-auto md:bottom-full md:mt-0 md:mb-3 md:left-auto md:translate-x-0 md:right-1/2 lg:right-3/4 z-20 pointer-events-auto">
      {/* Inner motion.div handles animation only */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.3, y: -10 }}
        transition={springs.snappy}
        className="bubble-origin"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative rounded-xl bg-background/95 backdrop-blur-md border-2 border-foreground/15 bubble-shadow px-6 py-3.5 w-max max-w-80 sm:max-w-96">
          <p dir="auto" className="text-xl font-semibold tracking-wide text-foreground leading-relaxed boogaloo-font">
            {quote}
          </p>
          {/* Notch — rotated square with matching surface, responsive position */}
          <div className="absolute -top-[7px] left-[55%] -translate-x-1/2 md:top-auto md:-bottom-[7px] md:left-auto md:translate-x-0 md:right-6 w-3.5 h-3.5 rotate-45 bg-background/95 border-l-2 border-t-2 md:border-l-0 md:border-t-0 md:border-r-2 md:border-b-2 border-foreground/15" />
        </div>
      </motion.div>
    </div>
  )
}

// "Currently" items that show personality
const CURRENTLY_ITEMS = [
  { icon: Server, text: "Self-hosting everything on a home server" },
  { icon: Gamepad2, text: "Laddering in StarCraft II" },
  { icon: Terminal, text: "Building with Next.js and TypeScript" },
]

export function HeroSection() {
  // Easter egg hook - handles all click counting, timeouts, and state
  const {
    isVisible: showQuote,
    currentItem: currentQuote,
    handleClick: handleAvatarClick,
    handleMouseEnter,
    handleMouseLeave,
  } = useEasterEgg({ items: [...GAME_QUOTES] })

  // Get recent blog posts for the below-fold section
  const recentPosts = getAllBlogPosts().slice(0, 3)

  return (
    <section className="relative min-h-[85dvh] lg:min-h-0 lg:h-full flex flex-col px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Main hero content - asymmetric layout */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-6xl mx-auto py-12 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-center w-full">

          {/* Left column - text content: single animation group */}
          <motion.div
            className="space-y-6 md:space-y-8 lg:space-y-5 order-2 md:order-1 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Name */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground">
              Ziang Ren
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
              Software engineer who builds things for the web,
              <br className="hidden sm:block" />
              then writes about what broke along the way.
            </p>

            {/* Bio */}
            <div className="max-w-lg mx-auto md:mx-0">
              <p className="text-base text-muted-foreground/80 leading-relaxed">
                Based in Toronto. I spend my days writing code and my nights tinkering with
                self-hosted infrastructure, playing Blizzard games, and convincing myself that
                one more Traefik config change will finally fix everything.
              </p>
            </div>

            {/* Currently up to */}
            <div className="space-y-2 max-w-lg mx-auto md:mx-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                Currently
              </p>
              <div className="space-y-2">
                {CURRENTLY_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-muted-foreground justify-center md:justify-start"
                  >
                    <item.icon className="w-4 h-4 shrink-0 text-foreground/40" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links and location */}
            <div
              className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center md:justify-start"
            >
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Toronto, Canada</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-muted-foreground/40 rounded-full" />
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={EXTERNAL_URLS.GITHUB_PROFILE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={EXTERNAL_URLS.LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href="mailto:contact@ziangren.com"
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Contact
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right column - avatar */}
          <motion.div
            className="relative order-1 md:order-2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative inline-block">
              <motion.div
                whileTap={{ scale: 0.85 }}
                transition={springs.bouncy}
              >
                <Avatar
                  className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 cursor-pointer border border-border card-hover-shadow transition-all duration-300 select-none"
                  onClick={handleAvatarClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <AvatarImage
                    src="/profile.jpg"
                    alt="Ziang Ren"
                    className="object-cover object-top"
                  />
                  <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
                    ZR
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              <AnimatePresence mode="wait" initial={false}>
                {showQuote && currentQuote && (
                  <ChatBubble
                    key={currentQuote}
                    quote={currentQuote}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Below-fold section: Recent writing */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pb-8 lg:pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {/* Divider */}
          <div className="border-t border-border/60 mb-6 lg:mb-4" />

          <div className="flex items-center gap-3 mb-4 lg:mb-3">
            <h2 className="text-sm font-medium text-muted-foreground whitespace-nowrap">
              Recent Writing
            </h2>
            <div className="h-px flex-1 bg-border" />
            <Link
              href="/blog"
              className="group flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors shrink-0"
            >
              All posts
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-3">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-lg border border-transparent p-4 card-hover-shadow"
              >
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground/60">
                  <Clock className="w-3 h-3" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="text-muted-foreground/30">
                    &middot;
                  </span>
                  <span>{post.readingTime} min read</span>
                </div>
                <h3 className="font-medium text-foreground/90 group-hover:text-foreground transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground/70 line-clamp-2 leading-relaxed">
                  {post.summary}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
