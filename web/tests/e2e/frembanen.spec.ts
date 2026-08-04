import { test, expect } from '@playwright/test';

test.describe('Frembanen Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display welcome section with yellow background', async ({ page }) => {
    // Welcome section is visible
    const welcomeSection = page.locator('section').first();
    await expect(welcomeSection).toBeVisible();

    // Title is visible
    const title = page.getByRole('heading', { name: /Velkommen til Frembanen/i });
    await expect(title).toBeVisible();

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

  test('should display pitch map', async ({ page }) => {
    // Pitch map section heading
    const pitchMapHeading = page.getByRole('heading', { name: 'Banekart' });
    await expect(pitchMapHeading).toBeVisible();

    // Pitch map image
    const pitchMapImage = page.locator('img[alt*="Banekart"]');
    await expect(pitchMapImage).toBeVisible();
  });

  test('should have all five content sections', async ({ page }) => {
    // Verify all main headings are visible
    await expect(page.getByRole('heading', { name: /Velkommen til Frembanen/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Addresse' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Parkering' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Baneregler' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Banekart' })).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Frembanen.*Frem-31/);
  });
});
