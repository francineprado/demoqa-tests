class TextBoxPage {
  constructor(page) {
    this.page = page;

    this.fullNameInput    = page.locator('#userName');
    this.emailInput       = page.locator('#userEmail');
    this.currentAddress   = page.locator('#currentAddress');
    this.permanentAddress = page.locator('#permanentAddress');
    this.submitButton     = page.locator('#submit');

    this.outputName    = page.locator('#output #name');
    this.outputEmail   = page.locator('#output #email');
    this.outputCurrent = page.locator('#output #currentAddress');
    this.outputPermanent = page.locator('#output #permanentAddress');
    this.outputArea    = page.locator('#output');
  }


  async goto() {
    await this.page.goto('/text-box');
  }

  async fillForm(data) {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.currentAddress.fill(data.currentAddress);
    await this.permanentAddress.fill(data.permanentAddress);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async isEmailFieldInvalid() {
    return await this.emailInput.evaluate(
      (el) => el.classList.contains('field-error')
    );
  }

  async isOutputVisible() {
    // .count() retorna quantos elementos existem
    const count = await this.outputArea.locator('p').count();
    return count > 0;
  }
}

module.exports = { TextBoxPage };