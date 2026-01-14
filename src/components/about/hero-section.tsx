"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"
import { useEasterEgg } from "@/hooks/useEasterEgg"
import { springs } from "@/lib/animations"

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

// SVG-based comic/game bubble with integrated notch (Option 2)
function SvgBubble({ children }: { children: React.ReactNode }) {
  return (
  <div className="relative inline-block overflow-visible">
      {/* Background shape with notch. Scales to content via viewBox. */}
      <svg
    className="absolute inset-0 -z-10 w-full h-full overflow-visible filter drop-shadow-bubble"
        viewBox="0 0 100 44"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
      d="M8 2 H92 Q98 2 98 8 V32 Q98 38 92 38 H20 L8 44 L10 38 H8 Q2 38 2 32 V8 Q2 2 8 2 Z"
          fill="hsl(var(--background) / 0.95)"
          stroke="hsl(var(--foreground) / 0.15)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Content */}
    <div className="px-6 py-4 flex items-center justify-start">
        {children}
      </div>
    </div>
  )
}

function ChatBubble({ quote, onMouseEnter, onMouseLeave }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.1, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.1, y: -10 }}
      transition={springs.snappy}
      className="absolute bottom-full left-full -ml-8 -mb-8 z-20 pointer-events-auto"
      style={{ transformOrigin: "bottom left" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative mt-2">
        {/* SVG bubble (option 2) */}
        <SvgBubble>
          <p dir="auto" className="pb-1 text-xl sm:text-2xl font-semibold tracking-wide text-foreground leading-relaxed boogaloo-font whitespace-nowrap text-left rtl:text-right relative z-10">
            {quote}
          </p>
        </SvgBubble>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  // Easter egg hook - handles all click counting, timeouts, and state
  const {
    isVisible: showQuote,
    currentItem: currentQuote,
    handleClick: handleAvatarClick,
    handleMouseEnter,
    handleMouseLeave,
  } = useEasterEgg({ items: [...GAME_QUOTES] })

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Profile Avatar with Easter Egg */}
        <motion.div 
          className="relative inline-block"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative inline-block">
            <motion.div
              whileTap={{ scale: 0.85 }}
              transition={springs.bouncy}
            >
              <Avatar 
                className="w-32 h-32 mx-auto cursor-pointer ring-4 ring-border hover:ring-primary/50 transition-all duration-300 select-none"
                onClick={handleAvatarClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <AvatarImage 
                  src="/profile.jpg" 
                  alt="Ziang Ren"
                  className="object-cover object-top"
                />
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
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

        {/* Name and Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Ziang Ren
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-medium">
            Software Engineer & Tech Enthusiast
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            Passionate about building innovative solutions at the intersection of technology and creativity. 
            I love exploring new frameworks, sharing knowledge through writing, and crafting meaningful digital experiences.
          </p>
        </motion.div>

        {/* Skills/Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2"
        >
          <Badge variant="secondary">Full Stack Development</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">React</Badge>
          <Badge variant="secondary">Next.js</Badge>
          <Badge variant="secondary">Node.js</Badge>
          <Badge variant="secondary">Cloud Architecture</Badge>
          <Badge variant="secondary">DevOps</Badge>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-muted-foreground"
        >
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Toronto, Canada</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full"></div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a 
                href="https://github.com/Sandman-Ren" 
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
                href="https://linkedin.com/in/ziangren" 
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
        </motion.div>
      </div>
    </section>
  )
}
