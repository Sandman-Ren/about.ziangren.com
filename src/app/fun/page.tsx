import { Metadata } from 'next'
import { Gamepad2, Construction } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fun - Ziang Ren',
  description: 'Fun projects, hobbies, and adventures by Ziang Ren.',
  openGraph: {
    title: 'Fun - Ziang Ren',
    description: 'Fun projects, hobbies, and adventures by Ziang Ren.',
    url: 'https://about.ziangren.com/fun',
  },
}

export default function FunPage() {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex justify-center">
                <Gamepad2 className="h-16 w-16 text-primary" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Fun Stuff
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                A collection of side projects, hobbies, and adventures.
              </p>
            </div>

            {/* Coming Soon Card */}
            <Card className="max-w-lg mx-auto">
              <CardHeader className="text-center space-y-4">
                <Construction className="h-10 w-10 mx-auto text-muted-foreground" />
                <CardTitle className="text-xl">Coming Soon</CardTitle>
                <CardDescription className="text-base">
                  This page is under construction. Check back later for travel photos,
                  gaming highlights, server projects, and more.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Back link */}
            <div>
              <Button asChild variant="ghost">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
