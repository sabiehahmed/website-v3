# Test info

- Name: should navigate to the home page and check title
- Location: /app/e2e/example.spec.ts:3:5

# Error details

```
Error: browserType.launch: 
╔══════════════════════════════════════════════════════╗
║ Host system is missing dependencies to run browsers. ║
║ Missing libraries:                                   ║
║     libwebpdemux.so.2                                ║
║     libavif.so.16                                    ║
║     libharfbuzz-icu.so.0                             ║
║     libwebpmux.so.3                                  ║
╚══════════════════════════════════════════════════════╝
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 |
> 3 | test('should navigate to the home page and check title', async ({ page }) => {
    |     ^ Error: browserType.launch: 
  4 |   await page.goto('/');
  5 |   // Replace 'Sabieh Ahmed' with the actual title from lib/config.ts if different
  6 |   await expect(page).toHaveTitle(/Sabieh Ahmed/);
  7 | });
  8 |
```