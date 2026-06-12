// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'dev',
      use: {
        baseURL: 'https://demowebshop.tricentis.com/',
      },
    },
    {
      name: 'staging',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
      },
    },
    {
      name: 'prod',
      use: {
        baseURL: 'https://testautomationpractice.blogspot.com/',
      },
    },
  ],
});
