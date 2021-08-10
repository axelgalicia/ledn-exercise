import { UserRecord } from "./types"
import { countries } from '../constants'

export const mapUsers = (records: any): UserRecord[] => {
    if (!records) return [];

    return records.map((record: any) => {
        return {
            firstName: record.firstName,
            lastName: record.lastName,
            countryCode: record.countryCode,
            email: record.email,
            dob: record.dob,
            mfa: record.mfa,
            amt: record.amt,
            createdDate: record.createdDate,
            referredBy: record.referredBy,

        } as UserRecord
    })
}


export const lookupCountryName = (code: string): string => {
    const country = countries.find(country => (country.countryCode === code.toLowerCase()));
    return country ? country.name : '';
}