"use strict";
/**
 *  Defines an Erron handler class to properly return formatted errors
 *  to the user.
 *
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
var logger_1 = require("../logger/logger");
var uuid_1 = require("uuid");
var ErrorHandler = /** @class */ (function () {
    function ErrorHandler() {
    }
    /**
     *
     * Handles all errors comming from next() call
     *
     * @param error The Error object
     * @param req Http Request
     * @param res Http Response
     * @param next Next Function Callback
     *
     */
    ErrorHandler.prototype.handleError = function (error, req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handleMongooseError(error, res, next)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.handleValidationError(error, res, next)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.handleOtherError(error, res, next)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    /**
     *
     * Handles all errors matching MongoDB from next() call
     *
     * @param error The Error object
     * @param res Http Response
     * @param next Next Function Callback
     *
     */
    ErrorHandler.prototype.handleMongooseError = function (error, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var trackingCode, responseError;
            return __generator(this, function (_a) {
                if (this.isMongoError(error)) {
                    trackingCode = uuid_1.v4();
                    responseError = this.getMongoErrorResponse(error, trackingCode);
                    logger_1.Logger.child({ trackingCode: trackingCode }).error(responseError);
                    res.status(500).json(responseError);
                }
                else {
                    next(error);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * Handles all errors matching ValidationError from Joi JS from next() call
     *
     * @param error The Error object
     * @param res Http Response
     * @param next Next Function Callback
     *
     */
    ErrorHandler.prototype.handleValidationError = function (error, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var trackingCode, responseError;
            return __generator(this, function (_a) {
                if (this.isValidationError(error)) {
                    trackingCode = uuid_1.v4();
                    responseError = this.getValidationErrorResponse(error, trackingCode);
                    logger_1.Logger.child({ trackingCode: trackingCode }).error(responseError);
                    res.status(500).json(responseError);
                }
                else {
                    next(error);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     *
     * Handles all errors not handled from others handlers
     *
     * @param error The Error object
     * @param res Http Response
     * @param next Next Function Callback
     *
     */
    ErrorHandler.prototype.handleOtherError = function (error, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var trackingCode, responseError;
            return __generator(this, function (_a) {
                trackingCode = uuid_1.v4();
                console.log('ERROR INSIDE HANDLER', error);
                responseError = this.getGenericErrorResponse(error, trackingCode);
                logger_1.Logger.child({ trackingCode: trackingCode }).error(responseError);
                res.status(500).json(responseError);
                return [2 /*return*/];
            });
        });
    };
    ErrorHandler.prototype.containsName = function (error) {
        return !!error.name;
    };
    ErrorHandler.prototype.isMongoError = function (error) {
        return this.containsName(error) && error.name === ErrorHandler.MONGO_ERROR;
    };
    ErrorHandler.prototype.isValidationError = function (error) {
        return this.containsName(error) && error.name === ErrorHandler.VALIDATION_ERROR;
    };
    ErrorHandler.prototype.getValidationErrorResponse = function (error, trackingCode) {
        var errorResponse = {
            type: ErrorHandler.VALIDATION_ERROR,
            details: error.details,
            trackingCode: trackingCode,
        };
        return errorResponse;
    };
    ErrorHandler.prototype.getMongoErrorResponse = function (error, trackingCode) {
        var errorResponse = {
            type: ErrorHandler.MONGO_ERROR,
            details: {
                message: 'Error in MongoDB',
                detail: error.message
            },
            trackingCode: trackingCode,
        };
        return errorResponse;
    };
    ErrorHandler.prototype.getGenericErrorResponse = function (error, trackingCode) {
        var errorResponse = {
            type: ErrorHandler.GENERIC_ERROR,
            details: {
                message: 'Generic error',
                detail: error.message
            },
            trackingCode: trackingCode,
        };
        return errorResponse;
    };
    ErrorHandler.MONGO_ERROR = 'MongoError';
    ErrorHandler.VALIDATION_ERROR = 'ValidationError';
    ErrorHandler.GENERIC_ERROR = 'GenericError';
    return ErrorHandler;
}());
exports.handler = new ErrorHandler();
