export type FieldValue = string | undefined;

export type SearchFilter = {
    firstName: FieldValue;
    lastName: FieldValue;
    countryCode: FieldValue;
    mfa: FieldValue;
    [name: string]: any;
}