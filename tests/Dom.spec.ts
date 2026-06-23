import {test,expect,chromium} from '@playwright/test'

test('browser setting', async()=>{

    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext(
     {
        viewport:{width:1200,height:1800},
        locale:"en-US",
        ignoreHTTPSErrors:true

     }


    );
    const page = await context.newPage();
    await page.goto("https://expired.badssl.com/");
    console.log('the title is', await page.title());
    await page.waitForTimeout(7000)

})