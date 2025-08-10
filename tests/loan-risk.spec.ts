import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanRiskDto } from './dto/loan-risk.dto'

test('Receive Status OK with different loan period', async ({ request }) => {
  for ( let i = 0; i < 5; i++) {
    const requestBody = LoanRiskDto.createRequestWithRandomLoanPeriod();
    const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
      data: requestBody,
    })
    console.log('request body: ', requestBody);
    console.log('response status:', response.status())
    console.log('response body:', await response.json())
    expect.soft(response.status()).toBe(StatusCodes.OK)
  }
})

test('Receive Status OK with defferent age', async ({ request }) => {
  for ( let i = 0; i < 5; i++) {
    const requestBody = LoanRiskDto.createRequestWithRandomAge();
    const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
      data: requestBody,
    })
    console.log('request body: ', requestBody);
    console.log('response status:', response.status())
    console.log('response body:', await response.json())
    expect.soft(response.status()).toBe(StatusCodes.OK)
  }
})

test('Receive Status Bad request applying negative age', async ({ request }) => {
  const requestBody = LoanRiskDto.createNegativeAge(-17);
  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: requestBody,
  })
  console.log('request body: ', requestBody);
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Receive Status Bad request applying 0 in the each field', async ({ request }) => {
  const requestBody = LoanRiskDto.createAllDataNUll();
  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: requestBody,
  })
  console.log('request body: ', requestBody);
  console.log('response status:', response.status())
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Receive negative decision with employ false', async ({ request }) => {
  const requestBody = LoanRiskDto.createNoEmploy();
  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: requestBody,
  })
  console.log('request body: ', requestBody);
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)
})

test('Receive positive decision', async ({ request }) => {
  const requestBody = LoanRiskDto.createPositiveDecision();
  const response = await request.post('https://backend.tallinn-learning.ee/api/loan-calc/decision', {
    data: requestBody,
  })
  console.log('request body: ', requestBody);
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect.soft(response.status()).toBe(StatusCodes.OK)
})



