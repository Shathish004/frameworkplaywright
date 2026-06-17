import { test, expect, Page, chromium, firefox } from '@playwright/test'

test("browser context", async () => {
    const browser = await firefox.launch();
    const context = await browser.newContext();
    const page1 = await context.newPage();
    //const page2 = await context.newPage();
    //console.log("number of pages:", context.pages.length)
    await page1.goto('https://testautomationpractice.blogspot.com/')
    await page1.waitForTimeout(3000)
    //await page2.goto('https://www.google.com/')
    //const [page2] = await Promise.all([context.waitForEvent('page'),page1.locator("button:has-text('New Tab)").click()])
    const [page2] = await Promise.all([
        context.waitForEvent('page'),
        page1.getByRole('button', { name: 'New Tab' }).click()
    ])
    await page2.waitForTimeout(3000)
    const pages = context.pages();
    console.log("number", pages.length)
    console.log("page one name",await pages[0].title())
    console.log("page two name",await pages[1].title())
})