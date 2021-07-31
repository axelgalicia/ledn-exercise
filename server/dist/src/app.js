"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = require("body-parser");
var user_route_1 = require("./users/user.route");
var connect_1 = require("./mongodb/connect");
var logger_1 = require("./logger/logger");
var global_config_1 = __importDefault(require("./global.config"));
var app = express_1.default();
app.use(body_parser_1.json());
app.use(user_route_1.userRouter);
connect_1.ConnectToMongoDB();
app.listen(global_config_1.default.APP_PORT, function () {
    logger_1.Logger.info("Server is listening on port " + global_config_1.default.APP_PORT);
});
process.on('SIGINT', function () {
    logger_1.Logger.info('Kill signal received');
});
