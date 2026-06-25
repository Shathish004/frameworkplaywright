"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.test = void 0;
const test_1 = require("@playwright/test");
const request_handler_1 = require("../utils/request-handler");
const loggers_1 = require("./loggers");
const custom_expect_1 = require("../utils/custom-expect");
const api_test_config_1 = require("../utils/api-test-config");
exports.test = test_1.test.extend({
    api: async ({ request }, use) => {
        const logger = new loggers_1.APILogger;
        (0, custom_expect_1.setExpectCustomLogger)(logger);
        const reportHandler = new request_handler_1.ReportHandler(request, api_test_config_1.config.apiurl, logger);
        await use(reportHandler);
    },
    config: async ({}, use) => [
        await use(api_test_config_1.config)
    ]
});
var test_2 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_2.expect; } });
