/**
 * Blog Layout
 *
 * A simple wrapper for the blog section. Individual pages handle their own
 * data fetching and loading states - this layout just provides the container.
 *
 * Previously this layout used usePathname() to detect if we were on a post page
 * and fetched post data in useEffect. This was an anti-pattern because:
 * 1. It caused unnecessary client-side data fetching
 * 2. Layout re-renders on every route change
 * 3. SSG/static export benefits were lost
 *
 * Now each page handles its own data needs, which works better with Next.js
 * static export and allows for proper loading states at the page level.
 */

interface BlogLayoutProps {
  children: React.ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      {children}
    </div>
  )
}
