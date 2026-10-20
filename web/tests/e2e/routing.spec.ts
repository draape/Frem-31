import { test, expect } from '@playwright/test';

// /frembanen and /banekalender are Sanity pages served by the [[...slug]]
// catch-all; /ui is the one hand-written route it must not shadow.
test.describe('Routing with the Sanity catch-all', () => {
  test('/frembanen renders from Sanity', async ({ page }) => {
    await page.goto('/frembanen');

    await expect(page.getByRole('heading', { level: 1, name: 'Frembanen' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'banekalenderen' })).toBeVisible();
  });

  test('/banekalender renders from Sanity with the calendar', async ({ page }) => {
    await page.goto('/banekalender');

    await expect(page.getByRole('heading', { level: 1, name: /Banekalender/i })).toBeVisible();
    await expect(page.locator('iframe[title="Banekalender - Frembanen"]')).toBeVisible({
      timeout: 10000,
    });
  });

  test('/ui renders the hand-written component sandbox', async ({ page }) => {
    await page.goto('/ui');

    await expect(page.getByRole('heading', { name: /Component sandbox/ })).toBeVisible();
  });

  test('an unknown path returns 404', async ({ page }) => {
    const response = await page.goto('/this-path-does-not-exist-gh3');

    expect(response?.status()).toBe(404);
  });

  // Holds with NEXT_PUBLIC_ENABLE_HOME_PAGE on or off.
  test('/ resolves to the home page or redirects to /frembanen', async ({ page }) => {
    const response = await page.goto('/');

    expect(response?.ok()).toBe(true);
    await expect(page).toHaveURL(/\/(frembanen)?$/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });
});
