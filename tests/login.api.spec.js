const { test, expect } = require('@playwright/test');
const validData        = require('../data/login.valid.json');
const invalidData      = require('../data/login.invalid.json');

test.describe('API - Login Book Store', () => {

  const BASE_URL = 'https://demoqa.com';

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

  test('API - Login com usuário inválido',
    { tag: ['@regression', '@negative', '@api'] },
    async ({ request }) => {

    const response = await request.post(`${BASE_URL}/Account/v1/Login`, {
      data: {
        userName: invalidData[0].username,
        password: validData[0].password
      }
    });
    
    const text = await response.text();
    console.log('❌ Resposta usuário inválido:', text || '(vazio)');

    expect(text).toBeFalsy();
    // Espera um body vazio
  });

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

    expect(text).toBeFalsy();
  });

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

    if (text) {
      const body = JSON.parse(text);
      expect(body.token || null).toBeNull(); // Espera um body vazio ou ausência de token
    }
  });
});