import { expect, request, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'
import { OrderDto } from './dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

const jwtPattern = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/

test.describe('Tallinn delivery API tests', () => {
  test('login with correct data and verify auth token', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData()
    console.log('requestBody:', requestBody)
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const responseBody = await response.text()

    console.log('response code:', response.status())
    console.log('response body:', responseBody)
    expect(response.status()).toBe(StatusCodes.OK)
    expect(jwtPattern.test(responseBody)).toBeTruthy()
  })

  test('login with incorrect data and verify response code 401', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithIncorrectData()
    console.log('requestBody:', requestBody)
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: requestBody,
    })
    const responseBody = await response.text()

    console.log('response code:', response.status())
    console.log('response body:', responseBody)
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
    expect(responseBody).toBe('')
  })

  test('login with incorrect data using wrong PUT http method returns code 405', async ({ request }) => {
    const requestBody = LoginDto.createLoginWithCorrectData();
    console.log('requestBody:', requestBody);
    const response = await request.put(`${serviceURL}${loginPath}`, {
      data: requestBody,
    });
    const responseBody = await response.json();
    console.log('response code:', response.status());
    console.log('response body:', responseBody);
    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED);
    expect(responseBody.path).toBe(`/${loginPath}`);
  })

  test('login with incorrect data using wrong GET HTTP method returns code 405', async ({ request }) => {
    const response = await request.get(`${serviceURL}${loginPath}`);
    const responseBody = await response.json();

    console.log('response code:', response.status());
    console.log('response body:', responseBody);

    expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED);
    expect(responseBody.path).toBe(`/${loginPath}`);
  })

  test('unsuccessful login with incorrect data using empty body returns code 401', async ({ request }) => {
    const invalidRequestBody = {};
    console.log('invalid request body:', invalidRequestBody);
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: invalidRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseBody = await response.text();

    console.log('response code:', response.status());
    console.log('response body:', responseBody);
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED);
    expect(responseBody).toBe('');
  })
  test('unsuccessful login with incorrect data using null username and password returns code 401', async ({ request }) => {
    const invalidRequestBody = { username: null, password: null };
    console.log('invalid request body:', invalidRequestBody);
    const response = await request.post(`${serviceURL}${loginPath}`, {
      data: invalidRequestBody,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseBody = await response.text();

    console.log('response code:', response.status());
    console.log('response body:', responseBody);
    expect(response.status()).toBe(StatusCodes.UNAUTHORIZED);
    expect(responseBody).toBe('');
  });
})
