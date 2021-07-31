"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectToMongoDB = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = require("../logger/logger");
var mongo_config_1 = __importDefault(require("./mongo.config"));
var MONGOOSE_URL = "mongodb://" + mongo_config_1.default.MONGO_HOSTNAME + ":" + mongo_config_1.default.MONGO_PORT + "/" + mongo_config_1.default.MONGO_DB + "?authSource=admin";
var ConnectToMongoDB = function () {
    mongoose_1.default.connect(MONGOOSE_URL, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: mongo_config_1.default.MONGO_USER,
        pass: mongo_config_1.default.MONGO_PASSWORD
    }).then(function () {
        return logger_1.Logger.info("Connected to " + mongo_config_1.default.MONGO_DB);
    }).catch(function (err) {
        logger_1.Logger.error("Could not connect to database :", err);
        return process.exit(1);
    });
};
exports.ConnectToMongoDB = ConnectToMongoDB;
mongoose_1.default.connection.on("disconnected", ConnectToMongoDB);
