"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportHandler = void 0;
const test_1 = require("playwright/test");
class ReportHandler {
    constructor(request, ApiBaseurl, logger) {
        this.apipath = '';
        this.basedefaulturl = 'https://conduit-api.bondaracademy.com/api';
        this.queryparams = {};
        this.apiheader = {};
        this.apiBody = {};
        this.request = request;
        this.basedefaulturl = ApiBaseurl;
        this.logger = logger;
    }
    url(url) {
        this.baseurl = url;
        return this;
    }
    path(path) {
        this.apipath = path;
        return this;
    }
    params(params) {
        this.queryparams = params;
        return this;
    }
    headers(headers) {
        this.apiheader = headers;
        //console.log(this.apiheader)
        return this;
    }
    body(body) {
        this.apiBody = body;
        return this;
    }
    async getrequest(statuscode) {
        const url = this.geturl();
        this.logger.logrequest('GET', url, this.apiheader);
        const response = await this.request.get(url, {
            headers: this.apiheader
        });
        const actualstatus = response.status();
        const responseBody = await response.json();
        this.logger.logresponse(actualstatus, responseBody);
        this.statuscodevalidator(actualstatus, statuscode, this.getrequest);
        (0, test_1.expect)(response.status()).toEqual(statuscode);
        return responseBody;
    }
    async postrequest(statuscode) {
        const url = this.geturl();
        this.logger.logrequest('POST', url, this.apiheader, this.apiBody);
        console.log(url);
        const response = await this.request.post(url, {
            headers: this.apiheader,
            data: this.apiBody
        });
        const actualstatus = response.status();
        const responseBody = await response.json();
        this.logger.logresponse(actualstatus, responseBody);
        this.statuscodevalidator(actualstatus, statuscode, this.getrequest);
        (0, test_1.expect)(actualstatus).toEqual(statuscode);
        return responseBody;
    }
    async deleterequest(statuscode) {
        const url = this.geturl();
        console.log(url);
        const response = await this.request.delete(url, {
            headers: this.apiheader
        });
        (0, test_1.expect)(response.status()).toEqual(statuscode);
    }
    geturl() {
        const url = new URL(`${this.baseurl ?? this.basedefaulturl}${this.apipath}`);
        for (const [key, value] of Object.entries(this.queryparams)) {
            url.searchParams.append(key, value);
        }
        return url.toString();
    }
    statuscodevalidator(actualstatus, expectedstatus, callingmethod) {
        if (actualstatus != expectedstatus) {
            const logs = this.logger.getRescentLogs();
            const error = new Error(`Expectedstatus${expectedstatus}but got ${actualstatus}\n\n recent activity\n ${logs}`);
            Error.captureStackTrace(error, callingmethod);
            throw error;
        }
    }
}
exports.ReportHandler = ReportHandler;
