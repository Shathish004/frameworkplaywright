import {test,expect} from '@playwright/test'
import fs from 'fs';

// const logindata: string[][]=[
//                     ['smithjohn@123.com','pass1234','valid'],
//                     ['abc@abc.com', 'pass1234','Invalid']
// ];

const jsonpath = 'testdata/data.json';
const logindata: any = JSON.parse(fs.readFileSync(jsonpath, 'utf-8'));


test.describe('login test data', () => {
  for (const { email, password, status } of logindata) {

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