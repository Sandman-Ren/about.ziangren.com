import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display the hero section with profile', async ({ page }) => {
    // Check main heading
    await expect(page.getByRole('heading', { name: /Ziang Ren/i })).toBeVisible()

    // Check subtitle
    await expect(page.getByText(/Software Engineer/i)).toBeVisible()

    // Check avatar is present
    const avatar = page.locator('img[alt="Ziang Ren"]')
    await expect(avatar).toBeVisible()

    // Check skill badges are present
    await expect(page.getByText('TypeScript')).toBeVisible()
    await expect(page.getByText('React')).toBeVisible()
    await expect(page.getByText('Next.js')).toBeVisible()
  })

  test('should have working navigation links', async ({ page }) => {
    // Check GitHub link in hero section
    const githubLink = page.getByRole('main').getByRole('link', { name: /GitHub/i })
    await expect(githubLink).toBeVisible()
    await expect(githubLink).toHaveAttribute('href', /github\.com/)

    // Check LinkedIn link
    const linkedinLink = page.getByRole('main').getByRole('link', { name: /LinkedIn/i })
    await expect(linkedinLink).toBeVisible()
    await expect(linkedinLink).toHaveAttribute('href', /linkedin\.com/)
  })

  test('should navigate to blog page', async ({ page }) => {
    // Click Blog link in navigation
    await page.getByRole('link', { name: 'Blog' }).first().click()

    // Should be on blog page
    await expect(page).toHaveURL('/blog/')
    await expect(page.getByRole('heading', { name: /Blog Posts/i })).toBeVisible()
  })

  test('easter egg: should show quote after 5 rapid clicks on avatar', async ({ page }) => {
    // Find the avatar
    const avatar = page.locator('img[alt="Ziang Ren"]').first()
    await expect(avatar).toBeVisible()

    // Click 5 times rapidly (within the 3 second window)
    for (let i = 0; i < 5; i++) {
      await avatar.click({ delay: 100 })
    }

    // Wait for and check the quote bubble appears
    // The quotes are from Blizzard games
    const quoteBubble = page.locator('text=/My life for Aiur|You must construct|Nuclear launch|We require more|Carrier has arrived|Show me the money|Power overwhelming|Work complete|Jobs done|Ready to work|Zug zug|For the Horde/i')
    await expect(quoteBubble).toBeVisible({ timeout: 5000 })
  })

  test('easter egg: clicking again should cycle to next quote', async ({ page }) => {
    const avatar = page.locator('img[alt="Ziang Ren"]').first()

    // Activate easter egg
    for (let i = 0; i < 5; i++) {
      await avatar.click({ delay: 100 })
    }

    // Wait for bubble to appear
    await page.waitForTimeout(500)

    // Click again to cycle to next quote
    await avatar.click()

    // Bubble should still be visible (with potentially different text)
    const bubbleContainer = page.locator('.boogaloo-font')
    await expect(bubbleContainer).toBeVisible({ timeout: 3000 })
  })

  test('should toggle theme', async ({ page }) => {
    // Find theme toggle button by its accessible name
    const themeToggle = page.getByRole('button', { name: /Toggle theme/i })
    await expect(themeToggle).toBeVisible()

    // Theme cycles: system → light → dark → system
    // Click until we see dark mode (may need 1-3 clicks depending on initial state)
    const html = page.locator('html')

    // Keep clicking until we see dark mode or reach max attempts
    let foundDark = false
    for (let i = 0; i < 3 && !foundDark; i++) {
      await themeToggle.click()
      await page.waitForTimeout(300) // Wait for transition
      foundDark = await html.evaluate(el => el.classList.contains('dark'))
    }

    // We should have reached dark mode within 3 clicks
    expect(foundDark).toBe(true)

    // One more click should exit dark mode
    await themeToggle.click()
    await page.waitForTimeout(300)
    const stillDark = await html.evaluate(el => el.classList.contains('dark'))
    expect(stillDark).toBe(false)
  })

  // Visual regression test
  test('visual: home page matches snapshot', async ({ page }) => {
    // Wait for animations to settle
    await page.waitForTimeout(1000)

    // Take screenshot (excluding dynamic content)
    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
      mask: [
        // Mask avatar in case of loading differences
        page.locator('img[alt="Ziang Ren"]'),
      ],
    })
  })
})
