class LoginPage {
  constructor(page) {
    this.page = page;

    // ═══════════════════════════════════════
    // 🎯 LOCATORS — os "endereços" dos elementos na tela
    //    Esses IDs são do site demoqa.com/login
    // ═══════════════════════════════════════

    // Campos de entrada
    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.locator('#login');

    // Mensagem de erro (aparece quando login falha)
    this.errorMessage  = page.locator('#name');

    // Elemento que confirma o login (página de perfil)
    this.usernameLabel = page.locator('#userName-value');
    this.logoutButton  = page.locator('#submit');
  }

  // ═══════════════════════════════════════
  // 🚀 MÉTODOS — o que o robô sabe fazer
  // ═══════════════════════════════════════

  // Navegar até a página de login
  async goto() {
    await this.page.goto('/login');
  }

  // Preencher usuário e senha e clicar em Login
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Clicar em Login SEM preencher nada (pra testar campos vazios)
  async clickLoginWithoutFilling() {
    await this.loginButton.click();
  }

  // Pegar o texto da mensagem de erro
  async getErrorMessage() {
    // Espera a mensagem aparecer (pode demorar um pouco)
    await this.errorMessage.waitFor({ state: 'visible' });
    return await this.errorMessage.innerText();
  }

  // Verificar se estou na página de perfil (login deu certo)
  async isLoggedIn() {
    // Se o label com o nome do usuário está visível = logou!
    return await this.usernameLabel.isVisible();
  }

  // Pegar o nome do usuário logado
  async getLoggedUsername() {
    return await this.usernameLabel.innerText();
  }

  // Verificar se campos obrigatórios estão destacados
  async areFieldsHighlighted() {
    // Quando submete vazio, o DemoQA adiciona borda vermelha
    // A classe "is-invalid" aparece nos campos
    const usernameClass = await this.usernameInput.getAttribute('class');
    const passwordClass = await this.passwordInput.getAttribute('class');

    return usernameClass.includes('is-invalid') 
        || passwordClass.includes('is-invalid');
  }
}

module.exports = { LoginPage };