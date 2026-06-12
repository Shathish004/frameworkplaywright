import {test, expect, Locator} from '@playwright/test'
import { TIMEOUT } from 'node:dns';

test('reading multi tables', async ({page})=>{
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');

let hasmorepages = true;
 while(hasmorepages)
 {
    const rows = await page.locator('#example tbody tr').all();
    for(let row of rows)
    {
        console.log(await row.innerText())
    }

    const nxtbutton: Locator = page.locator("button[aria-label='Next']");
    const disable = await nxtbutton.getAttribute('class');
    if(disable?.includes('disabled'))
    {
             hasmorepages = false;
    }
    else
    {
        await nxtbutton.click();
    }
    


 }


});

test('reading tables', async ({page})=>{
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
    const drpdown = page.locator('#dt-length-0');
    drpdown.selectOption({label:'25'});
    await page.waitForTimeout(4000)
    const rows = await page.locator('#example tbody tr').all();
    expect(rows.length).toBe(25);
});