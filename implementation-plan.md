# Implementation Plan for Personal Website Revamp

## Project Overview
Revamp of personal website at https://about.ziangren.com using Next.js with TypeScript, shadcn-ui components, MDX support, and Framer Motion animations.

## 1. Project Setup and Foundation

### 1.1 Initial Setup
- [ ] Create new Next.js 14+ project with TypeScript
- [ ] Configure static export for GitHub Pages deployment
- [ ] Set up ESLint, Prettier, and TypeScript configurations
- [ ] Initialize Git repository and connect to GitHub

### 1.2 Core Dependencies
- [ ] Install and configure shadcn-ui components
- [ ] Set up Tailwind CSS with custom theme configuration
- [ ] Install Framer Motion for animations
- [ ] Install MDX dependencies (@next/mdx, @mdx-js/loader, @mdx-js/react)
- [ ] Install code syntax highlighting (Prism.js or Shiki)
- [ ] Install date manipulation library (date-fns or dayjs)

### 1.3 Project Structure
```
src/
├── app/
│   ├── (main)/
│   │   ├── page.tsx (landing/about)
│   │   ├── blog/
│   │   │   ├── page.tsx (blog list)
│   │   │   └── [slug]/
│   │   │       └── page.tsx (blog post)
│   │   └── fun/
│   │       └── page.tsx (fun gallery)
│   ├── globals.css
│   ├── layout.tsx
│   └── providers.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── layout/
│   ├── blog/
│   ├── fun/
│   └── common/
├── content/
│   ├── blog/
│   └── fun/
├── lib/
├── hooks/
├── types/
└── utils/
```

## 2. Theming System

### 2.1 Theme Configuration
- [ ] Set up CSS variables for light/dark themes
- [ ] Configure shadcn-ui theme colors (gray-based with accent colors)
- [ ] Implement theme provider with system preference detection
- [ ] Create theme toggle component with smooth transitions

### 2.2 Theme Features
- [ ] Light theme (modern, minimalistic, gray-based)
- [ ] Dark theme (complementary dark design)
- [ ] System preference following
- [ ] Theme persistence in localStorage
- [ ] Smooth theme transition animations

## 3. Layout and Navigation

### 3.1 Main Layout
- [ ] Create responsive top navigation bar
- [ ] Implement mobile-friendly navigation (hamburger menu)
- [ ] Add theme toggle to navigation
- [ ] Design footer with appropriate links

### 3.2 Navigation Structure
- [ ] Home/About page navigation
- [ ] Blog page navigation
- [ ] Fun page navigation
- [ ] Smooth page transitions with Framer Motion

## 4. Landing/About Page

### 4.1 Core Content
- [ ] Hero section with profile photo and introduction
- [ ] Basic information display (name, title, location, etc.)
- [ ] Professional summary or bio section
- [ ] Contact information or social links

### 4.2 Interactive Elements
- [ ] Rounded profile photo with hover effects
- [ ] Easter egg: click counter (5 clicks in 3 seconds)
- [ ] Random game quote display in chat bubble
- [ ] Smooth animations for page elements

### 4.3 Game Quotes Database
- [ ] Create quotes database (StarCraft II, WarCraft units)
- [ ] Implement random quote selection
- [ ] Design chat bubble component with animations

## 5. Blog System

### 5.1 Content Management
- [ ] Set up MDX configuration for blog posts
- [ ] Create blog post frontmatter schema (title, summary, tags, date, etc.)
- [ ] Implement blog post parsing and metadata extraction
- [ ] Create content validation utilities

### 5.2 Blog List Page
- [ ] Design blog post card component
- [ ] Implement infinite scroll/pagination
- [ ] Sort posts by date (newest first)
- [ ] Add "end of content" indicator

### 5.3 Search and Filtering
- [ ] Create collapsible sidebar for filters
- [ ] Implement search by title, summary, keywords
- [ ] Add multi-select tag filtering
- [ ] Create date range filter (created time)
- [ ] Optional: full-text content search
- [ ] Implement filter state management

### 5.4 Blog Post Display
- [ ] Create MDX blog post template
- [ ] Implement code syntax highlighting
- [ ] Add reading time estimation
- [ ] Create table of contents generation
- [ ] Add navigation between posts

### 5.5 AI Content Attribution
- [ ] Design component for AI-assisted content disclosure
- [ ] Add frontmatter field for AI assistance flag
- [ ] Create visual indicator for AI-assisted posts

### 5.6 GitHub Integration
- [ ] Add "Report Issue" button to blog posts
- [ ] Generate GitHub issue links with pre-filled content
- [ ] Include post metadata in issue template

## 6. Fun Gallery Page

### 6.1 Content Structure
- [ ] Set up MDX structure for fun content
- [ ] Create photo gallery component
- [ ] Design casual/relaxed layout
- [ ] Implement responsive image handling

### 6.2 Content Categories
- [ ] Travel/trips section
- [ ] Hiking adventures
- [ ] Gaming content
- [ ] Server projects
- [ ] Other hobbies

### 6.3 Gallery Features
- [ ] Photo lightbox/modal view
- [ ] Image lazy loading
- [ ] Responsive grid layout
- [ ] Smooth hover animations

## 7. MDX and Content Styling

### 7.1 MDX Configuration
- [ ] Set up MDX with custom components
- [ ] Create custom heading components with anchor links
- [ ] Implement custom code block styling
- [ ] Add image optimization for MDX

### 7.2 Code Styling
- [ ] Configure syntax highlighting themes
- [ ] Create theme-aware code blocks
- [ ] Add copy-to-clipboard functionality
- [ ] Implement line number display

### 7.3 Content Components
- [ ] Custom callout/admonition components
- [ ] Image gallery components for MDX
- [ ] Video embed components
- [ ] Code playground/demo components

## 8. Animations and Transitions

### 8.1 Page Transitions
- [ ] Implement smooth page-to-page transitions
- [ ] Add component mount/unmount animations
- [ ] Create loading states with animations
- [ ] Add scroll-triggered animations

### 8.2 Interactive Animations
- [ ] Hover effects for interactive elements
- [ ] Button press animations
- [ ] Card hover animations
- [ ] Smooth theme transition animations

### 8.3 Performance Considerations
- [ ] Optimize animations for mobile devices
- [ ] Implement reduced motion preferences
- [ ] Ensure animations don't impact Core Web Vitals

## 9. Mobile Responsiveness

### 9.1 Responsive Design
- [ ] Implement mobile-first design approach
- [ ] Test on various screen sizes
- [ ] Optimize touch interactions
- [ ] Ensure readable font sizes on mobile

### 9.2 Mobile-Specific Features
- [ ] Touch-friendly navigation
- [ ] Optimized image loading for mobile
- [ ] Appropriate spacing for touch targets
- [ ] Mobile-optimized animations

## 10. Browser Compatibility

### 10.1 Target Browsers
- [ ] Test on Chrome (desktop/mobile)
- [ ] Test on Safari (desktop/mobile)
- [ ] Ensure CSS Grid/Flexbox compatibility
- [ ] Test JavaScript features across browsers

### 10.2 Progressive Enhancement
- [ ] Ensure graceful degradation
- [ ] Add fallbacks for unsupported features
- [ ] Test with JavaScript disabled
- [ ] Optimize for various network conditions

## 11. Performance Optimization

### 11.1 Core Web Vitals
- [ ] Optimize Largest Contentful Paint (LCP)
- [ ] Minimize First Input Delay (FID)
- [ ] Reduce Cumulative Layout Shift (CLS)
- [ ] Implement proper image optimization

### 11.2 Loading Performance
- [ ] Implement code splitting
- [ ] Add image lazy loading
- [ ] Optimize bundle size
- [ ] Use Next.js Image component optimally

## 12. SEO and Metadata

### 12.1 Meta Tags
- [ ] Implement dynamic meta tags for blog posts
- [ ] Add Open Graph tags
- [ ] Create Twitter Card metadata
- [ ] Add structured data markup

### 12.2 SEO Features
- [ ] Generate sitemap.xml
- [ ] Create robots.txt
- [ ] Implement canonical URLs
- [ ] Add RSS feed for blog

## 13. Deployment and CI/CD

### 13.1 GitHub Pages Setup
- [ ] Configure Next.js for static export
- [ ] Set up GitHub Actions for automated deployment
- [ ] Configure custom domain (about.ziangren.com)
- [ ] Test deployment pipeline

### 13.2 Development Workflow
- [ ] Set up development scripts
- [ ] Configure preview deployments
- [ ] Add build verification checks
- [ ] Implement automated testing

## 14. Testing and Quality Assurance

### 14.1 Testing Setup
- [ ] Set up Jest for unit testing
- [ ] Configure React Testing Library
- [ ] Add Cypress for E2E testing
- [ ] Implement accessibility testing

### 14.2 Quality Checks
- [ ] Lighthouse performance audits
- [ ] Accessibility compliance (WCAG)
- [ ] Cross-browser testing
- [ ] Mobile device testing

## 15. Content Migration and Launch

### 15.1 Content Preparation
- [ ] Migrate existing content to new format
- [ ] Create initial blog posts
- [ ] Prepare fun page content
- [ ] Optimize all images

### 15.2 Launch Checklist
- [ ] Final testing across all browsers
- [ ] Performance audit
- [ ] SEO verification
- [ ] Analytics setup (optional)
- [ ] Domain configuration
- [ ] Launch announcement

## Technology Stack Summary

**Core Framework:** Next.js 14+ with TypeScript
**Styling:** Tailwind CSS + shadcn-ui components
**Content:** MDX with custom components
**Animations:** Framer Motion
**Code Highlighting:** Prism.js or Shiki
**Icons:** Lucide React (included with shadcn-ui)
**Deployment:** GitHub Pages with GitHub Actions
**Testing:** Jest + React Testing Library + Cypress

## Timeline Estimate

- **Week 1-2:** Project setup, theming, and basic layout
- **Week 3-4:** Landing page and navigation implementation
- **Week 5-6:** Blog system development
- **Week 7:** Fun gallery page
- **Week 8:** Polish, testing, and deployment

This implementation plan provides a comprehensive roadmap for building your revamped personal website while maintaining the modern, minimalistic design aesthetic you're looking for.