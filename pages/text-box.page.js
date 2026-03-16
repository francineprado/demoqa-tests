class TextBoxPage {
  constructor(page) {
    this.page = page;

    // ═══════════════════════════════════════
    // 🎯 LOCATORS — "endereços" dos elementos
    // ═══════════════════════════════════════

    // Campos de entrada (input)
    this.fullNameInput    = page.locator('#userName');
    this.emailInput       = page.locator('#userEmail');
    this.currentAddress   = page.locator('#currentAddress');
    this.permanentAddress = page.locator('#permanentAddress');
    this.submitButton     = page.locator('#submit');

    // Campos de saída (resultado após submit)
    this.outputName    = page.locator('#output #name');
    this.outputEmail   = page.locator('#output #email');
    this.outputCurrent = page.locator('#output #currentAddress');
    this.outputPermanent = page.locator('#output #permanentAddress');
    this.outputArea    = page.locator('#output');
  }

  // ═══════════════════════════════════════
  // 🚀 MÉTODOS — as ações que o robô sabe fazer
  // ═══════════════════════════════════════

  // Navegar até a página
  async goto() {
    await this.page.goto('/text-box');
  }

  // Preencher formulário completo
  // Recebe um objeto com os dados (vem do JSON!)
  async fillForm(data) {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.currentAddress.fill(data.currentAddress);
    await this.permanentAddress.fill(data.permanentAddress);
  }

  // Clicar no botão Submit
  async clickSubmit() {
    await this.submitButton.click();
  }

  // Verificar se o campo de email tem erro (borda vermelha)
  async isEmailFieldInvalid() {
    return await this.emailInput.evaluate(
      (el) => el.classList.contains('field-error')
    );
  }

  // Verificar se a área de resultado está visível
  async isOutputVisible() {
    // .count() retorna quantos elementos existem
    const count = await this.outputArea.locator('p').count();
    return count > 0;
  }
}

module.exports = { TextBoxPage };