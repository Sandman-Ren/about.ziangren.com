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
      const mdxPath = path.join(OUTPUT_DIR, `${file.slug}.mdx`)
      fs.writeFileSync(mdxPath, content.trim(), 'utf-8')
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

  console.log('\n✨ Import complete!\n')

  return { posts, slugs: publishedSlugs, collections }
}

// Run the script
processNotes()
