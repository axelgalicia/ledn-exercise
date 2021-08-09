export type Statistics = {
    activeUsers: number;
}

export type Pagination = {
    pageNumber: number;
    pageSize: number;
}

export type UserSearchStorage = {
    statistics: Statistics;
    filter?: SearchFilter;
    sorting?: SortingMap;
    pagination: Pagination;
}

export type FieldValue = string | undefined;

export type SearchFilter = {
    firstName: FieldValue;
    lastName: FieldValue;
    countryCode: FieldValue;
    mfa: FieldValue;
    [name: string]: any;
}

export type SortingMap = Map<string, OrderType> | undefined;

export type OrderType = 'asc' | 'desc' | undefined;