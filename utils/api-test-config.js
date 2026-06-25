"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const processEnV = process.env.TEST_ENV;
const env = processEnV || 'dev';
console.log('environment use' + env);
const config = {
    apiurl: 'https://conduit-api.bondaracademy.com/api',
    useremail: 'pwapiuser@test.com',
    userpassword: 'Welcome'
};
exports.config = config;
if (env === "qa") {
    config.useremail = "pwapr@test.com",
        config.userpassword = "Welcome";
}
