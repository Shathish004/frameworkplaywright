import {test,expect, Locator} from '@playwright/test'

test('Webtable retrieve', async({page})=>{

    await page.goto('https://practicetestautomation.com/practice-test-table/');
    const rows = await page.locator('#courses_table tbody');
    //expect(rows).toHaveCount(9);

    const rowcount:Locator =  rows.locator('tr');
    const cnt = await rowcount.count();
    console.log(cnt);

    const column:Locator =  await page.locator("#courses_table thead th");
    const columncnt = await column.count();
    console.log(columncnt)
    const secndrws:Locator =  rowcount.nth(2).locator('td');
    const cellsval: string[] = await secndrws.allInnerTexts(); //[ '1743612', 'XPath Locators', 'Any', 'Beginner', '14762', 'View' ]
    console.log(cellsval)
    await expect(secndrws).toHaveText([
  '1743612',
  'XPath Locators',
  'Any',
  'Beginner',
  '14762',
  'View'
])

for(let text of cellsval )
{
    console.log(text)
}

const rwdata = await rowcount.all();
for(let ro of rwdata )
{
   const ro1 = await ro.locator("td").allInnerTexts();
   console.log("All cel value", ro1.join('\t'));
}
    
const idarr:string[] = [];
for(let r1 of rwdata )
{
    const ro1 = await r1.locator("td").allInnerTexts();
    const ID = ro1[0];
    const course = ro1[2]
    if(course === 'Java')
    {
       console.log(`${ID} \t ${course}`)
       idarr.push(course)
    }
}

expect(idarr).toHaveLength(1);


})