const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // Tempo máximo por teste
  timeout: 30000,

  // Configs globais
  use: {
    baseURL: 'https://demoqa.com',
    headless: false,
    launchOptions: {
      slowMo: 1000
    },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'demoqa',
    },
  ],
});