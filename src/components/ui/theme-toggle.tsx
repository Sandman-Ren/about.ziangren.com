"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { AnimatePresence, motion } from "framer-motion"

import { Button } from "@/components/ui/button"

const themes = ["light", "dark", "system"] as const

const iconVariants = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme as typeof themes[number])
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button variant="outline" size="icon" onClick={cycleTheme} className="relative overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" && (
          <motion.div
            key="light"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        )}
        {theme === "dark" && (
          <motion.div
            key="dark"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        )}
        {theme === "system" && (
          <motion.div
            key="system"
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Monitor className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme (current: {theme})</span>
    </Button>
  )
}
