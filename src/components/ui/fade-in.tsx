'use client'

import { motion, HTMLMotionProps, Variants } from 'framer-motion'
import { transitions } from '@/lib/animations'
import { cn } from '@/lib/utils'

type FadeInVariant = 'fadeInUp' | 'fade' | 'fadeInScale'

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'animate' | 'variants' | 'transition'> {
  /** Delay before animation starts (seconds) */
  delay?: number
  /** Animation duration (seconds) */
  duration?: number
  /** Index for staggered list animations */
  index?: number
  /** Animation variant to use */
  variant?: FadeInVariant
  /** Additional className */
  className?: string
  children: React.ReactNode
}

// Import additional variants lazily to avoid circular deps
const variants: Record<FadeInVariant, Variants> = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
  },
}

/**
 * Reusable fade-in animation wrapper
 *
 * @example
 * // Basic usage
 * <FadeIn>
 *   <Card>...</Card>
 * </FadeIn>
 *
 * @example
 * // With delay
 * <FadeIn delay={0.2}>
 *   <p>Appears after 0.2s</p>
 * </FadeIn>
 *
 * @example
 * // Staggered list
 * {items.map((item, i) => (
 *   <FadeIn key={item.id} index={i}>
 *     <Card>{item.name}</Card>
 *   </FadeIn>
 * ))}
 */
export function FadeIn({
  delay = 0,
  duration = 0.5,
  index,
  variant = 'fadeInUp',
  className,
  children,
  ...props
}: FadeInProps) {
  // Use stagger transition if index is provided, otherwise custom transition
  const transition = index !== undefined
    ? transitions.stagger(index, delay)
    : { duration, delay }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants[variant]}
      transition={transition}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * FadeIn with exit animation for AnimatePresence
 */
export function FadeInOut({
  delay = 0,
  duration = 0.5,
  variant = 'fadeInUp',
  className,
  children,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="initial"
      variants={variants[variant]}
      transition={{ duration, delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
