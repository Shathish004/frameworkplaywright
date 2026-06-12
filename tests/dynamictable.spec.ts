import {test,expect, Locator} from '@playwright/test'

test('dynamic table', async ({page})=> {

    await page.goto('https://practice.expandtesting.com/dynamic-table');

   const tab:Locator =  await page.locator("table.table tbody");
    await expect(tab).toBeVisible();
   const rows = await tab.locator("tr").all();
   console.log(rows.length);
   expect(rows).toHaveLength(4);
   let cpuload="";
   for(const row of rows)
   {
      const processname:String = await row.locator("td").nth(0).innerText();
      if(processname=="Chrome")
      {
              // cpuload = await row.locator('td:has-text("%")').innerText();
              cpuload = await row.locator("td",{hasText:'%'}).innerText();
              console.log(cpuload);
              break;
      }
   }

    await page.waitForTimeout(3000);
    let yellobox:String= await page.locator('#chrome-cpu').innerText();
    console.log(yellobox)
    if(yellobox.includes(cpuload))
    {
        console.log("pass")
    }else{
        console.log("fail")
    }
      expect(yellobox).toContain(cpuload);

});