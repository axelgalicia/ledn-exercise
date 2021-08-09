import { UserRecord } from "./types"

export const mapUsers = (records: any): UserRecord[] => {
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