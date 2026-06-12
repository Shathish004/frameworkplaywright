import { test, expect } from '@playwright/test';
import { default as config } from '../defineconfig';
//import { default as config } from '../defineconfig';

const getBaseURL = (projectName: string): string | undefined => {
  const project = config.projects?.find((p: any) => p.name === projectName);
  return project?.use?.baseURL;
};

// Usage in test
const baseURL = getBaseURL('dev')!;

test('test', async ({ page }) => {

  
  await page.goto(baseURL);
  await expect(page.locator('body')).toContainText('Categories');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).click();
  await page.getByRole('textbox', { name: 'Email:' }).fill('pavanol');
  await page.getByRole('textbox', { name: 'Password:' }).click();
  await page.getByRole('textbox', { name: 'Password:' }).fill('test@123');
  await page.getByText('Returning Customer Email:').click();
  await expect(page.getByRole('link', { name: 'Tricentis Demo Web Shop' })).toBeVisible();
});