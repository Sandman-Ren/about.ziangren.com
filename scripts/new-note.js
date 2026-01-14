#!/usr/bin/env node

/**
 * new-note.js - Create a new blog post template
 *
 * Usage: npm run new-note my-post-slug
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const CONTENT_DIR = path.join(__dirname, '..', 'content')

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getToday() {
  return new Date().toISOString().split('T')[0]
}

function createTemplate(slug) {
  const title = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return `---
title: ${title}
summary: ""
date: ${getToday()}
tags: []
keywords: []
published: false
featured: false
aiAssisted: false
author: Ziang Ren
---

# ${title}

Start writing your content here...
`
}

function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.error('Usage: npm run new-note <slug>')
    console.error('Example: npm run new-note my-awesome-post')
    process.exit(1)
  }

  const slug = slugify(args[0])
  const filePath = path.join(CONTENT_DIR, `${slug}.md`)

  // Ensure content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true })
  }

  // Check if file already exists
  if (fs.existsSync(filePath)) {
    console.error(`Error: File already exists: ${filePath}`)
    process.exit(1)
  }

  // Create the file
  const template = createTemplate(slug)
  fs.writeFileSync(filePath, template, 'utf-8')

  console.log(`✅ Created new note: ${filePath}`)
  console.log('')
  console.log('Next steps:')
  console.log(`  1. Edit ${filePath}`)
  console.log('  2. Set published: true when ready')
  console.log('  3. Run: npm run import-notes')
}

main()
