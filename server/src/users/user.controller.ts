/**
 * @description Defines the controller for the User object.
 * @author Axel Galicia - axelgalicia@gmail.com
 */

import { UserDoc, User } from "./user.model";
import Joi from 'joi';


const FIRST_NAME_INPUT_FIELD = "First Name";
const LAST_NAME_INPUT_FIELD = "Last Name";
const COUNTRY_INPUT_FIELD = "Country";
const REFERRED_BY_INPUT_FIELD = "ReferredBy";

type OrderType = 'asc' | 'desc' | undefined;
type SortByArray = [string, OrderType][];

interface IUserInput {
    [FIRST_NAME_INPUT_FIELD]: string;
    [LAST_NAME_INPUT_FIELD]: string;
    [COUNTRY_INPUT_FIELD]: string;
    email: string;
    dob: string;
    mfa?: string;
    amt: number;
    createdDate: string;
    [REFERRED_BY_INPUT_FIELD]?: string;
}

interface ISortByFields {
    amt?: OrderType;
    createdDate: OrderType;
}

interface IUserQueryFilters {
    firstName?: string;
    lastName?: string;
    sortBy?: ISortByFields;
    mfa?: string;
    countryCode?: string;
    limit?: number;
    skip?: number;
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


/**
 * Queries User collection
 * 
 * 
 * @param {IUserInput} userInput IUserInput object to be inserted into the db
 * @returns {UserDoc[]} Returs the array of UserDocs matching the query
 */
const findAllUsers = async (filters: IUserQueryFilters): Promise<UserDoc[]> => {
    let matchedUsers: UserDoc[] = [];
    try {

        let query = User.find();
        // Like Filters
        filterLikeBy('firstName', filters, query);
        filterLikeBy('lastName', filters, query);

        // Exact Match
        filterByEquals('countryCode', filters, query);
        filterByEquals('mfa', filters, query);

        // Sorting
        sortBy(filters.sortBy, query);

        matchedUsers = await query.exec();
    } catch (error) {
        throw error;
    }
    return matchedUsers;
}

/**
 * Inserts a bulk array of IUserInput objects into the db
 * If record already exists based on unique key, this will
 * be skipped but the response will refer that record as not
 * inseted due to duplicate key.
 * 
 * @param {IUserInput[]} userInputs Array of IUserInput to insert into the db
 * @returns {any} Returs MongoDB report of insertions
 */
const insertBulkUsers = async (userInputs: IUserInput[]): Promise<any> => {
    try {
        const mappedUsers: UserDoc[] = userInputs.map(userInput => {
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


/**
 * Inserts a IUserInput object to the db
 * 
 * 
 * @param {IUserInput} userInput IUserInput object to be inserted into the db
 * @returns {UserDoc} Returs the inserted UserDoc object including _Id
 */
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

/**
 * Deletes all users in the collection users
 * 
 * -- TESTING PURPOSES --
 * 
 * @param {IUserInput} userInput IUserInput object to be inserted into the db
 * @returns {UserDoc} Returs the inserted UserDoc object including _Id
 */
const deleteAllUsers = async (): Promise<void> => {
    try {
        await User.deleteMany();
    } catch (error) {
        throw error;
    }
}


const filterByEquals = (fieldName: string, filters: any, query: any): void => {
    if (isFilterPresent(fieldName, filters)) {
        query.where(fieldName).equals(filters[fieldName]);
    }
}

const filterLikeBy = (fieldName: string, filters: any, query: any): void => {
    if (isFilterPresent(fieldName, filters)) {
        query.where(fieldName, { $regex: filters[fieldName], $options: 'i' });
    }
}

const sortBy = (sortByFields: ISortByFields | undefined, query: any): void => {
    if (!!sortByFields) {
        validateSorting(sortByFields);
        const sortByArray: SortByArray = convertToSortByArray(sortByFields);
        querySort(sortByArray, query);
    }
}

const validateSorting = (sortByFields: ISortByFields): void => {
    if (!sortByFields) return;
    Object.values(sortByFields).map((orderType: OrderType) => {
        validateOrderType(orderType);
    });
}

const convertToSortByArray = (sortByFields: ISortByFields): SortByArray => {
    let sortByArray: SortByArray = [];
    if (!!sortByFields.amt) {
        sortByArray.push(['amt', sortByFields.amt]);
    }
    if (!!sortByFields.createdDate) {
        sortByArray.push(['createdDate', sortByFields.createdDate]);
    }
    return sortByArray;
}

const validateOrderType = (orderType: OrderType): void => {
    if (!orderType || (orderType !== 'asc' && orderType !== 'desc')) {
        throw new Error('Invalid sorting type, allowed [asc, desc]');
    }
}

const isFilterPresent = (fieldName: string, filters: any): boolean => {
    return !!filters[fieldName];
}

const querySort = (sortByArray: SortByArray, query: any): void => {
    query.sort(sortByArray);
}


export default { createUser, insertBulkUsers, deleteAllUsers, findAllUsers }