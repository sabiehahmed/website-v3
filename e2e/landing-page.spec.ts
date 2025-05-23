import { test, expect, Page } from '@playwright/test';
import { config } from '../lib/config'; // Adjust path as necessary

const scrollDown = async (page: Page, pixels: number) => {
  await page.mouse.wheel(0, pixels);
  // Adding a small delay to allow animations/scroll effects to settle
  await page.waitForTimeout(1000); // Adjust timeout as needed for animations
};

const scrollToBottom = async (page: Page) => {
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000); // Adjust timeout as needed
}

test.describe('Landing Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
  });

  test('Test 1: Initial Page Load', async ({ page }) => {
    await expect(page).toHaveTitle(config.metadata.title);

    const introText = `${config.scrollContainer.introText.name} ${config.scrollContainer.introText.verb}`;
    await expect(page.getByText(introText, { exact: true })).toBeVisible();

    await expect(page.getByText(config.scrollContainer.animatedWords[0])).toBeVisible();

    // Check for first content box's description part
    // Assuming the first descriptionPart of the first contentBox is unique enough
    const firstContentBoxText = (config.scrollContainer.contentBoxes[0].descriptionParts[0] as { content: string }).content;
    await expect(page.getByText(firstContentBoxText, { exact: false })).toBeVisible();

    // Check for the presence of a Rive animation canvas element
    // This selector might need to be more specific if there are multiple canvases
    await expect(page.locator('.transition-all').first()).toBeVisible();
  });

  test('Test 2: Scroll-based Animations and Content Changes', async ({ page }) => {
    // Scroll to bring the second ContentBox into view
    // The amount to scroll will vary depending on screen size and content height.
    // This might need adjustment or a more robust way to scroll to a specific element.
    await scrollDown(page, 600); // Adjust scroll pixels as needed

    await expect(page.getByText(config.scrollContainer.animatedWords[1])).toBeVisible();
    const secondContentBoxText = (config.scrollContainer.contentBoxes[1].descriptionParts[0] as { content: string }).content;
    await expect(page.getByText(secondContentBoxText, { exact: false })).toBeVisible();
    await expect(page.locator('.transition-all').nth(1)).toBeVisible();
  });

  test('Test 3: ContentBox Links (TalonOne)', async ({ page }) => {
    const talonOneBox = config.scrollContainer.contentBoxes[3];
    const linkInfo = talonOneBox.descriptionParts.find(part => part.type === 'link') as { text: string, href: string } | undefined;

    expect(linkInfo, 'Link info for TalonOne not found in config').toBeDefined();
    if (!linkInfo) return; // Should not happen due to expect above

    // Scroll to bring the fourth ContentBox into view
    // This might require multiple scroll steps or a targeted scroll to the element
    // For simplicity, using a large scroll, adjust as needed
    await scrollDown(page, 1200); // Initial scroll
    await scrollDown(page, 600);  // Additional scroll if needed

    const linkLocator = page.getByRole('link', { name: linkInfo.text });
    await expect(linkLocator).toBeVisible({ timeout: 10000 }); // Increased timeout for visibility
    await expect(linkLocator).toHaveAttribute('href', linkInfo.href);
    
    // In the provided config, target="_blank" is not specified for this link.
    // If it were, the assertion would be:
    // await expect(linkLocator).toHaveAttribute('target', '_blank');
    // For now, we'll check if it does NOT have target=_blank, or if it's configured to open in same tab
    // Or, if the link is intended to open in a new tab by default due to external nature,
    // the test might need to confirm that behavior if strictly required.
    // Based on current config, we assume it opens in the same tab.
    // If the link implicitly opens in a new tab due to browser behavior for external links,
    // and that's the *desired* behavior, then the test should reflect that.
    // However, the config doesn't specify target, so we'll assume no specific target attribute is set
    // or it's meant to open in the same tab.
    // Correcting the assertion: The Link component in scroll-container.tsx hardcodes target="_blank".
    await expect(linkLocator).toHaveAttribute('target', '_blank');
  });

  test('Test 4: Presence of Footer elements', async ({ page }) => {
    await scrollToBottom(page);

    // Check for footer section visibility (e.g., by a known element within it)
    // Using the "Find me on" title as an anchor for footer visibility
    const findMeOnTitle = page.getByText(config.footer.sections.findMeOn.title, { exact: true });
    await expect(findMeOnTitle).toBeVisible();

    // Check for "Find me on" title
    await expect(page.getByText(config.footer.sections.findMeOn.title, { exact: true })).toBeVisible();
    
    // Check for at least one link within "Find me on"
    const linkedInLinkText = config.footer.sections.findMeOn.links[0].text;
    const linkedInLinkUrl = config.footer.sections.findMeOn.links[0].url;
    const linkedInLink = page.getByRole('link', { name: linkedInLinkText });
    await expect(linkedInLink).toBeVisible();
    await expect(linkedInLink).toHaveAttribute('href', linkedInLinkUrl);

    // Check for "Some of my work" title
    await expect(page.getByText(config.footer.sections.someOfMyWork.title, { exact: true })).toBeVisible();

    // Check for at least one project under "Some of my work"
    const firstProjectName = config.footer.sections.someOfMyWork.projects[0].name;
    const firstProjectUrl = config.footer.sections.someOfMyWork.projects[0].url;
    // Assuming project name is used as link text or part of it. Adjust if locator is different.
    const projectLink = page.getByRole('link', { name: new RegExp(firstProjectName, 'i') });
    await expect(projectLink.first()).toBeVisible(); // Use first() if name is not exact
    await expect(projectLink.first()).toHaveAttribute('href', firstProjectUrl);

    // Verify the "open source" link text and its href
    const openSourceLink = page.getByRole('link', { name: config.footer.openSource.linkText });
    await expect(openSourceLink).toBeVisible();
    await expect(openSourceLink).toHaveAttribute('href', config.footer.openSource.url);

    // Verify the "reach out" link text and its href
    const reachOutLink = page.getByRole('link', { name: config.footer.inquiries.linkText });
    await expect(reachOutLink).toBeVisible();
    await expect(reachOutLink).toHaveAttribute('href', config.footer.inquiries.url);
  });
});
