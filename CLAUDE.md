# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and blog for Ziang Ren (about.ziangren.com). Built with Next.js 15 App Router, statically exported for GitHub Pages hosting.

## Commands

```bash
npm run dev      # Start development server on localhost:3000
npm run build    # Production build (static export to /out)
npm run lint     # ESLint
npm run start    # Start production server (not used for static hosting)
```

## Architecture

### Blog System

Blog posts use a two-part system:
1. **MDX files** at `src/app/blog/[slug]/page.mdx` - contain the actual post content (no frontmatter)
2. **Registry** at `public/blog-registry.json` - manually maintained metadata for all posts (title, summary, date, tags, keywords, readingTime, published, featured, aiAssisted)

When adding a new blog post:
1. Create `src/app/blog/[new-slug]/page.mdx` with markdown content
2. Add entry to `public/blog-registry.json` with all required fields

Blog utilities in `src/lib/client-utils.ts` read from the registry JSON, not the filesystem.

### Component Organization

- `src/components/ui/` - shadcn/ui primitives (Button, Card, Badge, etc.)
- `src/components/layout/` - Navigation, MainLayout, Footer
- `src/components/blog/` - BlogList, BlogPostPage
- `src/components/about/` - HeroSection (homepage)

### Key Patterns

- Path alias `@/` maps to `src/`
- Use `cn()` from `@/lib/utils` for Tailwind class merging
- Theme support via `next-themes` with ThemeProvider
- Animations use `framer-motion`
- MDX configured with remark-gfm, rehype-highlight, rehype-slug

### Static Export

Configured for GitHub Pages:
- `output: 'export'` in next.config.ts
- `trailingSlash: true` for proper routing
- `images.unoptimized: true` (no Image Optimization API)
