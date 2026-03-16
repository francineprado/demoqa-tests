class FormsPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput  = page.locator('#lastName');
    this.emailInput     = page.locator('#userEmail');
    this.mobileInput    = page.locator('#userNumber');
    this.submitButton   = page.locator('#submit');
    this.confirmModal   = page.locator('.modal-content');
    this.modalTitle     = page.locator('#example-modal-sizes-title-lg');
    this.modalBody      = page.locator('.modal-body');
    this.modalClose     = page.locator('#closeLargeModal');
  }

  async goto() {
    await this.page.goto('/automation-practice-form');
  }

  async fillBasicInfo(data) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.mobileInput.fill(data.mobile);
  }

  async selectGender(gender) {

    await this.page.locator('label', { hasText: gender }).click();
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async fillCompleteForm(data) {
    await this.fillBasicInfo(data);
    await this.selectGender(data.gender);
  }

  async isModalVisible() {
    return await this.confirmModal.isVisible();
  }

  async getModalText() {
    return await this.modalBody.innerText();
  }

  async closeModal() {
    await this.modalClose.click();
  }

  async areRequiredFieldsHighlighted() {
    const form = this.page.locator('form');
    const cssClass = await form.getAttribute('class');

    return cssClass !== null && cssClass.includes('was-validated');
  }
}

module.exports = { FormsPage };