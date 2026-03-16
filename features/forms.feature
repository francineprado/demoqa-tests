```gherkin
Funcionalidade: Practice Form - Formulário de registro de estudante
  Como usuário do DemoQA
  Quero preencher o formulário de registro completo
  Para testar o fluxo E2E de cadastro

  @smoke @positive @e2e
  Cenário: Registro completo com todos os campos válidos
    Dado que estou na página Practice Form
    Quando preencho o primeiro nome "Francine"
    E preencho o sobrenome "Prado"
    E preencho o email "francine@email.com"
    E seleciono o gênero "Female"
    E preencho o celular "1199998888"
    E clico no botão Submit
    Então devo ver o modal de confirmação
    E o modal deve conter "Francine Prado"

  @regression @negative
  Cenário: Registro sem campos obrigatórios
    Dado que estou na página Practice Form
    Quando clico no botão Submit sem preencher nada
    Então os campos obrigatórios devem ficar destacados em vermelho
```