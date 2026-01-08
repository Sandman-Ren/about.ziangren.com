import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, ArrowLeft, Search, BookOpen, Gamepad2 } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* 404 Header */}
        <div className="space-y-4">
          <div className="text-8xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            404
          </div>
          <p className="text-xl font-medium bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Page Not Found
          </p>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Oops! This page seems to have wandered off
          </h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved to a different location.
          </p>
        </div>

        {/* Suggested Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/">
            <Card className="group card-hover-shadow cursor-pointer h-full">
              <CardHeader className="text-center">
                <Home className="h-8 w-8 mx-auto mb-2 text-primary transition-transform" />
                <CardTitle className="text-lg">Go Home</CardTitle>
                <CardDescription>
                  Return to the main page
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/blog">
            <Card className="group card-hover-shadow cursor-pointer h-full">
              <CardHeader className="text-center">
                <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary transition-transform" />
                <CardTitle className="text-lg">Read Blog</CardTitle>
                <CardDescription>
                  Explore my latest posts
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/fun">
            <Card className="group card-hover-shadow cursor-pointer h-full">
              <CardHeader className="text-center">
                <Gamepad2 className="h-8 w-8 mx-auto mb-2 text-primary transition-transform" />
                <CardTitle className="text-lg">Fun Stuff</CardTitle>
                <CardDescription>
                  Check out my projects
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
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
        </div>

        {/* Fun Easter Egg Message */}
        <div className="pt-8 border-t border-border/40">
          <p className="text-xs text-muted-foreground game-quote-font">
            &quot;You have not enough minerals.&quot; - Maybe that&apos;s why this page doesn&apos;t exist! 🎮
          </p>
        </div>
      </div>
    </div>
  )
}
