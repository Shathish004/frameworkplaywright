import { test, expect } from '@playwright/test';
import fs from 'fs';
import { default as config } from '../defineconfig';

const getBaseURL = (projectName: string): string | undefined => {
  const project = config.projects?.find((p: any) => p.name === projectName);
  return project?.use?.baseURL;
};

// Usage in test
const baseURL = getBaseURL('staging')!;


test('create booking', async ({ request }) => {
  const json = 'testdata/postrequest.json';
  const requestBody = JSON.parse(fs.readFileSync(json, 'utf-8'));

  const response = await request.post(`${baseURL}/booking`, { data: requestBody });
  const responsebody = await response.json();
  console.log(responsebody);
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  expect(responsebody).toHaveProperty('bookingid');
  expect(responsebody).toHaveProperty('booking');
  expect(responsebody).toHaveProperty('booking.bookingdates');
  expect(responsebody).toHaveProperty('booking.additionalneeds');
  expect(responsebody.booking).toHaveProperty('additionalneeds', 'Breakfast');

  const booking = responsebody.booking;
  expect(booking).toMatchObject({
    firstname: requestBody.firstname,
    lastname: requestBody.lastname,
    totalprice: requestBody.totalprice,
    depositpaid: true,
  });

  expect(booking.bookingdates).toMatchObject({
    checkin: requestBody.bookingdates.checkin,
    checkout: requestBody.bookingdates.checkout,
  });
});
