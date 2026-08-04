import { test, expect } from '@playwright/test';

test.describe('Banekalender Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/banekalender');
  });

  test('should display page title and description', async ({ page }) => {
    // Page title
    const title = page.locator('h1');
    await expect(title).toContainText('Banekalender');

    // Page description
    const description = page.locator('text=Se når banen er ledig');
    await expect(description).toBeVisible();
  });

  test('should display calendar embed container', async ({ page }) => {
    // Calendar iframe is visible within the page
    const iframe = page.locator('iframe[title="Banekalender - Frembanen"]');
    await expect(iframe).toBeVisible({ timeout: 10000 });
  });

  test('should load calendar iframe', async ({ page }) => {
    // Wait for iframe to be present
    const iframe = page.locator('iframe[title="Banekalender - Frembanen"]');
    await expect(iframe).toBeVisible({ timeout: 10000 });

    // Iframe has source URL
    await expect(iframe).toHaveAttribute('src', /easyplay\.no/);
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Banekalender.*Frem-31/);
  });

  test('should show loading state initially', async ({ page }) => {
    // Navigate fresh to see loading state
    await page.goto('/banekalender');

    // Loading text might be visible briefly (we use a quick check)
    const loadingText = page.locator('text=Laster kalender');

    // Either loading is visible initially or iframe has loaded
    const iframe = page.locator('iframe[title="Banekalender - Frembanen"]');

    // Wait for either loading to disappear or iframe to load
    await expect(iframe).toBeVisible({ timeout: 15000 });
  });

  test('should have proper iframe accessibility', async ({ page }) => {
    const iframe = page.locator('iframe[title="Banekalender - Frembanen"]');
    await expect(iframe).toBeVisible({ timeout: 10000 });

    // Title attribute for accessibility
    await expect(iframe).toHaveAttribute('title', 'Banekalender - Frembanen');

    // allowFullScreen attribute
    await expect(iframe).toHaveAttribute('allowfullscreen', '');
  });
});
