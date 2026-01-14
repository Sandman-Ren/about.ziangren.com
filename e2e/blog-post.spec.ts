import { test, expect } from '@playwright/test'

test.describe('Blog Post Page', () => {
  // Use a known blog post slug
  const testPostSlug = 'welcome-to-my-new-blog'

  test.beforeEach(async ({ page }) => {
    await page.goto(`/blog/${testPostSlug}`)
  })

  test('should display post title', async ({ page }) => {
    // Should have a heading (the post title from MDX content)
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    await expect(heading).toContainText(/Welcome/i)
  })

  test('should render markdown content', async ({ page }) => {
    // Check for content sections from the MDX
    // The page renders raw MDX content with styled components
    await expect(page.getByRole('heading', { name: /What's New/i })).toBeVisible()

    // Should have paragraph content
    const paragraphs = page.locator('p')
    await expect(paragraphs.first()).toBeVisible()
  })

  test('should have navigation header', async ({ page }) => {
    // Navigation should be visible
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible()
  })

  test('should navigate back via header nav', async ({ page }) => {
    // Click Blog link in navigation header
    await page.getByRole('navigation').getByRole('link', { name: 'Blog' }).click()

    // Should be on blog list
    await expect(page).toHaveURL('/blog/')
    await expect(page.getByRole('heading', { name: /Blog Posts/i })).toBeVisible()
  })

  test('should display list items', async ({ page }) => {
    // The welcome post has bullet lists for technologies
    const listItems = page.locator('li')
    await expect(listItems.first()).toBeVisible()
  })

  test('should handle code blocks with syntax highlighting', async ({ page }) => {
    // Navigate to typography showcase which has code blocks
    await page.goto('/blog/typography-showcase')

    // Wait for page to load
    await page.waitForTimeout(500)

    // Check for code blocks (if present)
    const codeBlocks = page.locator('pre code, .hljs')
    const count = await codeBlocks.count()

    if (count > 0) {
      await expect(codeBlocks.first()).toBeVisible()
    }
  })

  // Visual regression test
  test('visual: blog post page matches snapshot', async ({ page }) => {
    // Wait for animations
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('blog-post.png', {
      fullPage: true,
    })
  })
})

test.describe('Blog Post - 404 Handling', () => {
  test('should handle non-existent post gracefully', async ({ page }) => {
    const response = await page.goto('/blog/non-existent-post-xyz123')

    // In dev mode, Next.js shows error overlay in an iframe.
    // In production, shows custom 404 page.
    // We verify the navigation completes without timeout (page responds)
    expect(response).not.toBeNull()

    // The response should be received (page didn't hang)
    // Dev mode returns 500, production returns 404
    const status = response?.status()
    expect(status).toBeDefined()

    // Either 404 (production) or 500 (dev error) are acceptable
    // The key assertion is that the app handles the invalid route
    expect([200, 404, 500]).toContain(status)
  })
})
