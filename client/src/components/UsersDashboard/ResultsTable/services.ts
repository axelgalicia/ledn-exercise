import { appConfig } from "../../../configs/AppConfig";
import { SearchFilter, SortingMap } from "../types";
import { COUNTRY_CODE_FIELD, FIRST_NAME_FIELD, LAST_NAME_FIELD, MFA_FIELD } from "./constants";
import { UsersResults } from "./types";

export const fetchAllUsers = async (
    filter?: SearchFilter,
    sorting?: SortingMap,
    activePage?: number,
    pageSize?: number): Promise<UsersResults> => {

    console.log('FETCH', filter, sorting, activePage, pageSize);
    const filters = encodeFilterParams(filter);
    const sortings = encodeSortingParams(sorting);
    const queryParams = `${filters}&pageSize=${pageSize}&pageNumber=${activePage}${sortings}`;
    const res = await fetch(`${appConfig.apiUrl}/users/?${queryParams}`);
    if (res.ok) {
        return res.json();
    }
    throw new Error('Could not fetch Users');
}


const encodeFilterParams = (filter?: SearchFilter): string => {
    if (!filter) {
        return '';
    }
    const { firstName, lastName, mfa, countryCode } = filter;
    let params = new URLSearchParams();

    if (firstName) {
        params.append(FIRST_NAME_FIELD, firstName);
    }
    if (lastName) {
        params.append(LAST_NAME_FIELD, lastName);
    }
    if (mfa) {
        params.append(MFA_FIELD, mfa);
    }
    if (countryCode) {
        params.append(COUNTRY_CODE_FIELD, countryCode);
    }

    return params.toString();
}

const encodeSortingParams = (sorting?: SortingMap): string => {
    if (!sorting || sorting.size < 1) {
        return '';
    }

    let params = new URLSearchParams();
    sorting.forEach((value, key) => {
        params.append(`sortBy[${key}]`, value as string);
    });

    return '&' + params.toString();
}