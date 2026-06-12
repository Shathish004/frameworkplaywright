import {test, expect} from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('Accebility', async ({page})=>{

    await page.goto('https://demowebshop.tricentis.com/');
    const access = await new AxeBuilder({page}).analyze();
    console.log(access.violations.length);
    //expect(access.violations).toEqual(0);
    

})