```gherkin
Funcionalidade: Login na Book Store do DemoQA
  Como usuário da Book Store
  Quero realizar login no sistema
  Para acessar minha conta e gerenciar meus livros

  @smoke @positive
  Cenário: Login com credenciais válidas
    Dado que estou na página de login da Book Store
    Quando preencho o usuário "silvaJoao"
    E preencho a senha "Teste@123"
    E clico no botão Login
    Então devo ser redirecionado para a página de perfil
    E devo ver o nome "silvaJoao" logado

  @regression @negative
  Cenário: Login com usuário inválido e senha válida
    Dado que estou na página de login da Book Store
    Quando preencho o usuário "usuarioErrado"
    E preencho a senha "Teste@123"
    E clico no botão Login
    Então devo ver a mensagem "Invalid username or password!"

  @regression @negative
  Cenário: Login com usuário válido e senha inválida
    Dado que estou na página de login da Book Store
    Quando preencho o usuário "silvaJoao"
    E preencho a senha "senhaErrada"
    E clico no botão Login
    Então devo ver a mensagem "Invalid username or password!"

  @regression @negative
  Cenário: Login com campos vazios
    Dado que estou na página de login da Book Store
    Quando clico no botão Login sem preencher nada
    Então os campos devem ficar destacados como obrigatórios
```