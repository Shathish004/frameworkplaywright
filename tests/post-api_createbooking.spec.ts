import {test, expect} from '@playwright/test';
test('create booking', async ({request}) => {
    const requestBody = {

    firstname : "Jim",
    lastname : "Brown",
    totalprice : 111,
    depositpaid : true,
    bookingdates : {
        checkin : "2018-01-01",
        checkout : "2019-01-01"
    },
additionalneeds : "Breakfast"
}
    const response = await request.post("/booking",{data:requestBody});
    const responsebody = await response.json();
    console.log(responsebody);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responsebody).toHaveProperty("bookingid");
    expect(responsebody).toHaveProperty("booking");
    expect(responsebody).toHaveProperty("booking.bookingdates");
    expect(responsebody).toHaveProperty("booking.additionalneeds");
    expect(responsebody.booking).toHaveProperty("additionalneeds", "Breakfast");

    const booking = responsebody.booking;
    expect(booking).toMatchObject({
        firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true
})

expect(booking.bookingdates).toMatchObject({
    checkin: "2019-01-01",
    checkout: "2019-01-01"
})

});
