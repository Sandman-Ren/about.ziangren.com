'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Home, ArrowLeft, Search, BookOpen, Gamepad2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
          className="space-y-4"
        >
          <div className="text-8xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            404
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Page Not Found
          </Badge>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-3xl font-bold tracking-tight">
            Oops! This page seems to have wandered off
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved to a different location.
          </p>
        </motion.div>

        {/* Suggested Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid gap-4 md:grid-cols-3"
        >
          <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardHeader className="text-center">
              <Home className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <CardTitle className="text-lg">Go Home</CardTitle>
              <CardDescription>
                Return to the main page
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/">
                  Take Me Home
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardHeader className="text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <CardTitle className="text-lg">Read Blog</CardTitle>
              <CardDescription>
                Explore my latest posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/blog">
                  Browse Posts
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
            <CardHeader className="text-center">
              <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-primary group-hover:scale-110 transition-transform" />
              <CardTitle className="text-lg">Fun Stuff</CardTitle>
              <CardDescription>
                Check out my projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/fun">
                  Explore Fun
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Button asChild variant="ghost">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
          
          <div className="hidden sm:block w-1 h-1 bg-muted-foreground rounded-full"></div>
          
          <p className="text-sm text-muted-foreground">
            Or search for something specific
          </p>
          
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Blog
            </Link>
          </Button>
        </motion.div>

        {/* Fun Easter Egg Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="pt-8 border-t border-border/40"
        >
          <p className="text-xs text-muted-foreground game-quote-font">
            &quot;You have not enough minerals.&quot; - Maybe that&apos;s why this page doesn&apos;t exist! 🎮
          </p>
        </motion.div>
      </div>
    </div>
  )
}
