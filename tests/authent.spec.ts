import {test, expect} from '@playwright/test';
test('autentication', async ({request}) => {

    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1')
    expect(response.ok()).toBeTruthy();
    const resdata =await  response.json();
    console.log(resdata);
});

test('basic autentication', async ({request}) => {

    const response = await request.get("https://httpbin.org/basic-auth/user/pass", {
        headers: {
            Authorization: `Basic ${Buffer.from("user:pass").toString('base64')}`
        }

    });
    expect(response.ok()).toBeTruthy();

});