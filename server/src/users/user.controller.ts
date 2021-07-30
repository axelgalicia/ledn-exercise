import { UserDoc, User } from "./user.model";
import * as Joi from 'joi';


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

const userDocSchemaValidator = Joi.object({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    countryCode: Joi.string().alphanum().min(2).required(),
    email: Joi.string().email().required(),
    dob: Joi.date().required(),
    mfa: Joi.string().alphanum(),
    amt: Joi.number().min(0).required(),
    createdDate: Joi.date().required()

})

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

const CreateUser = async (userInput: IUserInput) => {
    const userDoc = buildFromInput(userInput);
    userDocSchemaValidator.validate(userDoc);
    return await User.create(userDoc);
}

export default { CreateUser }