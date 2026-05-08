import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  workers: 4,
  
  fullyParallel: true,

  reporter: [
    //['list'],
    //['html'], 
    ['allure-playwright']
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:8000'
  },

  projects: [
    {
      name: 'API Tests',
      //use: { ...devices['Desktop Chrome'] },
    },
  ],
});