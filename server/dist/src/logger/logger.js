"use strict";
/**
 *  Component to define the global Logger
 *              for the application.
 *
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var pino_1 = __importDefault(require("pino"));
var Logger = pino_1.default({
    prettyPrint: true
});
exports.Logger = Logger;
