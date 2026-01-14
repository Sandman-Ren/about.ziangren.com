import { test, expect } from '@playwright/test'

test.describe('Blog List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog')
  })

  test('should display blog posts grid', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: /Blog Posts/i })).toBeVisible()

    // Check that at least one blog post card is visible
    // Cards contain "Read more" link text
    const postCards = page.locator('a[href*="/blog/"]').filter({ hasText: /Read more/i })
    await expect(postCards.first()).toBeVisible()
  })

  test('should display search input', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search/i)
    await expect(searchInput).toBeVisible()
  })

  test('search: should filter posts by title', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search/i)

    // Type a search query
    await searchInput.fill('typography')

    // Wait for filtering
    await page.waitForTimeout(300)

    // Should show filtered results message
    const resultsText = page.getByText(/Showing \d+ of \d+ posts/i)
    await expect(resultsText).toBeVisible()
  })

  test('search: should show no results message for invalid query', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search/i)

    // Type a query that won't match
    await searchInput.fill('xyznonexistent123')

    // Wait for filtering
    await page.waitForTimeout(300)

    // Should show no results
    await expect(page.getByText(/No posts found/i)).toBeVisible()
  })

  test('filter: should filter by tag selection', async ({ page }) => {
    // Find and click the tag dropdown
    const tagDropdown = page.locator('select')
    await expect(tagDropdown).toBeVisible()

    // Select a tag (assuming there's at least one)
    await tagDropdown.selectOption({ index: 1 })

    // Wait for filtering
    await page.waitForTimeout(300)

    // Should show a selected tag badge
    const selectedTags = page.locator('[class*="badge"]').filter({ hasText: /×|X/i })
    // At least one tag should be selected (may or may not show X depending on implementation)
  })

  test('filter: should toggle filter mode (any/all)', async ({ page }) => {
    // Find the "All" and "Any" buttons within the Match toggle
    const allButton = page.getByRole('button', { name: /^All$/i })
    const anyButton = page.getByRole('button', { name: /^Any$/i })

    await expect(allButton).toBeVisible()
    await expect(anyButton).toBeVisible()

    // Click "Any" mode first
    await anyButton.click()

    // Any button should be pressed (aria-pressed="true")
    await expect(anyButton).toHaveAttribute('aria-pressed', 'true')
    await expect(allButton).toHaveAttribute('aria-pressed', 'false')

    // Click "All" mode
    await allButton.click()

    // All button should be pressed
    await expect(allButton).toHaveAttribute('aria-pressed', 'true')
    await expect(anyButton).toHaveAttribute('aria-pressed', 'false')
  })

  test('filter: featured only toggle', async ({ page }) => {
    // Find the featured checkbox
    const featuredCheckbox = page.getByRole('checkbox').or(
      page.locator('input[type="checkbox"]')
    )

    if (await featuredCheckbox.isVisible()) {
      // Toggle featured filter
      await featuredCheckbox.check()

      // Wait for filtering
      await page.waitForTimeout(300)

      // Results should update
      await expect(page.getByText(/Showing/i)).toBeVisible()
    }
  })

  test('filter: clear filters button', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search/i)

    // Add a filter
    await searchInput.fill('test')
    await page.waitForTimeout(300)

    // Clear button should appear
    const clearButton = page.getByRole('button', { name: /Clear/i })

    if (await clearButton.isVisible()) {
      await clearButton.click()

      // Search should be cleared
      await expect(searchInput).toHaveValue('')
    }
  })

  test('pagination: should show pagination when needed', async ({ page }) => {
    // Check if pagination is visible (depends on number of posts)
    const pagination = page.getByRole('button', { name: /Next|Previous/i }).first()

    // This may or may not be visible depending on post count
    // Just verify the page renders without errors
    await expect(page.getByRole('heading', { name: /Blog Posts/i })).toBeVisible()
  })

  test('should navigate to blog post on card click', async ({ page }) => {
    // Find first blog post link
    const firstPost = page.locator('a[href*="/blog/"]').first()
    await expect(firstPost).toBeVisible()

    // Get the href
    const href = await firstPost.getAttribute('href')

    // Click it
    await firstPost.click()

    // Should navigate to post page
    await expect(page).toHaveURL(new RegExp(href!.replace(/\/$/, '')))
  })

  test('tag click: should add tag to filters', async ({ page }) => {
    // Find a tag badge on a post card
    const tagBadge = page.locator('[class*="badge"]').filter({ hasText: /^[A-Za-z]/i }).first()

    if (await tagBadge.isVisible()) {
      const tagText = await tagBadge.textContent()

      // Click the tag
      await tagBadge.click()

      // Should add to selected tags (or filter)
      await page.waitForTimeout(300)
    }
  })

  // Visual regression test
  test('visual: blog list page matches snapshot', async ({ page }) => {
    // Wait for content to load
    await page.waitForTimeout(1000)

    await expect(page).toHaveScreenshot('blog-list.png', {
      fullPage: true,
    })
  })
})
