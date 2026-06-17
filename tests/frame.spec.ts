import { test, expect } from '@playwright/test'

test('frame design', async ({ page }) => {
    await page.goto('https://www.leafground.com/frame.xhtml');
    //await page.goto('https://www.leafground.com/frame.xhtml');
    for (const frame of page.frames()) {
        console.log(frame.url());
    }
    const frames = page.frames();
    console.log(frames.length)
    const frame = page.frame({ url: "https://www.leafground.com/default.xhtml" });
    if (frame) {
        frame.locator('#Click').click();
        await frame.waitForTimeout(3000);
        const msg = await frame.locator('#Click').textContent();
        console.log(msg);
        expect(msg).toEqual('Hurray! You Clicked Me.');
    }
    const innerFrames = frame?.childFrames() ?? [];
    console.log(innerFrames.length);

    const innerBtn = innerFrames[0]?.locator('#Click'); // confirm the index from the log above
    await innerBtn?.click()



});