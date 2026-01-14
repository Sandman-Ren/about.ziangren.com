# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and blog for Ziang Ren (about.ziangren.com). Built with Next.js 15 App Router, statically exported for GitHub Pages hosting.

## Commands

```bash
# Development
npm run dev      # Start development server on localhost:3000
npm run build    # Production build (static export to /out)
npm run lint     # ESLint
npm run start    # Start production server (not used for static hosting)

# Testing (Playwright)
npm test                    # Run all tests
npm run test:ui             # Interactive UI mode
npm run test:headed         # Run with browser visible
npm run test:debug          # Debug mode with inspector
npm run test:report         # View last test report
npm run test:update-snapshots  # Update visual regression snapshots
```

## Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/
│   ├── ui/                 # shadcn/ui primitives + FadeIn animation
│   ├── layout/             # Navigation, MainLayout, Footer
│   ├── blog/               # BlogList, BlogPostPage
│   └── about/              # HeroSection
├── hooks/                  # Custom React hooks
│   ├── useEasterEgg.ts     # Avatar click easter egg logic
│   └── useBlogFilters.ts   # Blog filtering, search, pagination
├── lib/
│   ├── blog/               # Blog data access modules
│   │   ├── registry.ts     # getBlogPost, getAllBlogPosts, etc.
│   │   └── filters.ts      # filterPosts with TagFilterMode
│   ├── animations.ts       # Framer Motion presets (springs, variants)
│   ├── constants.ts        # Centralized magic numbers
│   ├── formatting.ts       # Date/time formatters
│   ├── urls.ts             # URL generators
│   └── utils.ts            # Tailwind cn() helper
├── types/
│   └── blog.ts             # BlogPost, SearchFilters, TagFilterMode
e2e/                        # Playwright tests
├── home.spec.ts            # Homepage + easter egg tests
├── blog.spec.ts            # Blog list filtering/pagination tests
└── blog-post.spec.ts       # Individual post tests
```

### Blog System

Blog posts use a two-part system:
1. **MDX files** at `src/app/blog/[slug]/page.mdx` - post content (no frontmatter)
2. **Registry** at `public/blog-registry.json` - metadata (title, summary, date, tags, etc.)

When adding a new blog post:
1. Create `src/app/blog/[new-slug]/page.mdx` with markdown content
2. Add entry to `public/blog-registry.json` with all required fields

Blog utilities in `src/lib/blog/registry.ts` read from the registry JSON.

### Key Patterns

- **Path alias**: `@/` maps to `src/`
- **Class merging**: Use `cn()` from `@/lib/utils` for Tailwind classes
- **Animations**: Use presets from `@/lib/animations.ts` (springs, fadeInUp, etc.)
- **Constants**: Import from `@/lib/constants.ts` (POSTS_PER_PAGE, EASTER_EGG, etc.)
- **Theme**: `next-themes` with ThemeProvider
- **MDX**: Configured with remark-gfm, rehype-highlight, rehype-slug

### Custom Hooks

**useEasterEgg** - For click-activated easter eggs:
```typescript
const { isVisible, currentItem, handleClick } = useEasterEgg({ items: quotes })
```

**useBlogFilters** - For blog list state management:
```typescript
const { paginatedPosts, searchQuery, setSearchQuery, ... } = useBlogFilters({ posts })
```

### Animation System

Use animation presets for consistency:
```typescript
import { springs, fadeInUp, transitions } from '@/lib/animations'

// Spring configs: springs.snappy, springs.bouncy, springs.gentle
// Variants: fadeInUp, fade, fadeInScale, slideInLeft
// Transitions: transitions.stagger(index), transitions.fadeIn
```

### Static Export

Configured for GitHub Pages:
- `output: 'export'` in next.config.ts
- `trailingSlash: true` for proper routing
- `images.unoptimized: true` (no Image Optimization API)

## Testing

### Running Tests

```bash
npm test                    # Run all E2E tests
npm run test:ui             # Interactive Playwright UI
npm run test:headed         # See browser while tests run
npm run test:debug          # Step through tests with debugger
```

### Visual Regression

Tests include screenshot comparisons. To update baseline snapshots:
```bash
npm run test:update-snapshots
```

Snapshots are stored in `e2e/*.spec.ts-snapshots/`.

### Test Structure

- **home.spec.ts**: Hero section, navigation, easter egg, theme toggle
- **blog.spec.ts**: Search, tag filtering, pagination, card clicks
- **blog-post.spec.ts**: Post rendering, back navigation, 404 handling
