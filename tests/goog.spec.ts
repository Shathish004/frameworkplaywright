import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('software testing');
  await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dsoftware%2Btesting%26sca_esv%3D25926d3c99fa4024%26source%3Dhp%26ei%3DWi80aqW8DMqVvr0P5Iav8Qs%26iflsig%3DAFdpzrgAAAAAajQ9asL5XYDbkJ0rrS8iw7sLAGCylPj7%26ved%3D0ahUKEwil0ai8rJGVAxXKiq8BHWTDK74Q4dUDCC0%26uact%3D5%26oq%3Dsoftware%2Btesting%26gs_lp%3DEgdnd3Mtd2l6IhBzb2Z0d2FyZSB0ZXN0aW5nMggQABiABBixAzIFEAAYgAQyBRAAGIAEMggQABiABBixAzIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABEiFKVD3BlilJXABeACQAQCYAcgBoAHSEKoBBjMuMTIuMbgBA8gBAPgBAZgCEaACkxKoAgrCAgoQABgDGI8BGOoCwgILEAAYgAQYsQMYgwHCAgUQLhiABMICDhAuGMcBGLEDGNEDGIAEwgIOEAAYgAQYigUYsQMYgwHCAhEQLhiABBixAxiDARjHARjRA8ICCBAuGIAEGLEDwgIOEC4YgAQYsQMYxwEY0QPCAg4QLhiABBjHARivARiOBZgDFfEFCqC6QoKLk2iSBwY0LjEyLjGgB_VssgcGMy4xMi4xuAf-EcIHBTItOC45yAeWAYAIAQ%26sclient%3Dgws-wiz%26sei%3DYy80apQW-uPV7w_-vszBCA&q=EhAkBQIB4BEAtLhp-9Ug7ysUGOPe0NEGIjDG3OUySUQS_uXUGJj4g-JJNcQ66IxK5-UAJzoTGKo1KTDoXy1C1SIrPbFygSsPZ_syAVJaAUM');
  await page.locator('iframe[name="a-n32anfjyyhwc"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().locator('[id="4"]').click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().locator('[id="5"]').click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().locator('[id="5"]').click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().locator('[id="1"]').click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().locator('[id="4"]').click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().locator('[id="4"]').click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().locator('[id="4"]').click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().locator('[id="4"]').click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().locator('[id="4"]').click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().locator('[id="3"]').click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().locator('[id="6"]').click();
  await page.locator('iframe[name="c-n32anfjyyhwc"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
});