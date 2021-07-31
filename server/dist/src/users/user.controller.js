"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var user_model_1 = require("./user.model");
var Joi = __importStar(require("joi"));
var FIRST_NAME_INPUT_FIELD = "First Name";
var LAST_NAME_INPUT_FIELD = "Last Name";
var COUNTRY_INPUT_FIELD = "Country";
var REFERRED_BY_INPUT_FIELD = "ReferredBy";
var userDocSchemaValidator = Joi.object({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    countryCode: Joi.string().alphanum().min(2).required(),
    email: Joi.string().email().required(),
    dob: Joi.date().required(),
    mfa: Joi.string().alphanum(),
    amt: Joi.number().min(0).required(),
    createdDate: Joi.date().required()
});
var buildFromInput = function (attr) {
    var email = attr.email, mfa = attr.mfa, amt = attr.amt;
    var firstName = attr[FIRST_NAME_INPUT_FIELD];
    var lastName = attr[LAST_NAME_INPUT_FIELD];
    var countryCode = attr[COUNTRY_INPUT_FIELD];
    var referredBy = attr[REFERRED_BY_INPUT_FIELD];
    var dob = Date.parse(attr.dob);
    var createdDate = Date.parse(attr.createdDate);
    return new user_model_1.User({ firstName: firstName, lastName: lastName, countryCode: countryCode, email: email, dob: dob, mfa: mfa, amt: amt, createdDate: createdDate, referredBy: referredBy });
};
// const buildFromBulkInput = (userRequests: IUserInput[]): UserDoc[] => {
//     const mappedUsers = userRequests.map(user => {
//         return User.buildFromRequest(user)
//     });
//     return mappedUsers;
// }
var CreateUser = function (userInput) { return __awaiter(void 0, void 0, void 0, function () {
    var userDoc, newUserDoc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userDoc = buildFromInput(userInput);
                return [4 /*yield*/, user_model_1.User.create(userDoc)];
            case 1:
                newUserDoc = _a.sent();
                console.log('New user created:', newUserDoc);
                return [2 /*return*/, newUserDoc];
        }
    });
}); };
exports.default = { CreateUser: CreateUser };
