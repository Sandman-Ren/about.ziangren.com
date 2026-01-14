/**
 * Blog Content Registry
 *
 * This module provides a centralized way to import and access MDX blog content.
 * All blog posts are imported statically to work with Next.js static export.
 *
 * When adding a new blog post:
 * 1. Create the MDX file in src/content/blog/[slug].mdx
 * 2. Import it here and add it to the contentMap
 * 3. Add metadata to public/blog-registry.json
 */

import { ComponentType } from 'react'

// Import all MDX content files
import TypographyShowcase from './typography-showcase.mdx'
import BuildingMyOwnServer from './building-my-own-server.mdx'
import WelcomeToMyNewBlog from './welcome-to-my-new-blog.mdx'
import BuildingModernReactTypescript from './building-modern-react-typescript.mdx'
import MyCsJourney from './my-cs-journey.mdx'

/**
 * Map of slug to MDX component
 * Each entry should match a slug in blog-registry.json
 */
export const contentMap: Record<string, ComponentType> = {
  'typography-showcase': TypographyShowcase,
  'building-my-own-server': BuildingMyOwnServer,
  'welcome-to-my-new-blog': WelcomeToMyNewBlog,
  'building-modern-react-typescript': BuildingModernReactTypescript,
  'my-cs-journey': MyCsJourney,
}

/**
 * Get the MDX content component for a given slug
 * @param slug - The blog post slug
 * @returns The MDX component or undefined if not found
 */
export function getBlogContent(slug: string): ComponentType | undefined {
  return contentMap[slug]
}

/**
 * Check if content exists for a given slug
 * @param slug - The blog post slug
 * @returns Whether content exists for the slug
 */
export function hasContent(slug: string): boolean {
  return slug in contentMap
}

/**
 * Get all available content slugs
 * @returns Array of slugs that have content
 */
export function getContentSlugs(): string[] {
  return Object.keys(contentMap)
}
