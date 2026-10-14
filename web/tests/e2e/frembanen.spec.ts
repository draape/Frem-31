import { test, expect } from '@playwright/test';

test.describe('Frembanen Page', () => {
  test.beforeEach(async ({ page }) => {
    // Explicit route: `/` depends on NEXT_PUBLIC_ENABLE_HOME_PAGE.
    await page.goto('/frembanen');
  });

  test('should display page header and welcome text', async ({ page }) => {
    // Page title
    await expect(page.getByRole('heading', { level: 1, name: 'Frembanen' })).toBeVisible();

    // Description under the title
    await expect(
      page.getByText('Velkommen til Frembanen, trenings- og kampanlegget til Frem-31.')
    ).toBeVisible();

    // Body text with link to calendar (use specific text)
    const calendarLink = page.getByRole('link', { name: 'banekalenderen' });
    await expect(calendarLink).toBeVisible();
  });

  test('should display address section with Google Maps', async ({ page }) => {
    // Address section heading
    const addressHeading = page.getByRole('heading', { name: 'Addresse' });
    await expect(addressHeading).toBeVisible();

    // Address text
    const addressText = page.getByText('Nordraaks vei 67');
    await expect(addressText).toBeVisible();

    // Google Maps iframe
    const mapIframe = page.locator('iframe[title="Kart over Frembanen"]');
    await expect(mapIframe).toBeVisible();
    await expect(mapIframe).toHaveAttribute('loading', 'lazy');
  });

  test('should display parking section with rules', async ({ page }) => {
    // Parking section heading
    const parkingHeading = page.getByRole('heading', { name: 'Parkering' });
    await expect(parkingHeading).toBeVisible();

    // At least one parking rule is visible
    const parkingRule = page.getByText('benytte parkeringsmulighetene');
    await expect(parkingRule).toBeVisible();
  });

  test('should display rules section with prohibited activities', async ({ page }) => {
    // Rules section heading
    const rulesHeading = page.getByRole('heading', { name: 'Baneregler' });
    await expect(rulesHeading).toBeVisible();

    // At least one rule is visible
    const prohibitedItem = page.getByText('Hunder – av hygieniske grunner');
    await expect(prohibitedItem).toBeVisible();
  });

  test('should have all content sections', async ({ page }) => {
    // Verify all main headings are visible
    await expect(page.getByRole('heading', { level: 1, name: 'Frembanen' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Addresse' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Parkering' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Baneregler' })).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Frembanen.*Frem-31/);
  });
});
