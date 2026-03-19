# about.ziangren.com

Personal website and blog for Ziang Ren, built with Next.js 15 and deployed to GitHub Pages.

**Live site:** [about.ziangren.com](https://about.ziangren.com)

## Tech Stack

- **Framework:** Next.js 15 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Content:** MDX with remark/rehype plugins
- **Animations:** Framer Motion
- **Testing:** Playwright (E2E)
- **Deployment:** GitHub Pages via GitHub Actions

## Development

```bash
npm install
npm run dev        # Start dev server on localhost:3000
npm run build      # Production build (static export to /out)
npm run lint       # ESLint
npm test           # Playwright E2E tests
```

## Blog

Blog posts are MDX files managed through a two-part system:

1. **Content files** in `content/` (source markdown)
2. **Registry** at `public/blog-registry.json` (metadata)

To create a new post:
```bash
npm run new-note
```

## Project Structure

```
src/
├── app/            # Next.js App Router pages
├── components/     # UI, layout, blog, and about components
├── hooks/          # Custom React hooks
├── lib/            # Utilities, blog data access, animations
└── types/          # TypeScript type definitions
```

See [CLAUDE.md](CLAUDE.md) for detailed architecture documentation.
