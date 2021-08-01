/**
 * @description Defines the controller for the User object.
 * @author Axel Galicia - axelgalicia@gmail.com
 */

import { UserDoc, User } from "./user.model";
import Joi from 'joi';
import { truncate } from "fs/promises";


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

const userInputSchema = Joi.object({
    [FIRST_NAME_INPUT_FIELD]: Joi.string().required(),
    [LAST_NAME_INPUT_FIELD]: Joi.string().required(),
    [COUNTRY_INPUT_FIELD]: Joi.string().alphanum().min(2).max(4).required(),
    email: Joi.string().email().required(),
    dob: Joi.date().required(),
    mfa: Joi.string(),
    amt: Joi.number().min(0).required(),
    createdDate: Joi.date().required(),
    [REFERRED_BY_INPUT_FIELD]: Joi.string().allow(null),
});


/**
 * Converts IUserInput to IUser
 * 
 * @param {IUserInput} userInput The user's input from request 
 * @param {Joi.Schema} userInputSchema The schema against to validate input
 * @return {IUser} Returns a new User object mapped
 */
const buildFromInput = (userInput: IUserInput, userInputSchema: Joi.Schema): UserDoc => {
    Joi.assert(userInput, userInputSchema);
    const { email, mfa, amt } = userInput;
    const firstName = userInput[FIRST_NAME_INPUT_FIELD];
    const lastName = userInput[LAST_NAME_INPUT_FIELD];
    const countryCode = userInput[COUNTRY_INPUT_FIELD];
    const referredBy = userInput[REFERRED_BY_INPUT_FIELD];
    const dob = Date.parse(userInput.dob);
    const createdDate = Date.parse(userInput.createdDate);

    return new User({ firstName, lastName, countryCode, email, dob, mfa, amt, createdDate, referredBy });
}

const insertBulkUsers = async (userRequests: IUserInput[]): Promise<any> => {
    let usersSaved: any = {};

    try {
        const mappedUsers: UserDoc[] = userRequests.map(userInput => {
            return buildFromInput(userInput, userInputSchema);
        });

        return User.insertMany(mappedUsers, { ordered: false, rawResult: true })
            .then(data => {
                return data;
            }).catch(error => {
                return error;
            });
    } catch (error) {
        throw error;
    }
}

const createUser = async (userInput: IUserInput): Promise<UserDoc> => {
    let newUserDoc: UserDoc = new User();
    try {
        const userDoc: UserDoc = buildFromInput(userInput, userInputSchema);
        newUserDoc = await User.create(userDoc);
    } catch (error) {
        throw error;
    }
    return newUserDoc;
}

export default { createUser, insertBulkUsers }