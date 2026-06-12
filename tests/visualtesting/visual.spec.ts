import { test, expect } from '@playwright/test'

test('Shopping Site', async ({ page }) => {

    //test.setTimeout(6000);
    await page.goto('https://demowebshop.tricentis.com/');
     //expect(await page.screenshot()).toMatchSnapshot("home-actual.png");

     //await expect(page).toHaveScreenshot();
     const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
     expect(await logo.screenshot()).toMatchSnapshot("logo.png");




});