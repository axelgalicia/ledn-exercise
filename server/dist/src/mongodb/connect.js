"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToMongoDB = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = require("../logger/logger");
var mongodb_config_1 = require("./mongodb.config");
var ConnectToMongoDB = function () {
    var MONGOOSE_URL = "mongodb://" + mongodb_config_1.mongoConfig.hostname + ":" + mongodb_config_1.mongoConfig.port + "/" + mongodb_config_1.mongoConfig.db + "?authSource=admin";
    mongoose_1.default.connect(MONGOOSE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: mongodb_config_1.mongoConfig.user,
        pass: mongodb_config_1.mongoConfig.password
    }).then(function () {
        return logger_1.Logger.info("Connected to " + mongodb_config_1.mongoConfig.db);
    }).catch(function (err) {
        logger_1.Logger.error("Could not connect to database :", err);
        return process.exit(1);
    });
};
exports.ConnectToMongoDB = ConnectToMongoDB;
mongoose_1.default.connection.on("disconnected", ConnectToMongoDB);
