import { APIRequest, APIRequestContext } from "playwright-core"
import { expect, Expect } from "playwright/test"
import { APILogger } from "./loggers"

export class ReportHandler{

    private request: APIRequestContext
    private logger: APILogger
     private baseurl!: string
     private apipath: string =''
     private basedefaulturl: string='https://conduit-api.bondaracademy.com/api'
     private queryparams : object = {}
     private apiheader : Record<string,string> = {}
     private apiBody : object = {}

    constructor(request:APIRequestContext,ApiBaseurl:string, logger:APILogger)
    {
        this.request = request
        this.basedefaulturl = ApiBaseurl
        this.logger = logger
    }

    url(url:string)
    {
       this.baseurl = url
       return this


    }
    path(path:string)
    {
      this.apipath = path
      return this
    }
    params(params:object)
    {
        this.queryparams = params
        return this

    }
    headers(headers:Record<string,string>)
    {
       this.apiheader = headers
       //console.log(this.apiheader)
       return this
    }
    body(body:object)
    {
         this.apiBody = body
         return this
    }

    async getrequest(statuscode:number) {
    const url = this.geturl();
    this.logger.logrequest('GET',url,this.apiheader)

    const response = await this.request.get(url, {
        headers: this.apiheader
    });

    const actualstatus = response.status()
    const responseBody = await response.json();
    this.logger.logresponse(actualstatus,responseBody)
    this.statuscodevalidator(actualstatus,statuscode,this.getrequest)


    expect(response.status()).toEqual(statuscode);

  

    return responseBody;
}

async postrequest(statuscode:number) {
    const url = this.geturl();
     this.logger.logrequest('POST',url,this.apiheader,this.apiBody)

    console.log(url);

    const response = await this.request.post(url, {
        headers: this.apiheader,
        data: this.apiBody
    });
     const actualstatus = response.status()
    const responseBody = await response.json();
    this.logger.logresponse(actualstatus,responseBody)
    this.statuscodevalidator(actualstatus,statuscode,this.getrequest)

    expect(actualstatus).toEqual(statuscode);

    return responseBody;
}

 async deleterequest(statuscode:number) {
    const url = this.geturl();

    console.log(url);

    const response = await this.request.delete(url, {
        headers: this.apiheader
    });
    expect(response.status()).toEqual(statuscode);
}

    private geturl()
    {
        const url = new URL(`${this.baseurl?? this.basedefaulturl}${this.apipath}`)
        for(const [key,value] of Object.entries(this.queryparams))
        {
            url.searchParams.append(key,value)
        }
        return url.toString()
    }

    private statuscodevalidator(actualstatus:number,expectedstatus: number, callingmethod: Function)
    {
        if(actualstatus!=expectedstatus)
        {
              const logs = this.logger.getRescentLogs();
              const error = new Error(`Expectedstatus${expectedstatus}but got ${actualstatus}\n\n recent activity\n ${logs}`)
              Error.captureStackTrace(error,callingmethod)
              throw error
              
        }
    }
}