import { test, expect } from '@playwright/test';
import { default as config } from '../defineconfig';
//import { default as config } from '../defineconfig';

const getBaseURL = (projectName: string): string | undefined => {
  const project = config.projects?.find((p: any) => p.name === projectName);
  return project?.use?.baseURL;
};

// Usage in test
const baseURL = getBaseURL('prod')!;

test('upload files', async ({page}) => {

    await page.goto(baseURL);
    await page.locator('#singleFileInput').setInputFiles('uploads/a.txt');
    await page.locator("button:has-text('Upload Single File')").click();
    const msg = await page.locator('#singleFileStatus').textContent();
    console.log(msg);
    expect(msg).toContain('a.txt');
    await page.waitForTimeout(6000);
});

test('multi upload files', async ({page}) => {

    await page.goto(baseURL);
    await page.locator('#multipleFilesInput').setInputFiles(['uploads/a.txt','uploads/b.txt']);
    await page.locator("button:has-text('Upload Multiple File')").click();
    const msg = await page.locator('#multipleFileStatus').textContent();
    console.log(msg);
    expect(msg).toContain('a.txt');
    expect(msg).toContain('b.txt');
    await page.waitForTimeout(6000);
});