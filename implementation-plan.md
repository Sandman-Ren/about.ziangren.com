# Implementation Plan for Personal Website Revamp

## Project Overview
Personal website at https://about.ziangren.com using Next.js with TypeScript, shadcn-ui components, MDX support, and Framer Motion animations.

## Progress Summary
**Overall Progress: ~85% Complete** *(Last Updated: March 19, 2026)*

### Completed
- **Core Infrastructure**: Next.js 15 + TypeScript + Static Export
- **UI System**: shadcn/ui components with full theming (light/dark/system)
- **Blog System**: Complete MDX blog with search, filtering, pagination, and GitHub integration (7 posts)
- **Landing Page**: Interactive hero section with easter egg (Blizzard game quotes)
- **Responsive Design**: Mobile-first with Framer Motion animations
- **Performance**: Optimized for Core Web Vitals and fast loading
- **Deployment**: GitHub Actions CI/CD → GitHub Pages with custom domain
- **Testing**: Playwright E2E tests (home, blog list, blog post)
- **SEO**: Sitemap, robots.txt, Open Graph / Twitter Card metadata

### Pending
- **Fun Gallery Page**: Placeholder exists, content not yet built (photos, projects, hobbies)
- **Blog Enhancements**: Table of contents, copy-to-clipboard for code blocks, line numbers
- **Accessibility**: `prefers-reduced-motion` support
- **Content**: More blog posts, fun page content

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with ThemeProvider, fonts, metadata
│   ├── page.tsx            # Home (HeroSection)
│   ├── not-found.tsx       # Global 404
│   ├── sitemap.ts          # Dynamic sitemap generation
│   ├── robots.ts           # robots.txt generation
│   ├── blog/
│   │   ├── page.tsx        # Blog list with filtering
│   │   ├── layout.tsx      # Blog section wrapper
│   │   └── [slug]/page.tsx # Individual post with OG metadata
│   └── fun/
│       └── page.tsx        # Fun page (coming soon)
├── components/
│   ├── ui/                 # shadcn/ui primitives + FadeIn animation
│   ├── layout/             # Navigation, MainLayout
│   ├── blog/               # BlogList, BlogPostPage
│   └── about/              # HeroSection
├── hooks/                  # useEasterEgg, useBlogFilters
├── lib/
│   ├── blog/               # registry.ts, filters.ts
│   ├── animations.ts       # Framer Motion presets
│   ├── constants.ts        # Centralized config values
│   ├── formatting.ts       # Date/time formatters
│   ├── urls.ts             # URL generators
│   └── utils.ts            # Tailwind cn() helper
├── types/blog.ts           # BlogPost, SearchFilters, TagFilterMode
content/                    # Blog post source markdown files
e2e/                        # Playwright E2E tests
public/blog-registry.json   # Blog metadata registry
```

## Technology Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Content | MDX with remark-gfm, rehype-highlight, rehype-slug |
| Animations | Framer Motion |
| Icons | Lucide React |
| Testing | Playwright |
| Deployment | GitHub Pages via GitHub Actions |
