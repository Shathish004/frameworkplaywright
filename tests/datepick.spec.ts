import {test, expect} from '@playwright/test'

test('date picker', async ({page})=> {

    const monthnumber = "6";
    const date = "15";
    const year ="2027";

    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator('#datepicker').click();
    // Construct target in mm/dd/yyyy format
    const target = `${monthnumber.padStart(2, '0')}/${date.padStart(2, '0')}/${year}`;

    // Option 1: fill the input directly and dispatch events (works even if the widget is readonly)
    await page.fill('#datepicker', target);
    await page.evaluate(({selector, value}) => {
        const el = document.querySelector(selector) as HTMLInputElement | null;
        if (el) {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }, { selector: '#datepicker', value: target });

    await expect(page.locator('#datepicker')).toHaveValue(target);

});