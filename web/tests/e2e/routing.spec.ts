import { test, expect } from '@playwright/test';

// The [[...slug]] catch-all must not shadow the hand-written routes.
test.describe('Routing with the Sanity catch-all', () => {
  test('/frembanen renders the hand-written page', async ({ page }) => {
    await page.goto('/frembanen');

    await expect(page.getByRole('heading', { level: 1, name: 'Frembanen' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'banekalenderen' })).toBeVisible();
  });

  test('/banekalender renders the hand-written calendar', async ({ page }) => {
    await page.goto('/banekalender');

    await expect(page.getByRole('heading', { level: 1, name: /Banekalender/i })).toBeVisible();
  });

  test('an unknown path returns 404', async ({ page }) => {
    const response = await page.goto('/this-path-does-not-exist-gh3');

    expect(response?.status()).toBe(404);
  });

  test('/ redirects to /frembanen while the home page flag is off', async ({ page }) => {
    test.skip(process.env.NEXT_PUBLIC_ENABLE_HOME_PAGE === 'true', 'home page flag is on');

    await page.goto('/');

    await expect(page).toHaveURL(/\/frembanen$/);
  });
});
