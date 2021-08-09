import { useState } from "react";
import { DropdownProps, Form, InputOnChangeData } from "semantic-ui-react";
import { OrderType, SearchFilter, SortingMap } from "../types";
import { countryCodes, MFA_TYPES, SORTING_TYPES } from "./constants";
import userSearchStore from "../stores/useUserSearchStore";
import CustomHeader from "../../CustomHeader";
import CustomSection from "../../CustomSection";



const SearchingFields = () => {

    const [filter, setFilter] = useState<SearchFilter>(
        {
            firstName: undefined,
            lastName: undefined,
            mfa: undefined,
            countryCode: undefined
        });

    const updateFilter = (fieldName: string, value: any): void => {
        let newFilter = { ...filter };
        newFilter[fieldName] = value ? value : undefined;
        setFilter(newFilter);
        userSearchStore.setState({ filter: newFilter });
    }

    const handleChange = (e: React.SyntheticEvent<HTMLElement, Event>, data: InputOnChangeData) => {
        updateFilter(data.name, data.value);
    }

    const handleFilterDropdown = (fieldName: string, data: DropdownProps): void => {
        updateFilter(fieldName, data.value);
    }

    const handleSortingDropdown = (fieldName: string, data: DropdownProps): void => {

        let currentSortingMap: SortingMap = userSearchStore.getState().sorting;
        if (!currentSortingMap) {
            currentSortingMap = new Map();
        }
        if (!data.value) {
            currentSortingMap.delete(fieldName);
        } else {
            currentSortingMap.set(fieldName, data.value as OrderType);
        }
        userSearchStore.setState({ sorting: currentSortingMap });
    }

    return (
        <CustomSection title='Searching Fields' color='blue'>
            <Form>
                <CustomHeader title='Filtering' color='blue'>
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
                            selection
                            label='Country Code'
                            options={countryCodes()}
                            placeholder='Country Code'
                            onChange={(e, data) => handleFilterDropdown('countryCode', data)}
                        />
                        <Form.Dropdown
                            search
                            clearable
                            selection
                            label='MFA Type'
                            options={MFA_TYPES}
                            placeholder='MFA Type'
                            onChange={(e, data) => handleFilterDropdown('mfa', data)}
                        />
                    </Form.Group>


                </CustomHeader >

                <CustomHeader title='Sorting' color='blue'>

                    <Form.Group widths='four'>

                        <Form.Dropdown
                            search
                            clearable
                            selection
                            label='by Creation Date'
                            options={SORTING_TYPES}
                            placeholder='Order Type'
                            onChange={(e, data) => handleSortingDropdown('createdDate', data)} />

                        <Form.Dropdown
                            search
                            clearable
                            selection
                            label='by Tokens held'
                            options={SORTING_TYPES}
                            placeholder='Order By'
                            onChange={(e, data) => handleSortingDropdown('mfa', data)} />

                    </Form.Group>

                </CustomHeader>

            </Form>
        </CustomSection >
    )
}

export default SearchingFields;
