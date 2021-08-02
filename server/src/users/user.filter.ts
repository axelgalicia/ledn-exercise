
/**
 * File to separate filters' creation
 * 
 * @author [Axel Galicia](https://github.com/axelgalicia)
 */

import { appConfig } from '../app.config';

const VALID_SORTING_FIELDS = ['amt', 'createdDate', 'dob', 'firstName', 'lastName', 'countryCode', 'mfa'];

type OrderType = 'asc' | 'desc' | undefined;
type SortByArray = [string, OrderType][];

export interface ISortByFields {
    amt?: OrderType;
    createdDate?: OrderType;
    dob?: OrderType;
    firstName?: OrderType;
    lastName?: OrderType;
    countryCode?: OrderType;
    mfa?: OrderType;
}

export interface IUserQueryFilters {
    firstName?: string;
    lastName?: string;
    sortBy?: ISortByFields;
    mfa?: string;
    countryCode?: string;
    pageNumber?: string;
    itemsPerPage?: string;
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

const isFilterPresent = (fieldName: string, filters: any): boolean => {
    return !!filters[fieldName];
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


/**
 * Convert the input sort fields into a sortByArray object 
 * in the order they were sent in the request.
 * 
 * 
 * @param {any} sortByFields The sort fields containing the order type
 * @returns {SortByArray} Returs the array of SortByArray to sort the query
 */
const convertToSortByArray = (sortByFields: any): SortByArray => {
    let sortByArray: SortByArray = [];
    for (let key in sortByFields) {
        const lowerKey = key.toLowerCase();
        if (VALID_SORTING_FIELDS.includes(lowerKey)) {
            addSortingField(lowerKey, sortByFields, sortByArray);
        }
    }

    return sortByArray;
}

const querySort = (sortByArray: SortByArray, query: any): void => {
    query.sort(sortByArray);
}

const validateOrderType = (orderType: OrderType): void => {
    if (!orderType || (orderType !== 'asc' && orderType !== 'desc')) {
        throw new Error(`Invalid sorting type [${orderType}], allowed [asc | desc]`);
    }
}

const addSortingField = (fieldName: string, sortByFields: any, sortByArray: SortByArray): void => {
    if (!!sortByFields[fieldName]) {
        sortByArray.push([fieldName, sortByFields[fieldName]]);
    }
}

const addPagination = (filters: any, query: any): void => {
    try {
        const pageNum = !!filters.pageNumber ? parseInt(filters.pageNumber, 10) : 0;
        const perPage = !!filters.itemsPerPage ? parseInt(filters.itemsPerPage, 10) :
            parseInt(appConfig.defaultItemsPerPage, 10);
        query.skip(pageNum > 0 ? ((pageNum - 1) * perPage) : 0);
        query.limit(perPage);
    }
    catch (error) {
        throw new Error('Invalid pagination parameters.');
    }
}

export default {
    filterByEquals,
    filterLikeBy,
    sortBy,
    addPagination,
}