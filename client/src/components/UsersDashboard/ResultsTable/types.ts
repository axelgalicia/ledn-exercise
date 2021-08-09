export type SortingType = 'ascending' | 'descending' | undefined;

export type UsersResults = {
    totalRecords: number;
    pageSize: number;
    pageCount: number;
    currentPage: number;
    records: UserRecord[];
}

type StringResult = string | null | undefined;

export type UserRecord = {
    _id: string;
    firstName: StringResult;
    lastName: StringResult;
    countryCode: StringResult;
    email: StringResult;
    dob: StringResult;
    mfa: StringResult;
    amt: StringResult;
    createdDate: StringResult;
    referredBy: StringResult;
    __v: number
}