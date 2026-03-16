const { test, expect } = require('@playwright/test');
const { FormsPage }    = require('../pages/forms.page');
const validData        = require('../data/forms.valid.json');

test.describe('Practice Form - Registro de estudante', () => {

  let formsPage;

  // 🔄 BEFORE EACH — Abre a página antes de cada teste
  test.beforeEach(async ({ page }) => {
    formsPage = new FormsPage(page);
    await formsPage.goto();
  });

  // ════════════════════════════════════════════
  // ✅ CENÁRIO POSITIVO E2E — @smoke @positive @e2e
  //    Fluxo completo: preenche TUDO → verifica modal
  // ════════════════════════════════════════════
  test('E2E - Registro completo com dados válidos',
    { tag: ['@smoke', '@positive', '@e2e'] },
    async () => {

    // DADO que estou na página (beforeEach já fez isso!)

    // QUANDO preencho o formulário completo
    await formsPage.fillCompleteForm(validData[0]);

    // E clico em Submit
    await formsPage.clickSubmit();

    // ENTÃO devo ver o modal de confirmação
    const modalVisible = await formsPage.isModalVisible();
    expect(modalVisible).toBe(true);

    // E o modal deve conter o nome completo
    const modalText = await formsPage.getModalText();
    expect(modalText).toContain(
      `${validData[0].firstName} ${validData[0].lastName}`
    );

    // E o modal deve conter o email
    expect(modalText).toContain(validData[0].email);

    // Fecha o modal no final (boa prática de limpeza!)
    await formsPage.closeModal();
  });

  // ════════════════════════════════════════════
  // ❌ CENÁRIO NEGATIVO — @regression @negative
  //    Submete sem preencher nada
  // ════════════════════════════════════════════
  test('Submeter formulário sem campos obrigatórios',
    { tag: ['@regression', '@negative'] },
    async () => {

    // QUANDO clico em Submit sem preencher nada
    await formsPage.clickSubmit();

    // ENTÃO os campos obrigatórios devem ficar destacados
    const fieldsHighlighted = await formsPage.areRequiredFieldsHighlighted();
    expect(fieldsHighlighted).toBe(true);

    // E o modal NÃO deve aparecer
    const modalVisible = await formsPage.isModalVisible();
    expect(modalVisible).toBe(false);
  });
});