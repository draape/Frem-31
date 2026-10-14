import { test, expect } from '@playwright/test';

// These run on /frembanen, not /: it always uses the hardcoded legacy
// navigation, while / depends on NEXT_PUBLIC_ENABLE_HOME_PAGE and, when the
// flag is on, on siteSettings in the Sanity dataset.
test.describe('Navigation', () => {
  test('should display header with logo and navigation links', async ({ page }) => {
    await page.goto('/frembanen');

    // Header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Logo links to home and is named by its wordmark
    const logoLink = header.locator('a[href="/"]').first();
    await expect(logoLink).toBeVisible();
    await expect(header.getByRole('link', { name: /Frem-31/ }).first()).toBeVisible();

    // Logo image is decorative: the wordmark beside it carries the name
    await expect(logoLink.locator('img')).toHaveAttribute('alt', '');
  });

  test('should navigate home from the logo', async ({ page }) => {
    await page.goto('/banekalender');

    // Click the header logo (the footer has one too)
    await page.click('header a[href="/"]');

    // Lands on the home page, or on /frembanen while the home page flag is off
    await expect(page).toHaveURL(/\/(frembanen)?$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should navigate to Banekalender page', async ({ page }) => {
    await page.goto('/frembanen');

    // Click on Banekalender link
    await page.click('a[href="/banekalender"]');

    // Should be on banekalender page
    await expect(page).toHaveURL('/banekalender');

    // Calendar page content is visible
    const calendarTitle = page.locator('h1');
    await expect(calendarTitle).toContainText('Banekalender');
  });

  test('should display footer with navigation groups', async ({ page }) => {
    await page.goto('/frembanen');

    // Footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Navigation group headings are displayed
    await expect(footer.getByRole('heading', { name: 'Aktiviteter' })).toBeVisible();
    await expect(footer.getByRole('heading', { name: 'Klubben' })).toBeVisible();

    // Social link is present
    await expect(footer.locator('a[aria-label="Facebook"]')).toBeVisible();
  });

  test('should have working social links in footer', async ({ page }) => {
    await page.goto('/frembanen');

    // Facebook link
    const facebookLink = page.locator('a[aria-label="Facebook"]');
    await expect(facebookLink).toHaveAttribute('href', /facebook\.com/);
    await expect(facebookLink).toHaveAttribute('target', '_blank');
    await expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
