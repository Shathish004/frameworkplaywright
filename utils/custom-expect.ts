import { expect as baseExpect } from '@playwright/test'
import { APILogger } from './loggers'
import { setDefaultCACertificates } from 'node:tls'

let apilogger: APILogger

export const setExpectCustomLogger = (logger: APILogger) => {
    apilogger = logger
}

declare global {
    namespace PlaywrightTest
    {
        interface Matchers<R,T>
        {
            shouldEqual(Expected:T): R
        }
    }
}

export const expect = baseExpect.extend({

    shouldEqual(received: any, expected: any) {
        let pass: boolean
        let logs: string = ''
        try {
            //const expectation = this.isNot ? baseExpect(locator).not : baseExpect(locator);
            baseExpect(received).toEqual(expected);
            pass = true;
        } catch (e: any) {
            pass = false;
            logs = apilogger.getRescentLogs()
        }

        const hint = this.isNot ? 'not' : ''
        const message = this.utils.matcherHint('shouldEqual', undefined, undefined, { isNot: this.isNot }) +
            '\n\n' +
            `Expected: ${hint} ${this.utils.printExpected(expected)}\n` +
            `Received: ${this.utils.printReceived(received)}\n\n` + 
            `recent activity:\n${logs}`
        return {
            message: () => message,
            pass
        };


    }



})