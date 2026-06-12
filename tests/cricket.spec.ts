import {test, expect} from '@playwright/test';

test('cricket page', async ({page}) => {

    await page.goto("https://www.icc-cricket.com/tournaments/womens-cricket-worldcup-2025");
    expect(page.url()).toContain("cricket");
    const logo = page.locator('img[alt="final-cwc-w-25-logo"]').first();
    await expect(logo).toBeVisible();
    const searchButton = page.getByText('Search', { exact: true });
    await expect(searchButton).toBeVisible();
    await searchButton.click();
    const searchInput = page.getByPlaceholder('what are you looking for?');
    await searchInput.fill('India');
    await searchInput.press('Enter');
});

test('table valid', async({page}) =>
{
    await page.goto("https://www.icc-cricket.com/tournaments/womens-cricket-worldcup-2025");
    const searchButton = page.getByText('Search', { exact: true });
    await expect(searchButton).toBeVisible();
    await searchButton.click();
    await page.getByRole('link', { name: 'Rankings' }).click();
});

test('tab validations', async({page}) =>
{
    await page.goto("https://www.icc-cricket.com/index");
    const [newpage] = await Promise.all([
       page.waitForEvent('popup'),
       await page.locator('a:has(span:text("Travel"))').click()
    ]);
    await expect(newpage).toHaveURL("https://www.icctravelandtours.com/");


});

