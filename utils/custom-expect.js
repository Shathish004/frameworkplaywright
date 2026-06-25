"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.setExpectCustomLogger = void 0;
const test_1 = require("@playwright/test");
let apilogger;
const setExpectCustomLogger = (logger) => {
    apilogger = logger;
};
exports.setExpectCustomLogger = setExpectCustomLogger;
exports.expect = test_1.expect.extend({
    shouldEqual(received, expected) {
        let pass;
        let logs = '';
        try {
            //const expectation = this.isNot ? baseExpect(locator).not : baseExpect(locator);
            (0, test_1.expect)(received).toEqual(expected);
            pass = true;
        }
        catch (e) {
            pass = false;
            logs = apilogger.getRescentLogs();
        }
        const hint = this.isNot ? 'not' : '';
        const message = this.utils.matcherHint('shouldEqual', undefined, undefined, { isNot: this.isNot }) +
            '\n\n' +
            `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
            `Received: ${this.utils.printReceived(received)}\n\n` +
            `recent activity:\n${logs}`;
        return {
            message: () => message,
            pass
        };
    }
});
