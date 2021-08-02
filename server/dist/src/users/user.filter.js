"use strict";
/**
 * @description File to separate filters' creation
 * @author Axel Galicia - axelgalicia@gmail.com
 */
Object.defineProperty(exports, "__esModule", { value: true });
var VALID_SORTING_FIELDS = ['amt', 'createdDate', 'dob', 'firstName', 'lastName', 'countryCode', 'mfa'];
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
var isFilterPresent = function (fieldName, filters) {
    return !!filters[fieldName];
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
/**
 * Convert the input sort fields into a sortByArray object
 * in the order they were sent in the request.
 *
 *
 * @param {any} sortByFields The sort fields containing the order type
 * @returns {SortByArray} Returs the array of SortByArray to sort the query
 */
var convertToSortByArray = function (sortByFields) {
    var sortByArray = [];
    for (var key in sortByFields) {
        var lowerKey = key.toLowerCase();
        if (VALID_SORTING_FIELDS.includes(lowerKey)) {
            addSortingField(lowerKey, sortByFields, sortByArray);
        }
    }
    return sortByArray;
};
var querySort = function (sortByArray, query) {
    query.sort(sortByArray);
};
var validateOrderType = function (orderType) {
    if (!orderType || (orderType !== 'asc' && orderType !== 'desc')) {
        throw new Error("Invalid sorting type [" + orderType + "], allowed [asc | desc]");
    }
};
var addSortingField = function (fieldName, sortByFields, sortByArray) {
    if (!!sortByFields[fieldName]) {
        sortByArray.push([fieldName, sortByFields[fieldName]]);
    }
};
var addPagination = function (filters, query) {
    try {
        var pageNum = !!filters.pageNumber ? parseInt(filters.pageNumber, 10) : 0;
        var perPage = !!filters.itemsPerPage ? parseInt(filters.itemsPerPage, 10) : 20;
        query.skip(pageNum > 0 ? ((pageNum - 1) * perPage) : 0);
        query.limit(perPage);
    }
    catch (error) {
        throw new Error('Invalid pagination parameters.');
    }
};
exports.default = {
    filterByEquals: filterByEquals,
    filterLikeBy: filterLikeBy,
    sortBy: sortBy,
    addPagination: addPagination,
};
