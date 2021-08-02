"use strict";
/**
 * App Configuration properties
 *
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
var APP_PORT = (_a = process.env.LEDN_PORT) !== null && _a !== void 0 ? _a : '3000';
var DEFAULT_PAGE_SIZE = (_b = process.env.LEDN_DEFAULT_PAGE_SIZE) !== null && _b !== void 0 ? _b : '20';
exports.appConfig = {
    appPort: APP_PORT,
    defaultPageSize: DEFAULT_PAGE_SIZE
};
