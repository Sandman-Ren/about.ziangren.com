import { test, expect } from '@playwright/test'

test.describe('Collections Index Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/collections')
  })

  test('should display collections page with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Collections/i })).toBeVisible()
  })

  test('should display collection cards', async ({ page }) => {
    // Should have at least one collection card
    const collectionLinks = page.locator('a[href*="/blog/collections/"]')
    await expect(collectionLinks.first()).toBeVisible()
  })

  test('should show collection titles and descriptions', async ({ page }) => {
    await expect(page.getByText('Homelab Journey')).toBeVisible()
    await expect(page.getByText('Modern Web Fundamentals')).toBeVisible()
  })

  test('should show post counts', async ({ page }) => {
    await expect(page.getByText('3-part series')).toBeVisible()
    await expect(page.getByText('2 posts')).toBeVisible()
  })

  test('should have back to blog link', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /Back to Blog/i })
    await expect(backLink).toBeVisible()
  })

  test('should navigate to collection detail page', async ({ page }) => {
    await page.getByText('Homelab Journey').click()
    await expect(page).toHaveURL(/\/blog\/collections\/homelab-journey/)
  })
})

test.describe('Collection Detail Page - Ordered', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/collections/homelab-journey')
  })

  test('should display collection title and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Homelab Journey/i })).toBeVisible()
    await expect(page.getByText(/self-hosted home server/i)).toBeVisible()
  })

  test('should show ordered episode list', async ({ page }) => {
    // Should show episode numbers 1, 2, 3
    const episodes = page.locator('a[href*="/blog/homelab-"]')
    await expect(episodes).toHaveCount(3)
  })

  test('should show episodes in correct order', async ({ page }) => {
    // Each episode link should contain the post title, in order
    const episodeLinks = page.locator('a[href*="/blog/homelab-"]')
    const count = await episodeLinks.count()
    expect(count).toBe(3)

    // First episode should be about hardware (episode 1)
    await expect(episodeLinks.nth(0)).toContainText('Hardware')
    // Second should be about OS (episode 2)
    await expect(episodeLinks.nth(1)).toContainText('OS')
    // Third should be about Docker Compose (episode 3)
    await expect(episodeLinks.nth(2)).toContainText('Docker Compose')
  })

  test('should have back to collections link', async ({ page }) => {
    const backLink = page.getByRole('link', { name: /Back to Collections/i })
    await expect(backLink).toBeVisible()
  })

  test('should navigate to individual post', async ({ page }) => {
    await page.locator('a[href*="/blog/homelab-choosing-hardware"]').click()
    await expect(page).toHaveURL(/\/blog\/homelab-choosing-hardware/)
  })
})

test.describe('Collection Detail Page - Unordered', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/collections/modern-web-fundamentals')
  })

  test('should display collection title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Modern Web Fundamentals/i })).toBeVisible()
  })

  test('should show posts in grid layout', async ({ page }) => {
    // Should show 2 posts
    const postLinks = page.locator('a[href*="/blog/understanding-css-grid"], a[href*="/blog/typescript-generics-guide"]')
    await expect(postLinks).toHaveCount(2)
  })
})

test.describe('In-Post Collection Navigation', () => {
  test('should show back links to blog and collection at top', async ({ page }) => {
    await page.goto('/blog/homelab-installing-proxmox')

    // Should have both "Blog" and collection back link buttons
    await expect(page.getByRole('link', { name: 'Blog', exact: true }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: 'Homelab Journey', exact: true }).first()).toBeVisible()
  })

  test('should show footer collection nav with episode info', async ({ page }) => {
    await page.goto('/blog/homelab-installing-proxmox')

    // Footer should show episode indicator
    await expect(page.getByText(/Episode 2 of 3/i)).toBeVisible()
  })

  test('should show prev/next cards for middle episode', async ({ page }) => {
    await page.goto('/blog/homelab-installing-proxmox')

    // Should have both prev and next cards in footer
    const footer = page.locator('footer')
    await expect(footer.getByText('Previous')).toBeVisible()
    await expect(footer.getByText('Next')).toBeVisible()
    await expect(footer.getByText(/Hardware/i).first()).toBeVisible()
    await expect(footer.getByText(/Docker Compose/i).first()).toBeVisible()
  })

  test('first episode should only have next card', async ({ page }) => {
    await page.goto('/blog/homelab-choosing-hardware')

    const footer = page.locator('footer')
    await expect(page.getByText(/Episode 1 of 3/i)).toBeVisible()
    await expect(footer.getByText('Next')).toBeVisible()
    await expect(footer.getByText('Previous')).not.toBeVisible()
  })

  test('last episode should only have previous card', async ({ page }) => {
    await page.goto('/blog/homelab-docker-compose-setup')

    const footer = page.locator('footer')
    await expect(page.getByText(/Episode 3 of 3/i)).toBeVisible()
    await expect(footer.getByText('Previous')).toBeVisible()
    await expect(footer.getByText('Next')).not.toBeVisible()
  })

  test('unordered collection should show sibling post cards', async ({ page }) => {
    await page.goto('/blog/understanding-css-grid')

    // Should show "Part of" in footer
    await expect(page.getByText(/Part of/i)).toBeVisible()

    // Should show the other post in the collection as a card
    await expect(page.getByText(/TypeScript Generics/i).first()).toBeVisible()
  })

  test('non-collection post should show plain back link', async ({ page }) => {
    await page.goto('/blog/welcome-to-my-new-blog')

    // Should have "Blog" back button
    await expect(page.getByRole('link', { name: 'Blog', exact: true }).first()).toBeVisible()

    // Should NOT have collection navigation in footer
    await expect(page.getByText(/Episode \d+ of \d+/i)).not.toBeVisible()
    await expect(page.getByText(/Part of/i)).not.toBeVisible()
  })
})

test.describe('Blog List - Collection Integration', () => {
  test('should show collection cards on blog list', async ({ page }) => {
    await page.goto('/blog')

    // Collection cards should be visible
    await expect(page.getByText('View collection').first()).toBeVisible()
    await expect(page.getByText('3-part series')).toBeVisible()
    await expect(page.getByText('2 posts').last()).toBeVisible()
  })

  test('should show series badge on collection posts', async ({ page }) => {
    await page.goto('/blog')

    // At least one "Series" badge should be visible
    const seriesBadges = page.getByText('Series', { exact: true })
    await expect(seriesBadges.first()).toBeVisible()
  })

  test('collection card should navigate to collection page', async ({ page }) => {
    await page.goto('/blog')

    await page.getByRole('link', { name: /3-part series Homelab Journey/i }).click()
    await expect(page).toHaveURL(/\/blog\/collections\/homelab-journey/)
  })
})
