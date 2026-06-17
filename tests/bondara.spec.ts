import { test, request, expect } from '@playwright/test'

let token: string


test.beforeAll("token generation", async({request})=>
{
 
  const loginRes = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            user: {
                email: "pwapiuser@test.com",
                password: "Welcome"
            }
        }
    });
    const tkres = await loginRes.json();
    token = 'Token ' + tkres.user.token;


})

test("Api get request", async ({ request }) => {
    const res = await request.get('https://conduit-api.bondaracademy.com/api/tags');
    const rebody = await res.json();
    console.log(rebody);
    expect(res.status()).toBe(200);
    expect(rebody.tags[0]).toBe("Test");
    const res1 = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
    const rebody2 = res1.json();
    console.log(rebody2);
});

test('Api test two', async ({ request }) => {
    const res1 = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
    const rebody2 = await res1.json();
    console.log(rebody2);
    expect(rebody2.articles.length).toBeGreaterThanOrEqual(10);

})

test('create article', async ({ request }) => {

    const uniqueTitle = `tested-${Date.now()}`; // ensures a unique slug each run

    const article = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
        data: {
            article: {
                title: uniqueTitle,
                description: "testing",
                body: "we are good",
                tagList: ["good"]
            }
        },
        headers: {
            Authorization: token
        }
    });

    const artres = await article.json();
    console.log(artres); // log the body first so a failure is debuggable

    expect(article.status()).toBe(201);
    expect(artres.article.title).toBe(uniqueTitle);
});

test('delete the request', async ({ request }) => {

    const uniqueTitle = `tested-${Date.now()}`;

    const createRes = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
        data: {
            article: {
                title: uniqueTitle,
                description: "testing",
                body: "we are good",
                tagList: ["good"]
            }
        },
        headers: { Authorization: token }
    });

    const artres = await createRes.json();
    expect(createRes.status()).toBe(201);

    const slug = artres.article.slug; // use the slug returned by the API, not a guessed string

    const del = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slug}`, {
        headers: { Authorization: token }
    });

    expect(del.status()).toBe(204);
})