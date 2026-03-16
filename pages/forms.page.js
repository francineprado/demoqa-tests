class FormsPage {
  constructor(page) {
    this.page = page;

    // Campos do formulário
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput  = page.locator('#lastName');
    this.emailInput     = page.locator('#userEmail');
    this.mobileInput    = page.locator('#userNumber');
    this.submitButton   = page.locator('#submit');

    // Modal de confirmação (aparece após submit com sucesso)
    this.confirmModal   = page.locator('.modal-content');
    this.modalTitle     = page.locator('#example-modal-sizes-title-lg');
    this.modalBody      = page.locator('.modal-body');
    this.modalClose     = page.locator('#closeLargeModal');
  }

  // Navegar até a página
  async goto() {
    await this.page.goto('/automation-practice-form');
  }

  // Preencher dados básicos
  async fillBasicInfo(data) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.mobileInput.fill(data.mobile);
  }

  // Selecionar gênero (radio button)
  // Radio buttons não são inputs comuns — precisa clicar no LABEL!
  async selectGender(gender) {
    // Procura o label que contém o texto do gênero e clica nele
    await this.page.locator('label', { hasText: gender }).click();
  }

  // Clicar em Submit
  async clickSubmit() {
    await this.submitButton.click();
  }

  // ═══════════════════════════════════════
  // 🔧 MÉTODO COMPLETO — Faz tudo de uma vez!
  //    Esse é o "fluxo E2E" (início ao fim)
  // ═══════════════════════════════════════
  async fillCompleteForm(data) {
    await this.fillBasicInfo(data);
    await this.selectGender(data.gender);
  }

  // Verificar se o modal de confirmação apareceu
  async isModalVisible() {
    return await this.confirmModal.isVisible();
  }

  // Pegar o texto do modal
  async getModalText() {
    return await this.modalBody.innerText();
  }

  // Fechar o modal
  async closeModal() {
    await this.modalClose.click();
  }

  // Verificar se campos obrigatórios estão com erro
  async areRequiredFieldsHighlighted() {
    // Quando submete sem preencher, o formulário adiciona
    // a classe 'was-validated' e os campos ficam vermelhos
    const form = this.page.locator('form');
    const cssClass = await form.getAttribute('class');

    // Se a classe contém 'was-validated', os campos estão destacados
    return cssClass !== null && cssClass.includes('was-validated');
  }
}

module.exports = { FormsPage };