class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator('#userName');
    this.passwordInput = page.locator('#password');
    this.loginButton   = page.locator('#login');

    this.errorMessage  = page.locator('#name');
    this.usernameLabel = page.locator('#userName-value');
  }

  // Navega até a página e remove anúncios
  async goto() {
    await this.page.goto('/login');
    await this.removeAds();
  }

  // Remove anúncios que atrapalham os cliques
  async removeAds() {
    await this.page.evaluate(() => {
      const ads = document.querySelectorAll('iframe, .ad, #fixedban, #adplus-anchor');
      ads.forEach(ad => ad.remove());
    });
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  // Login válido
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await Promise.all([
      this.page.waitForURL('**/profile**', { timeout: 15000 }),
      this.loginButton.click()
    ]);
  }

  // Login inválido
  async loginExpectingError(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click({ force: true });
  }

  // Campos vazios
  async clickLoginWithoutFilling() {
    await this.loginButton.click({ force: true });
  }

  async isLoggedIn() {
    try {
      await this.usernameLabel.waitFor({ state: 'visible', timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getLoggedUsername() {
    return await this.usernameLabel.innerText();
  }

  async getErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible' });
    return await this.errorMessage.innerText();
  }

  async areFieldsHighlighted() {
    const usernameClass = await this.usernameInput.getAttribute('class');
    const passwordClass = await this.passwordInput.getAttribute('class');
    return usernameClass.includes('is-invalid')
        || passwordClass.includes('is-invalid');
  }
}

module.exports = { LoginPage };