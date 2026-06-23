import { appendFile } from 'node:fs'
import { test } from '../utils/fixtures'
import { expect} from "../utils/custom-expect"
import { APILogger } from '../utils/loggers'
import { createtoken } from "../helpers/createToken"

let token: string


test.beforeAll("token generation", async ({ api,config }) => {



    token = await createtoken(api,config.useremail,config.userpassword)



});

// test('Api logger', ()=>
// {
//     const logger = new APILogger()
//     logger.logrequest('GET','https://www.apitest.com',{Authorization: 'token'}, {foo:'bar'})
//     logger.logresponse(200,{foo: 'bar'})
//     const logs = logger.getRescentLogs()
//     console.log(logs)

// })

test('new framework', async ({ api }) => {
    const response = await api
        //.url('https://conduittttt-api.bondaracademy.com/api')
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getrequest(200)
    console.log(response)
    expect(response.articles.length).shouldEqual(10)
})

test('expect tags', async ({ api }) => {
    const res = await api.path('/tags').getrequest(200)
    console.log(res)
})

test('create and delete article', async ({ api }) => {
    const articleres = await api
        .path('/articles')
        .headers({ Authorization: token })
        .body({
            article: {
                title: "uniqueTitle",
                description: "testing",
                body: "we are good",
                tagList: ["good"]
            }
        }).postrequest(201)
    expect(articleres.article.title).toBe("uniqueTitle");
    const slugid = articleres.article.slug
     const response = await api
        //.url('https://conduittttt-api.bondaracademy.com/api')
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .headers({ Authorization: token })
        .getrequest(200)

        expect(response.articles[0].title).toEqual('uniqueTitle');

        await api.path(`/articles/${slugid}`).headers({ Authorization: token }).deleterequest(204)

})