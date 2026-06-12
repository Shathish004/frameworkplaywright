import {test, expect} from '@playwright/test';
test('get booking by id', async ({request}) => {

    const bookingid = 911;
    const firstname = 'Jim';
    const lastname = 'Brown';

    const response = await request.get(`/booking/${bookingid}`);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
});

test.only('get booking by name', async ({request}) => {

    const firstname = 'Jim';
    const lastname = 'Brown';

    const response = await request.get("/booking",{params : {firstname, lastname}});
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody.length).toBeGreaterThan(0);

    for(const item of responseBody){

        expect(item).toHaveProperty('bookingid');
        expect(typeof item.bookingid).toBe('number');
        expect(item.bookingid).toBeGreaterThan(0);

    }

});