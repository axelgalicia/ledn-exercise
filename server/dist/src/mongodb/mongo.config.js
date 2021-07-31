"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MONGO_USER = process.env.LEDN_MONGO_USER;
var MONGO_PASSWORD = process.env.LEDN_MONGO_PASSWORD;
var MONGO_HOSTNAME = process.env.LEDN_MONGO_HOSTNAME;
var MONGO_PORT = process.env.LEDN_MONGO_PORT;
var MONGO_DB = process.env.LEDN_MONGO_DB;
exports.default = {
    MONGO_USER: MONGO_USER,
    MONGO_PASSWORD: MONGO_PASSWORD,
    MONGO_HOSTNAME: MONGO_HOSTNAME,
    MONGO_PORT: MONGO_PORT,
    MONGO_DB: MONGO_DB,
};
