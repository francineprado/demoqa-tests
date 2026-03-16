const { test, expect } = require('@playwright/test');
const validData        = require('../data/login.valid.json');
const invalidData      = require('../data/login.invalid.json');

test.describe('API - Login Book Store', () => {

  const BASE_URL = 'https://demoqa.com';

  // ════════════════════════════════════════
  // ✅ CENÁRIO POSITIVO — Login válido
  // ════════════════════════════════════════
  test('API - Login com credenciais válidas',
    { tag: ['@smoke', '@positive', '@api'] },
    async ({ request }) => {

    const response = await request.post(`${BASE_URL}/Account/v1/Login`, {
      data: {
        userName: validData[0].username,
        password: validData[0].password
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('✅ Resposta:', body);

    // Login válido DEVE ter token
    expect(body.token).toBeTruthy();
    expect(body.userId).toBeTruthy();
    expect(body.username).toBeTruthy();
  });

  // ════════════════════════════════════════
  // ❌ CENÁRIO NEGATIVO — Usuário errado
  // ════════════════════════════════════════
  test('API - Login com usuário inválido',
    { tag: ['@regression', '@negative', '@api'] },
    async ({ request }) => {

    const response = await request.post(`${BASE_URL}/Account/v1/Login`, {
      data: {
        userName: invalidData[0].username,
        password: validData[0].password
      }
    });

    // Lê como texto primeiro (pode vir vazio!)
    const text = await response.text();
    console.log('❌ Resposta usuário inválido:', text || '(vazio)');

    // CRITÉRIO: Body vazio = login falhou = CORRETO!
    // O servidor não retornou token nem dados = não autorizou
    expect(text).toBeFalsy();
    // ↑ "Eu espero que o body esteja VAZIO"
    //    Vazio = o servidor não reconheceu o usuário
    //    Se viesse com token, seria um BUG! 🐛
  });

  // ════════════════════════════════════════
  // ❌ CENÁRIO NEGATIVO — Senha errada
  // ════════════════════════════════════════
  test('API - Login com senha inválida',
    { tag: ['@regression', '@negative', '@api'] },
    async ({ request }) => {

    const response = await request.post(`${BASE_URL}/Account/v1/Login`, {
      data: {
        userName: invalidData[1].username,
        password: invalidData[1].password
      }
    });

    const text = await response.text();
    console.log('❌ Resposta senha inválida:', text || '(vazio)');

    // CRITÉRIO: Body vazio = login falhou = CORRETO!
    expect(text).toBeFalsy();
  });

  // ════════════════════════════════════════
  // ❌ CENÁRIO NEGATIVO — Campos vazios
  // ════════════════════════════════════════
  test('API - Login com campos vazios',
    { tag: ['@regression', '@negative', '@api'] },
    async ({ request }) => {

    const response = await request.post(`${BASE_URL}/Account/v1/Login`, {
      data: {
        userName: '',
        password: ''
      }
    });

    const text = await response.text();
    console.log('❌ Resposta campos vazios:', text || '(vazio)');

    // CRITÉRIO: Não pode ter token!
    // Se veio algo, verifica que NÃO tem token
    if (text) {
      const body = JSON.parse(text);
      // Se por algum motivo veio um body, não pode ter token!
      expect(body.token || null).toBeNull();
    }

    // Body vazio OU sem token = login não aconteceu = CORRETO!
  });
});