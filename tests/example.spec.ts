import { test, expect } from '@playwright/test';

let webcontext: any;

test.beforeAll('login page', async({browser})=>
{
   const newContext = await browser.newContext();
   const page = await newContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByRole('textbox', { name: 'email@example.com' }).click();
  await page.getByRole('textbox', { name: 'email@example.com' }).fill('anshika@gmail.com');
  await page.getByRole('textbox', { name: 'enter your passsword' }).click();
  await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Iamking@000');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');
  await newContext.storageState({path:'state.json'});
  webcontext = await browser.newContext({storageState:'state.json'})

})

test('test', async ({page}) => {
  
  const page1 = webcontext.newPage()
  // await page.getByRole('textbox', { name: 'Min Price' }).click();
  // await page.getByRole('textbox', { name: 'Max Price' }).click();
  // await page.getByRole('checkbox').first().check();
  // await page.getByRole('textbox', { name: 'Min Price' }).click();
  // await page.getByRole('textbox', { name: 'Max Price' }).click();
  // await page.getByRole('checkbox').nth(1).check();
  // await page.getByRole('checkbox').first().uncheck();
  // await page.getByRole('textbox', { name: 'Max Price' }).click();
  // await page.getByRole('textbox', { name: 'Min Price' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
});