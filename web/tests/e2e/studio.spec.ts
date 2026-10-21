import { test, expect } from '@playwright/test';

// The embedded Sanity Studio. Anything past the shell needs a Sanity login, so
// these only check the route itself: it serves, stays out of search engines and
// sits outside the site's header and footer (both render the site logo).
test.describe('Studio at /studio', () => {
  test('serves the Studio, noindexed and without site chrome', async ({ page }) => {
    const response = await page.goto('/studio');

    expect(response?.status()).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.locator('img[src*="logo.svg"]')).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Åpne meny' })).toHaveCount(0);
  });

  test('deep Studio URLs are served by the same route', async ({ page }) => {
    const response = await page.goto('/studio/structure');

    expect(response?.status()).toBe(200);
  });
});
