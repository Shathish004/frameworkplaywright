import { test, expect } from '@playwright/test'

const items: string[] = ['Laptop', 'TV', 'Mobile']
for (const item of items) {
  test(`logged verify for item: ${item}`, async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/')
    await page.locator('#small-searchterms').fill(item)
    await expect(page.locator('#small-searchterms')).toHaveValue(item)
  })
}

items.forEach((item)=>
{
  test(`logged verify for item2: ${item}`, async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/')
    await page.locator('#small-searchterms').fill(item)
    await expect(page.locator('#small-searchterms')).toHaveValue(item)
  })
})
