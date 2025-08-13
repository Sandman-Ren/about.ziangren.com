import { MainLayout } from "@/components/layout/main-layout"

export default function Home() {
  return (
    <MainLayout>
      <div className="container flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Ziang Ren
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Software Engineer, Blogger, and Tech Enthusiast. 
            Exploring the intersection of technology, creativity, and innovation.
          </p>
        </div>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            This is a temporary landing page. The full website with blog and fun content is coming soon!
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Under Construction</span>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse delay-75"></div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
