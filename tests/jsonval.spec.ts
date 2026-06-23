import { test, expect } from '@playwright/test'
import { readJsonFile } from '../utils/utils'

// const logindata: string[][]=[
//                     ['smithjohn@123.com','pass1234','valid'],
//                     ['abc@abc.com', 'pass1234','Invalid']
// ];

//const logindata = readJsonFile<Array<{ email: string; password: string; status: string }>>('testdata/userdata.json')
const logindata = readJsonFile<{
    users: Array<{
    email: string;
    password: string;
    status: string;
  }>;
}>('testdata/userdata.json');

test.describe('login test data', () => {
  for (const { email, password, status } of logindata.users) {

    test(`login test ${email} and ${password}`, async ({ page }) => {
      await page.goto('https://demowebshop.tricentis.com/')
      await page.getByRole('link', { name: 'Log in' }).click()
      await page.locator('#Email').fill(email)
      await page.locator('#Password').fill(password)
      await page.getByRole('button', { name: 'Log in' }).click()
    if(status.toLocaleLowerCase() =='valid')
    {
        const logoutlink =  page.locator('a[href="/logout"]');
        await expect(logoutlink).toBeVisible({timeout: 5000});
    }
    else
    {
          const errormsg =  page.locator('.validation-summary-errors');
        await expect(errormsg).toBeVisible({timeout: 5000});
        await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
    }

});


}

});