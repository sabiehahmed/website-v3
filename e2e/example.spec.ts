import { test, expect } from '@playwright/test';

test('should navigate to the home page and check title', async ({ page }) => {
  await page.goto('/');
  // Replace 'Sabieh Ahmed' with the actual title from lib/config.ts if different
  await expect(page).toHaveTitle(/Sabieh Ahmed/);
});
