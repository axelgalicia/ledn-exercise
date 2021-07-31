"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConfig = void 0;
var MONGO_USER = process.env.LEDN_MONGO_USER;
var MONGO_PASSWORD = process.env.LEDN_MONGO_PASSWORD;
var MONGO_HOSTNAME = process.env.LEDN_MONGO_HOSTNAME;
var MONGO_PORT = process.env.LEDN_MONGO_PORT;
var MONGO_DB = process.env.LEDN_MONGO_DB;
exports.mongoConfig = {
    hostname: MONGO_HOSTNAME,
    port: MONGO_PORT,
    user: MONGO_USER,
    password: MONGO_PASSWORD,
    db: MONGO_DB
};
