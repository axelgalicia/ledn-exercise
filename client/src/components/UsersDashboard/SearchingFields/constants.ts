import { DropdownItemProps } from 'semantic-ui-react';
import { countries } from '../constants'

export const countryCodes = (): any[] => {
    const countryCodesMap: any = [];
    countries.forEach(country => {
        const code = country.countryCode.toUpperCase();
        const newCountry = {
            key: code,
            text: `${country.name} - ${code}`,
            value: code,
            flag: country.countryCode,
        };
        countryCodesMap.push(newCountry);
    })

    return countryCodesMap;
}

export const MFA_TYPES: DropdownItemProps[] = [
    { key: 'sms', text: 'SMS', value: 'SMS' },
    { key: 'topt', text: 'TOTP', value: 'TOTP' },
    { key: 'null', text: 'NULL', value: 'null' },
];

export const SORTING_TYPES: DropdownItemProps[] = [
    { key: 'asc', text: 'ASC', value: 'asc' },
    { key: 'desc', text: 'DESC', value: 'desc' },
]