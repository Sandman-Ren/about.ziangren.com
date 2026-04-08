#!/usr/bin/env node

/**
 * import-notes.js - Process markdown notes and import into Next.js blog
 *
 * This script:
 * 1. Scans content/*.md files
 * 2. Parses YAML frontmatter
 * 3. Filters published posts
 * 4. Copies content to src/content/blog/*.mdx
 * 5. Generates public/blog-registry.json
 * 6. Generates src/content/blog/slugs.ts
 * 7. Reads content/collections.yaml
 * 8. Generates public/collections-registry.json
 * 9. Generates src/content/blog/collection-slugs.ts
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import yaml from 'js-yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.join(__dirname, '..')
const CONTENT_DIR = path.join(ROOT_DIR, 'content')
const OUTPUT_DIR = path.join(ROOT_DIR, 'src', 'content', 'blog')
const REGISTRY_PATH = path.join(ROOT_DIR, 'public', 'blog-registry.json')
const COLLECTIONS_PATH = path.join(CONTENT_DIR, 'collections.yaml')
const COLLECTIONS_REGISTRY_PATH = path.join(ROOT_DIR, 'public', 'collections-registry.json')
const LLMS_TXT_PATH = path.join(ROOT_DIR, 'public', 'llms.txt')
const LLMS_FULL_TXT_PATH = path.join(ROOT_DIR, 'public', 'llms-full.txt')
const FEED_XML_PATH = path.join(ROOT_DIR, 'public', 'feed.xml')
const SITE_URL = 'https://about.ziangren.com'

/**
 * Ensure a directory exists
 */
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

/**
 * Get all markdown files from content directory
 */
function getMarkdownFiles() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn(`Warning: Content directory not found: ${CONTENT_DIR}`)
    return []
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter(file => file.endsWith('.md') && !file.startsWith('_'))
    .map(file => ({
      slug: file.replace('.md', ''),
      path: path.join(CONTENT_DIR, file),
    }))
}

/**
 * Parse a markdown file and extract frontmatter + content
 */
function parseMarkdownFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(fileContent)
  return { frontmatter, content }
}

/**
 * Calculate reading time from content
 */
function calculateReadingTime(content) {
  const stats = readingTime(content)
  return Math.ceil(stats.minutes)
}

/**
 * Validate frontmatter has required fields
 */
function validateFrontmatter(frontmatter, slug) {
  const required = ['title', 'date', 'summary']
  const missing = required.filter(field => !frontmatter[field])

  if (missing.length > 0) {
    console.warn(`Warning: ${slug}.md is missing required fields: ${missing.join(', ')}`)
    return false
  }

  return true
}

/**
 * Load collection definitions from collections.yaml
 * Returns an object map of slug → { title, description, ordered }
 */
function loadCollections() {
  if (!fs.existsSync(COLLECTIONS_PATH)) {
    return {}
  }
  const fileContent = fs.readFileSync(COLLECTIONS_PATH, 'utf-8')
  return yaml.load(fileContent) || {}
}

/**
 * Build the collections registry from collection definitions and published posts
 */
function buildCollectionsRegistry(collectionDefs, posts) {
  const collections = []
  const referencedCollections = new Set()

  // Track which collections are referenced by posts
  for (const post of posts) {
    if (post.collection) {
      referencedCollections.add(post.collection)
      if (!collectionDefs[post.collection]) {
        console.warn(`  ⚠️  Warning: Post "${post.slug}" references undefined collection "${post.collection}"`)
      }
    }
  }

  for (const [slug, def] of Object.entries(collectionDefs)) {
    const collectionPosts = posts.filter(p => p.collection === slug)

    if (collectionPosts.length === 0) {
      console.warn(`  ⚠️  Warning: Collection "${slug}" has no published posts`)
      continue
    }

    // Sort by episode (ordered) or date (unordered)
    if (def.ordered) {
      // Validate episode numbers
      const episodes = collectionPosts.map(p => p.episode).filter(e => e != null)
      const duplicates = episodes.filter((e, i) => episodes.indexOf(e) !== i)
      if (duplicates.length > 0) {
        console.warn(`  ⚠️  Warning: Collection "${slug}" has duplicate episode numbers: ${duplicates.join(', ')}`)
      }
      const missingEpisode = collectionPosts.filter(p => p.episode == null)
      if (missingEpisode.length > 0) {
        console.warn(`  ⚠️  Warning: Collection "${slug}" has posts without episode numbers: ${missingEpisode.map(p => p.slug).join(', ')}`)
      }
      collectionPosts.sort((a, b) => (a.episode ?? Infinity) - (b.episode ?? Infinity))
    } else {
      collectionPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    collections.push({
      slug,
      title: def.title,
      description: def.description || '',
      ordered: def.ordered || false,
      postSlugs: collectionPosts.map(p => p.slug),
    })
  }

  return collections
}

/**
 * Escape XML special characters
 */
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Generate llms.txt - site overview with links to all blog posts
 * Follows the llms.txt specification (https://llmstxt.org)
 */
function generateLlmsTxt(posts) {
  const lines = [
    '# Ziang Ren - Personal Website & Blog',
    '',
    '> Personal website and tech blog by Ziang Ren — Software Engineer, Blogger, and Tech Enthusiast. Topics include self-hosting, homelab, web development, TypeScript, Docker, DevOps, and AI agents.',
    '',
    '## Blog Posts',
    '',
  ]

  for (const post of posts) {
    lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug}/): ${post.summary}`)
  }

  lines.push('')
  lines.push('## Optional')
  lines.push('')
  lines.push(`- [Full blog content for LLMs](${SITE_URL}/llms-full.txt)`)
  lines.push(`- [RSS Feed](${SITE_URL}/feed.xml)`)
  lines.push(`- [Sitemap](${SITE_URL}/sitemap.xml)`)
  lines.push('')

  fs.writeFileSync(LLMS_TXT_PATH, lines.join('\n'), 'utf-8')
  console.log(`🤖 Generated public/llms.txt`)
}

/**
 * Generate llms-full.txt - full markdown content of all blog posts
 * Provides complete blog content in a single LLM-consumable file
 */
function generateLlmsFullTxt(posts, contentMap) {
  const lines = [
    '# Ziang Ren - Personal Website & Blog (Full Content)',
    '',
    '> Complete blog content for LLM consumption. See also: llms.txt for an overview.',
    '',
  ]

  for (const post of posts) {
    lines.push('---')
    lines.push('')
    lines.push(`# ${post.title}`)
    lines.push('')
    lines.push(`- **URL**: ${SITE_URL}/blog/${post.slug}/`)
    lines.push(`- **Date**: ${post.date}`)
    lines.push(`- **Author**: ${post.author}`)
    lines.push(`- **Tags**: ${post.tags.join(', ')}`)
    lines.push(`- **Reading time**: ${post.readingTime} min`)
    lines.push('')
    lines.push(`> ${post.summary}`)
    lines.push('')

    const content = contentMap[post.slug]
    if (content) {
      lines.push(content.trim())
    }

    lines.push('')
  }

  fs.writeFileSync(LLMS_FULL_TXT_PATH, lines.join('\n'), 'utf-8')
  console.log(`🤖 Generated public/llms-full.txt`)
}

/**
 * Generate feed.xml - RSS 2.0 feed for all blog posts
 */
function generateRssFeed(posts) {
  const now = new Date().toUTCString()

  const items = posts.map(post => {
    const pubDate = new Date(post.date).toUTCString()
    const categories = post.tags.map(tag => `      <category>${escapeXml(tag)}</category>`).join('\n')

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}/</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}/</guid>
      <description>${escapeXml(post.summary)}</description>
      <pubDate>${pubDate}</pubDate>
      <author>ziangren@example.com (${escapeXml(post.author)})</author>
${categories}
    </item>`
  }).join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ziang Ren - Blog</title>
    <link>${SITE_URL}/blog/</link>
    <description>Tech blog by Ziang Ren — self-hosting, homelab, web development, TypeScript, Docker, DevOps, and AI agents.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`

  fs.writeFileSync(FEED_XML_PATH, feed, 'utf-8')
  console.log(`📡 Generated public/feed.xml`)
}

/**
 * Process all notes and generate outputs
 */
function processNotes() {
  console.log('📝 Processing notes...\n')

  const files = getMarkdownFiles()
  console.log(`Found ${files.length} markdown files in content/\n`)

  if (files.length === 0) {
    console.log('No markdown files found. Creating empty outputs.')
  }

  const posts = []
  const publishedSlugs = []
  const contentMap = {} // slug → markdown content (for llms-full.txt)

  // Ensure output directory exists
  ensureDir(OUTPUT_DIR)

  // Clear existing MDX files in output directory
  const existingMdx = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.mdx'))
  for (const file of existingMdx) {
    fs.unlinkSync(path.join(OUTPUT_DIR, file))
  }

  for (const file of files) {
    const { frontmatter, content } = parseMarkdownFile(file.path)

    // Validate frontmatter
    if (!validateFrontmatter(frontmatter, file.slug)) {
      continue
    }

    // Calculate reading time
    const readingTimeMinutes = calculateReadingTime(content)

    // Build post metadata
    const post = {
      slug: file.slug,
      title: frontmatter.title,
      summary: frontmatter.summary || '',
      date: frontmatter.date instanceof Date
        ? frontmatter.date.toISOString().split('T')[0]
        : String(frontmatter.date),
      tags: frontmatter.tags || [],
      keywords: frontmatter.keywords || [],
      published: frontmatter.published !== false, // Default to true
      featured: frontmatter.featured || false,
      aiAssisted: frontmatter.aiAssisted || false,
      author: frontmatter.author || 'Ziang Ren',
      readingTime: readingTimeMinutes,
      collection: frontmatter.collection || null,
      episode: frontmatter.episode != null ? Number(frontmatter.episode) : null,
    }

    // Only process published posts
    if (post.published) {
      posts.push(post)
      publishedSlugs.push(file.slug)

      // Write MDX file (content without frontmatter)
      // Strip leading h1 if it matches the frontmatter title (avoids duplicate h1 on page)
      let mdxContent = content.trim()
      const h1Match = mdxContent.match(/^#\s+(.+)$/m)
      if (h1Match && mdxContent.startsWith(h1Match[0])) {
        mdxContent = mdxContent.slice(h1Match[0].length).trim()
      }
      const mdxPath = path.join(OUTPUT_DIR, `${file.slug}.mdx`)
      fs.writeFileSync(mdxPath, mdxContent, 'utf-8')
      contentMap[file.slug] = content.trim()
      console.log(`  ✅ ${file.slug}.md → src/content/blog/${file.slug}.mdx`)
    } else {
      console.log(`  ⏸️  ${file.slug}.md (unpublished, skipped)`)
    }
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Write blog registry
  const registry = { posts }
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(registry, null, 2), 'utf-8')
  console.log(`\n📚 Generated public/blog-registry.json (${posts.length} posts)`)

  // Write slugs.ts for generateStaticParams
  const slugsContent = `// Auto-generated by import-notes.js - DO NOT EDIT
export const slugs = ${JSON.stringify(publishedSlugs, null, 2)} as const

export type BlogSlug = (typeof slugs)[number]
`
  fs.writeFileSync(path.join(OUTPUT_DIR, 'slugs.ts'), slugsContent, 'utf-8')
  console.log(`📋 Generated src/content/blog/slugs.ts (${publishedSlugs.length} slugs)`)

  // Process collections
  const collectionDefs = loadCollections()
  const collections = buildCollectionsRegistry(collectionDefs, posts)

  // Write collections registry
  const collectionsRegistry = { collections }
  fs.writeFileSync(COLLECTIONS_REGISTRY_PATH, JSON.stringify(collectionsRegistry, null, 2), 'utf-8')
  console.log(`📂 Generated public/collections-registry.json (${collections.length} collections)`)

  // Write collection-slugs.ts for generateStaticParams
  const collectionSlugsList = collections.map(c => c.slug)
  const collectionSlugsContent = `// Auto-generated by import-notes.js - DO NOT EDIT
export const collectionSlugs = ${JSON.stringify(collectionSlugsList, null, 2)} as const

export type CollectionSlug = (typeof collectionSlugs)[number]
`
  fs.writeFileSync(path.join(OUTPUT_DIR, 'collection-slugs.ts'), collectionSlugsContent, 'utf-8')
  console.log(`📋 Generated src/content/blog/collection-slugs.ts (${collectionSlugsList.length} collection slugs)`)

  // Generate LLM and scraper-friendly files
  generateLlmsTxt(posts)
  generateLlmsFullTxt(posts, contentMap)
  generateRssFeed(posts)

  console.log('\n✨ Import complete!\n')

  return { posts, slugs: publishedSlugs, collections }
}

// Run the script
processNotes()
