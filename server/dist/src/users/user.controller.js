"use strict";
/**
 * @description Defines the controller for the User object.
 * @author Axel Galicia - axelgalicia@gmail.com
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = require("./user.model");
var joi_1 = __importDefault(require("joi"));
var FIRST_NAME_INPUT_FIELD = "First Name";
var LAST_NAME_INPUT_FIELD = "Last Name";
var COUNTRY_INPUT_FIELD = "Country";
var REFERRED_BY_INPUT_FIELD = "ReferredBy";
var userInputSchema = joi_1.default.object((_a = {},
    _a[FIRST_NAME_INPUT_FIELD] = joi_1.default.string().required(),
    _a[LAST_NAME_INPUT_FIELD] = joi_1.default.string().required(),
    _a[COUNTRY_INPUT_FIELD] = joi_1.default.string().alphanum().min(2).max(4).required(),
    _a.email = joi_1.default.string().email().required(),
    _a.dob = joi_1.default.date().required(),
    _a.mfa = joi_1.default.string(),
    _a.amt = joi_1.default.number().min(0).required(),
    _a.createdDate = joi_1.default.date().required(),
    _a[REFERRED_BY_INPUT_FIELD] = joi_1.default.string().allow(null),
    _a));
/**
 * Converts IUserInput to IUser
 *
 * @param {IUserInput} userInput The user's input from request
 * @param {Joi.Schema} userInputSchema The schema against to validate input
 * @return {IUser} Returns a new User object mapped
 */
var buildFromInput = function (userInput, userInputSchema) {
    joi_1.default.assert(userInput, userInputSchema);
    var email = userInput.email, mfa = userInput.mfa, amt = userInput.amt;
    var firstName = userInput[FIRST_NAME_INPUT_FIELD];
    var lastName = userInput[LAST_NAME_INPUT_FIELD];
    var countryCode = userInput[COUNTRY_INPUT_FIELD];
    var referredBy = userInput[REFERRED_BY_INPUT_FIELD];
    var dob = Date.parse(userInput.dob);
    var createdDate = Date.parse(userInput.createdDate);
    return new user_model_1.User({ firstName: firstName, lastName: lastName, countryCode: countryCode, email: email, dob: dob, mfa: mfa, amt: amt, createdDate: createdDate, referredBy: referredBy });
};
/**
 * Queries User collection
 *
 *
 * @param {IUserInput} userInput IUserInput object to be inserted into the db
 * @returns {UserDoc[]} Returs the array of UserDocs matching the query
 */
var findAllUsers = function (filters) { return __awaiter(void 0, void 0, void 0, function () {
    var matchedUsers, query, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                matchedUsers = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log('sortBy: ', filters.sortBy);
                query = user_model_1.User.find();
                // Like Filters
                filterLikeBy('firstName', filters, query);
                filterLikeBy('lastName', filters, query);
                // Exact Match
                filterByEquals('countryCode', filters, query);
                filterByEquals('mfa', filters, query);
                // Sorting
                sortBy(filters.sortBy, query);
                return [4 /*yield*/, query.exec()];
            case 2:
                matchedUsers = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                throw error_1;
            case 4: return [2 /*return*/, matchedUsers];
        }
    });
}); };
/**
 * Inserts a bulk array of IUserInput objects into the db
 * If record already exists based on unique key, this will
 * be skipped but the response will refer that record as not
 * inseted due to duplicate key.
 *
 * @param {IUserInput[]} userInputs Array of IUserInput to insert into the db
 * @returns {any} Returs MongoDB report of insertions
 */
var insertBulkUsers = function (userInputs) { return __awaiter(void 0, void 0, void 0, function () {
    var mappedUsers;
    return __generator(this, function (_a) {
        try {
            mappedUsers = userInputs.map(function (userInput) {
                return buildFromInput(userInput, userInputSchema);
            });
            return [2 /*return*/, user_model_1.User.insertMany(mappedUsers, { ordered: false, rawResult: true })
                    .then(function (data) {
                    return data;
                }).catch(function (error) {
                    return error;
                })];
        }
        catch (error) {
            throw error;
        }
        return [2 /*return*/];
    });
}); };
/**
 * Inserts a IUserInput object to the db
 *
 *
 * @param {IUserInput} userInput IUserInput object to be inserted into the db
 * @returns {UserDoc} Returs the inserted UserDoc object including _Id
 */
var createUser = function (userInput) { return __awaiter(void 0, void 0, void 0, function () {
    var newUserDoc, userDoc, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newUserDoc = new user_model_1.User();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                userDoc = buildFromInput(userInput, userInputSchema);
                return [4 /*yield*/, user_model_1.User.create(userDoc)];
            case 2:
                newUserDoc = _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                throw error_2;
            case 4: return [2 /*return*/, newUserDoc];
        }
    });
}); };
/**
 * Deletes all users in the collection users
 *
 * -- TESTING PURPOSES --
 *
 * @param {IUserInput} userInput IUserInput object to be inserted into the db
 * @returns {UserDoc} Returs the inserted UserDoc object including _Id
 */
var deleteAllUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.User.deleteMany()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                throw error_3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var filterByEquals = function (fieldName, filters, query) {
    if (isFilterPresent(fieldName, filters)) {
        query.where(fieldName).equals(filters[fieldName]);
    }
};
var filterLikeBy = function (fieldName, filters, query) {
    if (isFilterPresent(fieldName, filters)) {
        query.where(fieldName, { $regex: filters[fieldName], $options: 'i' });
    }
};
var sortBy = function (sortByFields, query) {
    if (!!sortByFields) {
        validateSorting(sortByFields);
        var sortByArray = convertToSortByArray(sortByFields);
        querySort(sortByArray, query);
    }
};
var validateSorting = function (sortByFields) {
    if (!sortByFields)
        return;
    Object.values(sortByFields).map(function (orderType) {
        validateOrderType(orderType);
    });
};
var convertToSortByArray = function (sortByFields) {
    var sortByArray = [];
    if (!!sortByFields.amt) {
        sortByArray.push(['amt', sortByFields.amt]);
    }
    if (!!sortByFields.createdDate) {
        sortByArray.push(['createdDate', sortByFields.createdDate]);
    }
    return sortByArray;
};
var validateOrderType = function (orderType) {
    if (!orderType || (orderType !== 'asc' && orderType !== 'desc')) {
        throw new Error('Invalid sorting type, allowed [asc, desc]');
    }
};
var isFilterPresent = function (fieldName, filters) {
    return !!filters[fieldName];
};
var querySort = function (sortByArray, query) {
    query.sort(sortByArray);
};
exports.default = { createUser: createUser, insertBulkUsers: insertBulkUsers, deleteAllUsers: deleteAllUsers, findAllUsers: findAllUsers };
