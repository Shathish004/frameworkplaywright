import { test, expect } from '@playwright/test'

test('Shopping Site', async ({ page }) => {

    //test.setTimeout(6000);
    await page.goto('https://demowebshop.tricentis.com/');
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.locator('text=Welcome to our store')).toBeVisible({ timeout: 5000 });
    await page.locator('#small-searchterms').fill("Laptop");
    await page.locator('text=14.1-inch Laptop').click({ force: true });
    // await page.locator('.button-1 search-box-button').click();


});