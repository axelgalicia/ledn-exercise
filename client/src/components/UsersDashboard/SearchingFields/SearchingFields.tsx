import { useState } from "react";
import { DropdownItemProps, Form, Grid, Input, InputOnChangeData, Label } from "semantic-ui-react";
import CustomSection from "../../CustomSection";
import Subsection from "../../Subsection";
import { SearchFilter } from "../types";
import countries, { Country } from 'country-code-lookup';


const MFATypes: DropdownItemProps[] = [
    { key: 'sms', text: 'SMS', value: 'SMA' },
    { key: 'topt', text: 'TOTP', value: 'TOTP' },
    { key: 'null', text: 'NULL', value: 'null' },
];

const countryCodes = (): any[] => {
    const countryCodesMap: any = [];

    countries.countries.map(country => {
        const newCountry = {
            key: country.iso2,
            text: country.country,
            value: country.iso2,
            flag: country.iso2.toLowerCase(),
        };
        countryCodesMap.push(newCountry);
    })

    return countryCodesMap;
}




const SearchingFields = () => {

    const [filter, setFilter] = useState<SearchFilter>(
        {
            firstName: undefined,
            lastName: undefined,
            mfa: undefined,
            countryCode: undefined
        });

    const handleSubmit = () => {
        console.log(filter);
    }

    const handleChange = (e: any, data: InputOnChangeData) => {
        let newFilter = { ...filter };
        newFilter[data.name] = data.value ? data.value : undefined;
        setFilter(newFilter);
        console.log(newFilter);
    }

    return (
        <CustomSection title='Searching Fields' color='blue'>
            <Subsection title='Filtering'>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input
                            label='First Name'
                            placeholder='First Name'
                            name='firstName'
                            onChange={handleChange}>
                        </Form.Input>

                        <Form.Input
                            label='Last Name'
                            placeholder='Last Name'
                            name='lastName'
                            onChange={handleChange}
                        />
                        <Form.Dropdown
                            search
                            clearable
                            label='Country Code'
                            options={countryCodes()}
                            placeholder='Country Code'
                        />
                        <Form.Dropdown
                            search
                            clearable
                            selection
                            label='MFA Type'
                            options={MFATypes}
                            placeholder='MFA Type'
                        />
                    </Form.Group>
                </Form>


            </Subsection >

            <Subsection title='Sorting'></Subsection>
        </CustomSection >
    )
}

export default SearchingFields;