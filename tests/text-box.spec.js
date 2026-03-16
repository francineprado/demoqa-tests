const { test, expect } = require('@playwright/test');
const { TextBoxPage }  = require('../pages/text-box.page');
const validData         = require('../data/text-box.valid.json');
const invalidData       = require('../data/text-box.invalid.json');

test.describe('Text Box - Formulário de dados pessoais', () => {

  let textBoxPage;

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.goto();
  });

  test('Preencher formulário com dados válidos',
    { tag: ['@smoke', '@positive'] },
    async () => {

    await textBoxPage.fillForm(validData[0]);
    await textBoxPage.clickSubmit();

    await expect(textBoxPage.outputName)
      .toContainText(validData[0].fullName);

    await expect(textBoxPage.outputEmail)
      .toContainText(validData[0].email);

    await expect(textBoxPage.outputCurrent)
      .toContainText(validData[0].currentAddress);

    await expect(textBoxPage.outputPermanent)
      .toContainText(validData[0].permanentAddress);
  });

  test('Preencher formulário com email inválido',
    { tag: ['@regression', '@negative'] },
    async () => {

    await textBoxPage.fillForm(invalidData[0]);

    // E clico em Submit
    await textBoxPage.clickSubmit();

    const emailHasError = await textBoxPage.isEmailFieldInvalid();
    expect(emailHasError).toBe(true);

    await expect(textBoxPage.outputName).not.toBeVisible();
  });

  test('Submeter formulário vazio',
    { tag: ['@regression', '@negative'] },
    async () => {

    await textBoxPage.clickSubmit();
    const hasOutput = await textBoxPage.isOutputVisible();
    expect(hasOutput).toBe(false);
  });
});