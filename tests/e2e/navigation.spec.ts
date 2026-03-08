import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should display header with logo and navigation links', async ({ page }) => {
    await page.goto('/');

    // Header is visible
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Logo is visible and links to home
    const logoLink = header.locator('a[href="/"]').first();
    await expect(logoLink).toBeVisible();

    // Logo image is present
    const logo = header.locator('img[alt="Sportsklubb Frem-31"]');
    await expect(logo).toBeVisible();
  });

  test('should navigate to Frembanen (home) page', async ({ page }) => {
    await page.goto('/banekalender');

    // Click on Frembanen link
    await page.click('a[href="/"]');

    // Should be on home page
    await expect(page).toHaveURL('/');

    // Home page content is visible
    const welcomeTitle = page.locator('text=Velkommen til Frembanen');
    await expect(welcomeTitle).toBeVisible();
  });

  test('should navigate to Banekalender page', async ({ page }) => {
    await page.goto('/');

    // Click on Banekalender link
    await page.click('a[href="/banekalender"]');

    // Should be on banekalender page
    await expect(page).toHaveURL('/banekalender');

    // Calendar page content is visible
    const calendarTitle = page.locator('h1');
    await expect(calendarTitle).toContainText('Banekalender');
  });

  test('should display footer with navigation groups', async ({ page }) => {
    await page.goto('/');

    // Footer is visible
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Club name heading is displayed
    await expect(footer.getByRole('heading', { name: 'Sportsklubb Frem-31' })).toBeVisible();

    // Social links are present
    await expect(footer.locator('a[aria-label="Facebook"]')).toBeVisible();
    await expect(footer.locator('a[aria-label="Instagram"]')).toBeVisible();

    // Copyright is displayed
    const currentYear = new Date().getFullYear();
    await expect(footer.getByText(`© ${currentYear}`)).toBeVisible();
  });

  test('should have working social links in footer', async ({ page }) => {
    await page.goto('/');

    // Facebook link
    const facebookLink = page.locator('a[aria-label="Facebook"]');
    await expect(facebookLink).toHaveAttribute('href', /facebook\.com/);
    await expect(facebookLink).toHaveAttribute('target', '_blank');
    await expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');

    // Instagram link
    const instagramLink = page.locator('a[aria-label="Instagram"]');
    await expect(instagramLink).toHaveAttribute('href', /instagram\.com/);
    await expect(instagramLink).toHaveAttribute('target', '_blank');
    await expect(instagramLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
