import { test, expect } from '@playwright/test';
// @ts-ignore: runtime-only import without types for luxon
import { DateTime } from 'luxon';
import fs from 'fs';
import { faker } from '@faker-js/faker';



test('create booking', async ({ request }) => {

  const firstname = faker.person.firstName();
  const lastname = faker.person.lastName();
  const totalprice = faker.number.int({ min: 50, max: 500 });
  const depositpaid = faker.datatype.boolean();
  const checkin = DateTime.now().toFormat('yyyy-MM-dd');
  const checkout = DateTime.now().plus({ days: 7 }).toFormat('yyyy-MM-dd');


    const requestBody = {
        firstname: firstname,
        lastname: lastname,
        totalprice: totalprice,
        depositpaid: depositpaid,
        bookingdates: {
            checkin: checkin,
            checkout: checkout,
        },
        additionalneeds: 'Breakfast'
    };

    const response = await request.post('/booking', { data: requestBody });
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('bookingid');
    expect(responseBody).toHaveProperty('booking');
    expect(responseBody).toHaveProperty('booking.bookingdates');
    expect(responseBody).toHaveProperty('booking.additionalneeds');
    expect(responseBody.booking).toHaveProperty('additionalneeds', 'Breakfast');

  const booking = responseBody.booking;
  expect(booking).toMatchObject({
    firstname: requestBody.firstname,
    lastname: requestBody.lastname,
    totalprice: requestBody.totalprice,
    depositpaid: true,
  });

  expect(booking.bookingdates).toMatchObject({
    checkin: requestBody.bookingdates.checkin,
    checkout: requestBody.bookingdates.checkout,
  })
});
