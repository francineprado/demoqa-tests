const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // Pasta onde ficam os testes
  testDir: './tests',

  // Tempo máximo por teste
  timeout: 30000,

  // Configurações globais
  use: {
    baseURL: 'https://demoqa.com',
    headless: false,
    launchOptions: {
      slowMo: 1000
    },
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    // Viewport (tamanho da "janela" do navegador)
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'demoqa',
    },
  ],
});