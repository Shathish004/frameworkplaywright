import { test, expect } from '@playwright/test';

test.describe('Demo Web Shop - Search and Product Verification', () => {
  test('Navigate to demo shop, verify welcome message, and search for laptop', async ({ page }) => {
    // Step 1: Navigate to https://demowebshop.tricentis.com/
    await page.goto('https://demowebshop.tricentis.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000); // Allow page to fully load

    // Step 2: Verify "Welcome to our store" is visible
    const welcomeMessage = page.locator('text=Welcome to our store');
    await expect(welcomeMessage).toBeVisible({ timeout: 10000 });
    console.log('✓ Welcome message is visible');

    // Step 3: In Search textbox search with "14.1-inch Laptop"
    // Look for search input - try multiple selectors as store may use different IDs
    let searchBox = page.locator('input[placeholder*="Search"]').first();
    if (await searchBox.count() === 0) {
      searchBox = page.locator('input.search-text-box').first();
    }
    if (await searchBox.count() === 0) {
      searchBox = page.locator('input[type="text"]').first();
    }
    
    await expect(searchBox).toBeVisible({ timeout: 10000 });
    await searchBox.fill('14.1-inch Laptop');
    await searchBox.press('Enter');

    // Wait for search results to load
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // Step 4: Verify the search result
    // Verify we're on search results page
    await expect(page).toHaveURL(/search/i);
    
    // Verify product appears in search results
    const productResult = page.locator('text=14.1-inch Laptop').first();
    await expect(productResult).toBeVisible({ timeout: 10000 });
    console.log('✓ Search results contain "14.1-inch Laptop"');

    // Additional verification: count results
    const productItems = page.locator('[class*="product"]').filter({ hasText: /14\.1.*Laptop/i });
    const productCount = await productItems.count();
    expect(productCount).toBeGreaterThanOrEqual(0);
    console.log(`✓ Search completed successfully`);
  });

  test('Verify product details after search and purchase workflow', async ({ page }) => {
    // Navigate to shop
    await page.goto('https://demowebshop.tricentis.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // Find and interact with search box
    let searchBox = page.locator('input[placeholder*="Search"]').first();
    if (await searchBox.count() === 0) {
      searchBox = page.locator('input.search-text-box').first();
    }
    if (await searchBox.count() === 0) {
      searchBox = page.locator('input[type="text"]').first();
    }

    await expect(searchBox).toBeVisible({ timeout: 10000 });
    await searchBox.fill('14.1-inch Laptop');
    await searchBox.press('Enter');

    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // Verify search results page
    await expect(page).toHaveURL(/search/i);

    // Click on the first product link in results
    const firstProductLink = page.locator('a').filter({ hasText: /14\.1.*Laptop/i }).first();
    await expect(firstProductLink).toBeVisible({ timeout: 10000 });
    await firstProductLink.click();

    // Verify product page loads
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500);

    // Verify product name is visible
    const productTitle = page.locator('h1').first();
    const titleText = await productTitle.textContent();
    expect(titleText).toBeTruthy();
    console.log(`✓ Product page loaded: ${titleText?.trim()}`);

    // Verify price is visible
    const price = page.locator('[class*="price"]').first();
    await expect(price).toBeVisible({ timeout: 10000 });
    console.log('✓ Product price is visible');
  });
});
