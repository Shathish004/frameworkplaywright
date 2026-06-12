import { test, expect } from '@playwright/test'

test.beforeEach('Shopping Site', async ({ page }) => {

    //test.setTimeout(6000);
    await page.goto('https://demowebshop.tricentis.com/');
    await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com1/');


});

test('logo visible', async ({page})=>
{
     await expect(page.locator('text=Welcome to our store')).toBeVisible({ timeout: 5000 });
});

test('Search Laptop visible', async ({page})=>
{
    await page.locator('#small-searchterms').fill("Laptop");
    await page.locator('text=14.1-inch Laptop').click({ force: true });
});