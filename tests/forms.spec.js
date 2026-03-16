const { test, expect } = require('@playwright/test');
const { FormsPage }    = require('../pages/forms.page');
const validData        = require('../data/forms.valid.json');

test.describe('Practice Form - Registro de estudante', () => {

  let formsPage;

  test.beforeEach(async ({ page }) => {
    formsPage = new FormsPage(page);
    await formsPage.goto();
  });

  test('E2E - Registro completo com dados válidos',
    { tag: ['@smoke', '@positive', '@e2e'] },
    async () => {

    await formsPage.fillCompleteForm(validData[0]);

    await formsPage.clickSubmit();

    const modalVisible = await formsPage.isModalVisible();
    expect(modalVisible).toBe(true);

    const modalText = await formsPage.getModalText();
    expect(modalText).toContain(
      `${validData[0].firstName} ${validData[0].lastName}`
    );

    expect(modalText).toContain(validData[0].email);

    await formsPage.closeModal();
  });

  test('Submeter formulário sem campos obrigatórios',
    { tag: ['@regression', '@negative'] },
    async () => {

    await formsPage.clickSubmit();

    const fieldsHighlighted = await formsPage.areRequiredFieldsHighlighted();
    expect(fieldsHighlighted).toBe(true);

    const modalVisible = await formsPage.isModalVisible();
    expect(modalVisible).toBe(false);
  });
});