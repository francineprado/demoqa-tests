Funcionalidade: API de Login da Book Store
  Como QA
  Quero testar a API de login diretamente
  Para garantir que o backend valida corretamente

  @smoke @positive @api
  Cenário: Login via API com credenciais válidas
    Quando envio uma requisição POST para /Account/v1/Login
    Com o body { "userName": "silvaJoao", "password": "Teste@123" }
    Então devo receber status 200
    E a resposta deve conter o token de autenticação

  @regression @negative @api
  Cenário: Login via API com credenciais inválidas
    Quando envio uma requisição POST para /Account/v1/Login
    Com o body { "userName": "usuarioErrado", "password": "Teste@123" }
    Então devo receber status 404
    E a resposta deve conter "Invalid username or password!"

  @regression @negative @api
  Cenário: Login via API com campos vazios
    Quando envio uma requisição POST para /Account/v1/Login
    Com o body { "userName": "", "password": "" }
    Então devo receber status 400
    E a resposta deve conter mensagem de erro
```