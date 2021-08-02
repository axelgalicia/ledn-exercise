"use strict";
/**
 * Contains methods to create MongoDB connection
 * using Mongoose JS Library.
 *
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToMongoDB = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = require("../logger/logger");
var mongodb_config_1 = require("./mongodb.config");
/**
 * Connects to MongoDB instace based on environment variables
 * gathered by mongoDBConfig
 *
 * @return {void}
 */
var ConnectToMongoDB = function () {
    var MONGOOSE_URL = "mongodb://" + mongodb_config_1.mongoDBConfig.hostname + ":" + mongodb_config_1.mongoDBConfig.port + "/" + mongodb_config_1.mongoDBConfig.db + "?authSource=admin";
    mongoose_1.default.connect(MONGOOSE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: mongodb_config_1.mongoDBConfig.user,
        pass: mongodb_config_1.mongoDBConfig.password
    }).then(function () {
        return logger_1.Logger.info("Connected to " + mongodb_config_1.mongoDBConfig.db);
    }).catch(function (err) {
        logger_1.Logger.error("Could not connect to database :", err);
        return process.exit(1);
    });
};
exports.ConnectToMongoDB = ConnectToMongoDB;
mongoose_1.default.connection.on("disconnected", ConnectToMongoDB);
