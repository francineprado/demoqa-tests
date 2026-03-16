const { test, expect } = require('@playwright/test');
const { LoginPage }    = require('../pages/login.page');
const validData        = require('../data/login.valid.json');
const invalidData      = require('../data/login.invalid.json');

test.describe('Book Store - Login', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ✅ Login válido — usa login() que espera redirecionamento
  test('Login com credenciais válidas',
    { tag: ['@smoke', '@positive'] },
    async () => {

    await loginPage.login(
      validData[0].username,
      validData[0].password
    );

    const loggedIn = await loginPage.isLoggedIn();
    expect(loggedIn).toBe(true);

    const username = await loginPage.getLoggedUsername();
    expect(username.toLowerCase())
      .toBe(validData[0].username.toLowerCase());
  });

  // ❌ Usuário errado — usa loginExpectingError()
  test('Login com usuário inválido e senha válida',
    { tag: ['@regression', '@negative'] },
    async () => {

    await loginPage.loginExpectingError(
      invalidData[0].username,
      invalidData[0].password
    );

    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBe('Invalid username or password!');
  });

  // ❌ Senha errada — usa loginExpectingError()
  test('Login com usuário válido e senha inválida',
    { tag: ['@regression', '@negative'] },
    async () => {

    await loginPage.loginExpectingError(
      invalidData[1].username,
      invalidData[1].password
    );

    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toBe('Invalid username or password!');
  });

  // ❌ Campos vazios
  test('Login com campos vazios',
    { tag: ['@regression', '@negative'] },
    async () => {

    await loginPage.clickLoginWithoutFilling();

    const fieldsHighlighted = await loginPage.areFieldsHighlighted();
    expect(fieldsHighlighted).toBe(true);
  });
});