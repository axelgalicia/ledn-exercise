
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
    pageSize?: string;
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
        console.log('Sorting array:', sortByArray);
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
        if (VALID_SORTING_FIELDS.includes(key)) {
            addSortingField(key, sortByFields, sortByArray);
        } else {
            throw new Error(`Sorting field ${key} does not exist`);
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
        const pageNum = getPageNumber(filters);
        const pageSize = getPageSize(filters);
        query.skip(pageNum > 0 ? ((pageNum - 1) * pageSize) : 0);
        query.limit(pageSize);
    }
    catch (error) {
        throw new Error('Invalid pagination parameters.');
    }
}

const getPageSize = (filters: any): number => {
    return !!filters.pageSize ? parseInt(filters.pageSize, 10) :
        parseInt(appConfig.defaultPageSize || '20', 10);
}

const getPageNumber = (filters: any): number => {
    return !!filters.pageNumber ? parseInt(filters.pageNumber, 10) : 0;
}

export default {
    filterByEquals,
    filterLikeBy,
    sortBy,
    addPagination,
    getPageSize,
    getPageNumber,
}