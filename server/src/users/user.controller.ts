/**
 * @description Defines the controller for the User object.
 * @author Axel Galicia - axelgalicia@gmail.com
 */

import { UserDoc, User } from "./user.model";
import Joi from 'joi';
import { Logger } from "../logger/logger";


const FIRST_NAME_INPUT_FIELD = "First Name";
const LAST_NAME_INPUT_FIELD = "Last Name";
const COUNTRY_INPUT_FIELD = "Country";
const REFERRED_BY_INPUT_FIELD = "ReferredBy";

interface IUserInput {
    [FIRST_NAME_INPUT_FIELD]: string,
    [LAST_NAME_INPUT_FIELD]: string,
    [COUNTRY_INPUT_FIELD]: string,
    email: string,
    dob: string,
    mfa?: string,
    amt: number,
    createdDate: string,
    [REFERRED_BY_INPUT_FIELD]?: string
}

const userInputSchemaValidator = Joi.object({
    [FIRST_NAME_INPUT_FIELD]: Joi.string().alphanum().required(),
    [LAST_NAME_INPUT_FIELD]: Joi.string().alphanum().required(),
    [COUNTRY_INPUT_FIELD]: Joi.string().alphanum().min(2).required(),
    email: Joi.string().email().required(),
    dob: Joi.date().required(),
    mfa: Joi.string().alphanum(),
    amt: Joi.number().min(0).required(),
    createdDate: Joi.date().required(),
    [REFERRED_BY_INPUT_FIELD]: Joi.string(),
})


/**
 * Converts IUserInput to IUser
 * 
 * @param {IUserInput} attr The user's input from request 
 * @return {IUser} Returns a new User object mapped
 */
const buildFromInput = (attr: IUserInput): UserDoc => {
    const { email, mfa, amt } = attr;
    const firstName = attr[FIRST_NAME_INPUT_FIELD];
    const lastName = attr[LAST_NAME_INPUT_FIELD];
    const countryCode = attr[COUNTRY_INPUT_FIELD];
    const referredBy = attr[REFERRED_BY_INPUT_FIELD];
    const dob = Date.parse(attr.dob);
    const createdDate = Date.parse(attr.createdDate);

    return new User({ firstName, lastName, countryCode, email, dob, mfa, amt, createdDate, referredBy });
}

// const buildFromBulkInput = (userRequests: IUserInput[]): UserDoc[] => {
//     const mappedUsers = userRequests.map(user => {
//         return User.buildFromRequest(user)
//     });
//     return mappedUsers;
// }

const createUser = async (userInput: IUserInput): Promise<UserDoc> => {
    let newUserDoc: UserDoc = new User();
    try {
        Joi.assert(userInput, userInputSchemaValidator);
        const userDoc: UserDoc = buildFromInput(userInput);
        newUserDoc = await User.create(userDoc);
    } catch (error) {
        throw error;
    }
    return newUserDoc;
}

export default { createUser }