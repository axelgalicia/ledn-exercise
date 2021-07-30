"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToMongoDB = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = require("../logger/logger");
var MONGO_USER = process.env.MONGO_USER || 'ledn_admin';
var MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'ledn_password';
var MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || 'localhost';
var MONGO_PORT = process.env.MONGO_HOSTNAME || '27017';
var MONGO_DB = process.env.MONGO_DB || 'ledndb';
var MONGOOSE_URL = "mongodb://" + MONGO_HOSTNAME + ":" + MONGO_PORT + "/" + MONGO_DB + "?authSource=admin";
var ConnectToMongoDB = function () {
    mongoose_1.default.connect(MONGOOSE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: MONGO_USER,
        pass: MONGO_PASSWORD
    }).then(function () {
        return logger_1.Logger.info("Connected to " + MONGO_DB);
    }).catch(function (err) {
        logger_1.Logger.error("Could not connect to database :", err);
        return process.exit(1);
    });
};
exports.ConnectToMongoDB = ConnectToMongoDB;
mongoose_1.default.connection.on("disconnected", ConnectToMongoDB);
