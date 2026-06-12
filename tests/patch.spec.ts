import {test, expect} from '@playwright/test';
import * as fs from 'fs';

function readjsonfile(filepath: string) {
 return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}
test('update booking', async ({request}) => {

    const requestbody = readjsonfile('testdata/postrequest.json');
    const response = await request.post('/booking',{data:requestbody});
    expect(response.ok()).toBeTruthy();
    const responsebody = await response.json();
    const bookingid = responsebody.bookingid;
    console.log(bookingid);
    
    const tokenbody = readjsonfile('testdata/tokenrequest.json');
    const tokenresponse = await request.post('/auth',{data:tokenbody});
    expect(tokenresponse.ok()).toBeTruthy();
    const token = await tokenresponse.json();
    const token1body = token.token;
    console.log(token1body);

    const updaterequest = readjsonfile('testdata/patchrequest.json');
    const updateres= await request.patch(`/booking/${bookingid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token1body}`
        },
        data: updaterequest
    });
    expect(updateres.ok()).toBeTruthy();
    expect(updateres.status()).toBe(200);
    const updateresponsebody = await updateres.json();
    console.log(updateresponsebody);
    const del = await request.delete(`/booking/${bookingid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${token1body}`
        },
    });
    expect(del.ok()).toBeTruthy();
    expect(del.status()).toBe(200);
    expect(del.statusText()).toBe('Created');
    console.log(del.statusText());

});