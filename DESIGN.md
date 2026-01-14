# Design System

This document captures the visual design system for about.ziangren.com. Use this as a reference when making design decisions to ensure consistency.

---

## Color System

The site uses CSS custom properties with HSL values for theming. Colors automatically adapt between light and dark modes.

### Semantic Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | `hsl(0 0% 100%)` (white) | `hsl(240 10% 3.9%)` (near-black) | Page background |
| `--foreground` | `hsl(240 10% 3.9%)` (near-black) | `hsl(0 0% 98%)` (near-white) | Primary text |
| `--muted` | `hsl(240 4.8% 95.9%)` (light gray) | `hsl(240 3.7% 15.9%)` (dark gray) | Muted backgrounds, code blocks |
| `--muted-foreground` | `hsl(240 3.8% 46.1%)` | `hsl(240 5% 64.9%)` | Secondary text, captions |
| `--primary` | `hsl(240 9% 9%)` (dark) | `hsl(0 0% 98%)` (light) | Primary buttons, links |
| `--secondary` | `hsl(240 4.8% 95.9%)` | `hsl(240 3.7% 15.9%)` | Secondary buttons |
| `--accent` | Same as secondary | Same as secondary | Hover states |
| `--destructive` | `hsl(0 84.2% 60.2%)` (red) | `hsl(0 62.8% 30.6%)` (dark red) | Error states, warnings |
| `--border` | `hsl(240 5.9% 90%)` | `hsl(240 3.7% 15.9%)` | Borders, dividers |
| `--card` | Same as background | Same as background | Card backgrounds |
| `--ring` | `hsl(240 9% 9%)` | `hsl(240 4.9% 83.9%)` | Focus rings |

### Usage in Tailwind

```tsx
// Text colors
className="text-foreground"           // Primary text
className="text-muted-foreground"     // Secondary/caption text
className="text-primary"              // Accent/link text

// Backgrounds
className="bg-background"             // Page background
className="bg-card"                   // Card background
className="bg-muted"                  // Muted sections, code blocks
className="bg-primary"                // Primary buttons

// Borders
className="border-border"             // Standard border
className="border-input"              // Form inputs
```

---

## Typography

### Font Families

| Family | Usage |
|--------|-------|
| System sans-serif | Body text, UI elements |
| `Orbitron`, `Exo 2`, `Rajdhani` | Easter egg game quotes (`.game-quote-font`) |
| `Boogaloo` | Chat bubble playful text (`.boogaloo-font`) |

### Heading Scale

```tsx
// From Card component and general patterns
className="text-2xl font-semibold leading-none tracking-tight"  // CardTitle
className="text-sm text-muted-foreground"                       // CardDescription
```

### Prose (Blog Content)

Uses `@tailwindcss/typography` with custom prose colors:

```tsx
className="prose prose-neutral dark:prose-invert"
```

Prose variables map to theme tokens:
- `--tw-prose-body` → `foreground`
- `--tw-prose-headings` → `foreground`
- `--tw-prose-links` → `primary`
- `--tw-prose-code` → `foreground`
- `--tw-prose-pre-bg` → `muted`

---

## Spacing & Layout

### Border Radius

```tsx
--radius: 0.5rem  // Base radius

className="rounded-lg"   // var(--radius) = 0.5rem
className="rounded-md"   // calc(var(--radius) - 2px)
className="rounded-sm"   // calc(var(--radius) - 4px)
className="rounded-full" // Pills, badges, avatars
```

### Common Spacing Patterns

| Context | Classes |
|---------|---------|
| Card padding | `p-6` |
| Card header | `p-6` with `space-y-1.5` |
| Card content | `p-6 pt-0` |
| Section gaps | `gap-8` |
| List item gaps | `gap-4` or `space-y-4` |

---

## Component Patterns

### Buttons

Variants from `buttonVariants` (class-variance-authority):

| Variant | Appearance |
|---------|------------|
| `default` | Solid primary bg, contrast text |
| `secondary` | Muted bg, subtle |
| `outline` | Border only, transparent bg |
| `ghost` | No bg until hover |
| `link` | Underline on hover |
| `destructive` | Red for dangerous actions |

Sizes: `default` (h-10), `sm` (h-9), `lg` (h-11), `icon` (h-10 w-10)

```tsx
<Button variant="ghost" size="icon">
  <SunIcon />
</Button>
```

### Badges

Rounded pills for tags and status:

```tsx
<Badge variant="secondary">TypeScript</Badge>
<Badge variant="outline">Featured</Badge>
```

### Cards

Standard card structure:

```tsx
<Card className="card-hover-shadow">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

---

## Shadows & Effects

### Card Hover Shadow

Custom utility for theme-aware card hover:

```css
.card-hover-shadow:hover {
  /* Light mode: subtle lift */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  /* Dark mode: glow effect */
  box-shadow:
    0 10px 25px -5px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.15),
    0 0 30px -5px rgba(255, 255, 255, 0.12);
}
```

### Chat Bubble Shadow

```css
.drop-shadow-bubble {
  /* Light: soft shadow */
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));

  /* Dark: deeper shadow + subtle glow */
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5))
          drop-shadow(0 4px 8px rgba(255, 255, 255, 0.05));
}
```

---

## Animation System

### Spring Configurations

| Spring | Stiffness | Damping | Use Case |
|--------|-----------|---------|----------|
| `snappy` | 700 | 25 | Quick UI (bubble pop-in) |
| `bouncy` | 500 | 15 | Playful (avatar tap) |
| `gentle` | 300 | 20 | Subtle (page transitions) |

### Timing Constants

| Token | Value | Usage |
|-------|-------|-------|
| `ANIMATION.DURATION.FAST` | 0.3s | Hover, small changes |
| `ANIMATION.DURATION.DEFAULT` | 0.5s | Standard animations |
| `ANIMATION.DURATION.SLOW` | 0.6s | Page transitions |
| `ANIMATION.DELAY.STAGGER` | 0.1s | List item stagger |

### Animation Variants

```tsx
// Fade in from below (most common)
fadeInUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }

// Scale in (emphasis)
fadeInScale: { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 } }

// Pop in (playful)
bubblePopIn: { initial: { opacity: 0, scale: 0.1, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 } }

// Simple fade
fade: { initial: { opacity: 0 }, animate: { opacity: 1 } }
```

### FadeIn Component

Reusable wrapper for consistent animations:

```tsx
// Basic
<FadeIn>
  <Card>...</Card>
</FadeIn>

// With delay
<FadeIn delay={0.2}>
  <p>Delayed content</p>
</FadeIn>

// Staggered list
{items.map((item, i) => (
  <FadeIn key={item.id} index={i}>
    <Card>{item.name}</Card>
  </FadeIn>
))}
```

---

## Code Syntax Highlighting

Uses highlight.js with GitHub theme (light) and custom dark overrides.

### Dark Mode Code Colors

| Token Type | Color |
|------------|-------|
| Keywords (`if`, `const`) | `#ff7b72` (coral) |
| Functions, Classes | `#d2a8ff` (purple) |
| Variables, Numbers | `#79c0ff` (blue) |
| Strings | `#a5d6ff` (light blue) |
| Built-ins | `#ffa657` (orange) |
| Comments | `#8b949e` (gray) |
| Tags, Selectors | `#7ee787` (green) |

---

## Theme Transitions

All background and border colors transition smoothly:

```css
*,
*::before,
*::after {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}
```

---

## Key Constants

```typescript
// Pagination
POSTS_PER_PAGE = 6

// Easter egg
EASTER_EGG.CLICK_THRESHOLD = 5    // Clicks to activate
EASTER_EGG.CLICK_WINDOW_MS = 3000 // Time window for clicks
EASTER_EGG.BUBBLE_TIMEOUT_MS = 3000 // Auto-hide duration

// UI
UI.MAX_VISIBLE_TAGS = 3
UI.PAGINATION_WINDOW = 2  // Pages shown on each side
```

---

## Accessibility Notes

- All interactive elements have focus-visible ring styling
- Color contrast follows WCAG guidelines (verify with a11y-color-contrast-mcp)
- Buttons and links have distinct hover/active states
- Theme toggle has accessible name: "Toggle theme"
- Navigation uses semantic HTML roles

---

## File Reference

| File | Contains |
|------|----------|
| `src/app/globals.css` | CSS variables, syntax highlighting, custom utilities |
| `tailwind.config.ts` | Color tokens, typography prose config |
| `src/lib/constants.ts` | Magic numbers (timing, thresholds) |
| `src/lib/animations.ts` | Framer Motion presets |
| `src/components/ui/fade-in.tsx` | Reusable animation wrapper |
| `src/components/ui/*.tsx` | shadcn/ui component patterns |
