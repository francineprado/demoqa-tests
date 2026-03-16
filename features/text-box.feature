```gherkin
Funcionalidade: Text Box - Formulário de dados pessoais
  Como usuário do DemoQA
  Quero preencher o formulário de Text Box
  Para verificar se os dados são exibidos corretamente

  @smoke @positive
  Cenário: Preencher formulário com todos os dados válidos
    Dado que estou na página Text Box
    Quando preencho o nome "Francine Prado"
    E preencho o email "francine@email.com"
    E preencho o endereço atual "Rua das Flores, 123"
    E preencho o endereço permanente "Avenida Brasil, 456"
    E clico no botão Submit
    Então devo ver o nome "Francine Prado" no resultado
    E devo ver o email "francine@email.com" no resultado

  @regression @negative
  Cenário: Preencher formulário com email inválido
    Dado que estou na página Text Box
    Quando preencho o nome "Francine Prado"
    E preencho o email "emailinvalido"
    E clico no botão Submit
    Então o campo de email deve ficar com borda vermelha
    E os dados NÃO devem aparecer no resultado

  @regression @negative
  Cenário: Submeter formulário totalmente vazio
    Dado que estou na página Text Box
    Quando clico no botão Submit sem preencher nada
    Então nenhum dado deve aparecer no resultado
```