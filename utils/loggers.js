"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APILogger = void 0;
class APILogger {
    constructor() {
        this.recentLogs = [];
    }
    logrequest(method, url, headers, body) {
        const logentry = { method, url, headers, body };
        this.recentLogs.push({ type: 'Request Details', data: logentry });
    }
    logresponse(statuscode, body) {
        const logentry = { statuscode, body };
        this.recentLogs.push({ type: 'Response Details', data: logentry });
    }
    getRescentLogs() {
        return this.recentLogs
            .map(log => {
            return `==${log.type}==\n${JSON.stringify(log.data, null, 4)}`;
        })
            .join('\n\n');
    }
}
exports.APILogger = APILogger;
