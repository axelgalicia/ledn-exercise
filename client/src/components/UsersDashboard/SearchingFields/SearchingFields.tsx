import { useState } from "react";
import { Form, Grid, InputOnChangeData } from "semantic-ui-react";
import CustomSection from "../../CustomSection";
import Subsection from "../../Subsection";
import { SearchFilter } from "../types";


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
        let newFilter = {...filter};
        newFilter[data.name] = data.value ? data.value : undefined;
        setFilter(newFilter);
        console.log(newFilter);
    }

    return (
        <CustomSection title='Searching Fields' color='blue'>
            <Subsection title='Filtering'>
                <Grid columns={4}>
                    <Form onSubmit={() => handleSubmit()}>
                        <Form.Group>
                            <Form.Input
                                placeholder='First Name'
                                name='firstName'
                                onChange={handleChange}
                            />
                            <Form.Input
                                placeholder='Last Name'
                                name='lastName'
                                onChange={handleChange}
                            />
                            <Form.Button content='Submit' />
                        </Form.Group>
                    </Form>
                    <strong>onChange:</strong>
                    <pre>{JSON.stringify(filter, null, 2)}</pre>
                    <strong>onSubmit:</strong>
                    <pre>{JSON.stringify(filter, null, 2)}</pre>
                </Grid>

            </Subsection>
            <Subsection title='Sorting'></Subsection>
        </CustomSection>
    )
}

export default SearchingFields;