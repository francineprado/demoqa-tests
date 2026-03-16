const { test, expect } = require('@playwright/test');
const { TextBoxPage }  = require('../pages/text-box.page');
const validData         = require('../data/text-box.valid.json');
const invalidData       = require('../data/text-box.invalid.json');

// ═══════════════════════════════════════════════════════
// 📁 Agrupa todos os testes de Text Box
// test.describe = "pasta" que organiza testes relacionados
// ═══════════════════════════════════════════════════════
test.describe('Text Box - Formulário de dados pessoais', () => {

  // Variável compartilhada entre os testes
  let textBoxPage;

  // ════════════════════════════════════════════
  // 🔄 BEFORE EACH — Roda ANTES de cada teste
  //    Abre a página pra cada teste começar limpo
  // ════════════════════════════════════════════
  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.goto();
  });

  // ════════════════════════════════════════════
  // ✅ CENÁRIO POSITIVO — @smoke @positive
  //    Gherkin: "Preencher formulário com todos os dados válidos"
  // ════════════════════════════════════════════
  test('Preencher formulário com dados válidos',
    { tag: ['@smoke', '@positive'] },
    async () => {

    // QUANDO preencho o formulário com dados válidos
    await textBoxPage.fillForm(validData[0]);

    // E clico no botão Submit
    await textBoxPage.clickSubmit();

    // ENTÃO devo ver o nome no resultado
    await expect(textBoxPage.outputName)
      .toContainText(validData[0].fullName);

    // E devo ver o email no resultado
    await expect(textBoxPage.outputEmail)
      .toContainText(validData[0].email);

    // E devo ver o endereço atual
    await expect(textBoxPage.outputCurrent)
      .toContainText(validData[0].currentAddress);

    // E devo ver o endereço permanente
    await expect(textBoxPage.outputPermanent)
      .toContainText(validData[0].permanentAddress);
  });

  // ════════════════════════════════════════════
  // ❌ CENÁRIO NEGATIVO — @regression @negative
  //    Gherkin: "Preencher formulário com email inválido"
  // ════════════════════════════════════════════
  test('Preencher formulário com email inválido',
    { tag: ['@regression', '@negative'] },
    async () => {

    // QUANDO preencho com email inválido
    await textBoxPage.fillForm(invalidData[0]);

    // E clico em Submit
    await textBoxPage.clickSubmit();

    // ENTÃO o campo de email deve ter erro (borda vermelha)
    const emailHasError = await textBoxPage.isEmailFieldInvalid();
    expect(emailHasError).toBe(true);

    // E os dados NÃO devem aparecer no resultado
    await expect(textBoxPage.outputName).not.toBeVisible();
  });

  // ════════════════════════════════════════════
  // ❌ CENÁRIO NEGATIVO — @regression @negative
  //    Gherkin: "Submeter formulário totalmente vazio"
  // ════════════════════════════════════════════
  test('Submeter formulário vazio',
    { tag: ['@regression', '@negative'] },
    async () => {

    // QUANDO clico em Submit sem preencher nada
    await textBoxPage.clickSubmit();

    // ENTÃO nenhum dado deve aparecer
    const hasOutput = await textBoxPage.isOutputVisible();
    expect(hasOutput).toBe(false);
  });
});