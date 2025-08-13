"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin } from "lucide-react"

// Game quotes database
const gameQuotes = [
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
]

interface ChatBubbleProps {
  quote: string
}

function ChatBubble({ quote }: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-10"
    >
      <div className="relative bg-background border border-border rounded-lg px-4 py-2 shadow-lg max-w-xs">
        <p className="text-sm text-foreground font-medium">{quote}</p>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border"></div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 translate-y-[-1px] w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-background"></div>
      </div>
    </motion.div>
  )
}

export function HeroSection() {
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [showQuote, setShowQuote] = useState(false)
  const [currentQuote, setCurrentQuote] = useState("")

  const handleAvatarClick = useCallback(() => {
    const now = Date.now()
    
    // Reset counter if more than 3 seconds have passed
    if (now - lastClickTime > 3000) {
      setClickCount(1)
    } else {
      setClickCount(prev => prev + 1)
    }
    
    setLastClickTime(now)
    
    // Trigger easter egg on 5th click within 3 seconds
    if (clickCount >= 4 && now - lastClickTime <= 3000) {
      const randomQuote = gameQuotes[Math.floor(Math.random() * gameQuotes.length)]
      setCurrentQuote(randomQuote)
      setShowQuote(true)
      setClickCount(0)
      
      // Hide quote after 3 seconds
      setTimeout(() => {
        setShowQuote(false)
      }, 3000)
    }
  }, [clickCount, lastClickTime])

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
          <div className="relative">
            <Avatar 
              className="w-32 h-32 mx-auto cursor-pointer ring-4 ring-border hover:ring-primary/50 transition-all duration-300"
              onClick={handleAvatarClick}
            >
              <AvatarImage 
                src="/profile.svg" 
                alt="Ziang Ren"
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                ZR
              </AvatarFallback>
            </Avatar>
            
            <AnimatePresence>
              {showQuote && (
                <ChatBubble 
                  quote={currentQuote} 
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
