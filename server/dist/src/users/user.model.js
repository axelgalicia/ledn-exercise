"use strict";
/**
 * Defines Mongoose User Model
 *
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var options = { discriminatorKey: 'email' };
var userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
        index: true,
    },
    lastName: {
        type: String,
        required: true,
        index: true,
    },
    countryCode: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    mfa: {
        type: String,
        index: true,
    },
    amt: {
        type: Number,
        required: true,
        index: true,
    },
    createdDate: {
        type: Date,
        required: true,
        index: true,
    },
    referredBy: {
        type: String,
    }
}, options);
userSchema.statics.build = function (attr) {
    return new User(attr);
};
var User = mongoose_1.default.model('User', userSchema);
exports.User = User;
