import React, { useEffect, useState } from "react"
import Moment from 'react-moment';
import { CSVLink } from "react-csv";
import _ from 'lodash'
import { Table, Container, Pagination, PaginationProps, Button } from "semantic-ui-react"
import CustomSection from "../../CustomSection"
import userSearchStore from "../stores/useUserSearchStore";
import {
    AMT_FIELD,
    ASCENDING,
    CHANGE_SORT_ACTION,
    COUNTRY_CODE_FIELD,
    CREATED_DATA_FIELD,
    DATE_OF_BIRTH_FIELD,
    DESCENDING, EMAIL_FIELD,
    FIRST_NAME_FIELD,
    LAST_NAME_FIELD,
    MFA_FIELD,
    REFERRED_BY_FIELD,
    UPDATE_DATA_ACTION
} from "./constants"
import { SortingType, UsersResults } from "./types"
import { useQuery, UseQueryResult } from "react-query"
import { fetchAllUsers } from "./services"
import { mapUsers } from "./utils";
import { OrderType, SearchFilter, SortingMap } from "../types";


const ResultsTable = () => {

    const [sorting, setSorting] = useState(new Map<string, OrderType>());
    const [filter, setFilter] = useState({});
    const [activePage, setActivePage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [queryEnabled, setQueryEnabled] = useState(true);


    const queryFetchAllUsers: UseQueryResult<UsersResults, Error> =
        useQuery(['fetchAllUsers', filter, sorting, activePage, pageSize],
            () => fetchAllUsers(filter, sorting, activePage, pageSize), {
            enabled: queryEnabled,
            onSuccess: (data) => {
                dispatch({ type: UPDATE_DATA_ACTION, data: mapUsers(data.records) });
                setQueryEnabled(false);
            },
            onError: () => {
                setQueryEnabled(true);
                throw Error('Could not fetch users')
            }
        });
        
    const [{ column, data, direction }, dispatch] = React.useReducer(sortingReducer, {
        column: null,
        data: [],
        direction: null,
    })


    userSearchStore.subscribe((n, p) => {
        console.log('n', n, 'p', p);
        setQueryEnabled(true);
        setFilter(n.filter as SearchFilter);
        setSorting(n.sorting ? n.sorting : new Map());
    });

    const handlePageChange = (e: any, data: PaginationProps): void => {
        const activePage = data.activePage as number;
        setQueryEnabled(true);
        setActivePage(activePage);
        userSearchStore.setState({ filter: { pageNumber: activePage } });
    }

    const handleSortByColum = (columnName: string): void => {
        dispatch({ type: CHANGE_SORT_ACTION, column: columnName });
    }

    const sortedBy = (columnName: string): SortingType => {
        return column === columnName ? direction : undefined;
    }

    useEffect(() => {
        setQueryEnabled(false);
    }, []);


    return (
        <CustomSection title='Results' color='blue' showLabel={true} labelValue={getUserResults(queryFetchAllUsers).totalRecords + ''}>
            {data.length > 0 ? <CSVLink data={data} filename={`ledn_results.csv`}><Button color='blue' size='small'>DOWNLOAD CSV</Button></CSVLink> : <></>}

            <Table sortable celled compact='very' collapsing size='small' stackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={sortedBy(FIRST_NAME_FIELD)}
                            onClick={() => handleSortByColum(FIRST_NAME_FIELD)}
                        >
                            First Name
                        </Table.HeaderCell>

                        <Table.HeaderCell
                            sorted={sortedBy(LAST_NAME_FIELD)}
                            onClick={() => handleSortByColum(LAST_NAME_FIELD)}
                        >
                            Last Name
                        </Table.HeaderCell>


                        <Table.HeaderCell
                            sorted={sortedBy(COUNTRY_CODE_FIELD)}
                            onClick={() => handleSortByColum(COUNTRY_CODE_FIELD)}
                        >
                            Country Code
                        </Table.HeaderCell>


                        <Table.HeaderCell
                            sorted={sortedBy(EMAIL_FIELD)}
                            onClick={() => handleSortByColum(EMAIL_FIELD)}
                        >
                            Email
                        </Table.HeaderCell>


                        <Table.HeaderCell
                            sorted={sortedBy(DATE_OF_BIRTH_FIELD)}
                            onClick={() => handleSortByColum(DATE_OF_BIRTH_FIELD)}
                        >
                            Date of Birth
                        </Table.HeaderCell>


                        <Table.HeaderCell
                            sorted={sortedBy(MFA_FIELD)}
                            onClick={() => handleSortByColum(MFA_FIELD)}
                        >
                            MFA
                        </Table.HeaderCell>


                        <Table.HeaderCell
                            sorted={sortedBy(AMT_FIELD)}
                            onClick={() => handleSortByColum(AMT_FIELD)}
                        >
                            Amount
                        </Table.HeaderCell>


                        <Table.HeaderCell
                            sorted={sortedBy(CREATED_DATA_FIELD)}
                            onClick={() => handleSortByColum(CREATED_DATA_FIELD)}
                        >
                            Created Date
                        </Table.HeaderCell>


                        <Table.HeaderCell
                            sorted={sortedBy(REFERRED_BY_FIELD)}
                            onClick={() => handleSortByColum(REFERRED_BY_FIELD)}
                        >
                            Referred By
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        data.map(({ firstName, lastName, countryCode, email, dob, mfa, amt, createdDate, referredBy }: any) => (
                            <Table.Row key={email}>
                                <Table.Cell>{firstName}</Table.Cell>
                                <Table.Cell>{lastName}</Table.Cell>
                                <Table.Cell>{countryCode}</Table.Cell>
                                <Table.Cell>{email}</Table.Cell>
                                <Table.Cell><Moment format="MMM DD, YYYY">{dob}</Moment></Table.Cell>
                                <Table.Cell>{mfa}</Table.Cell>
                                <Table.Cell>{amt}</Table.Cell>
                                <Table.Cell>
                                    <Moment format="MMM DD, YYYY HH:mm:ss">{createdDate}</Moment></Table.Cell>
                                <Table.Cell>{referredBy}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
            <Container textAlign='center'>
                {getUserResults(queryFetchAllUsers).pageCount ?
                    <Pagination
                        totalPages={getUserResults(queryFetchAllUsers).pageCount}
                        onPageChange={(e, data) => handlePageChange(e, data)} activePage={activePage} />
                    : <></>
                }
            </Container>
        </CustomSection>

    )
}

const isLoading = (queryFetchAllUsers: UseQueryResult<UsersResults, Error>): boolean => {
    return queryFetchAllUsers.status === 'loading' || queryFetchAllUsers.isLoading || queryFetchAllUsers.isFetching;
}

const getUserResults = (q: UseQueryResult<UsersResults, Error>): UsersResults => {

    if (isLoading(q) || !q.isSuccess) return {
        totalRecords: 0,
        currentPage: 0,
        pageCount: 0,
        pageSize: 20,
        records: []
    } as UsersResults;
    const { totalRecords, currentPage, pageCount, pageSize, records } = q.data as UsersResults;

    return {
        totalRecords: totalRecords ? totalRecords : 0,
        currentPage: currentPage ? currentPage : 0,
        pageCount: pageCount ? pageCount : 0,
        pageSize: pageSize ? pageSize : 0,
        records: records ? records : []
    }
}

const sortingReducer = (state: any, action: any): any => {
    switch (action.type) {
        case CHANGE_SORT_ACTION:
            if (state.column === action.column) {
                return {
                    ...state,
                    data: state.data.slice().reverse(),
                    direction:
                        state.direction === ASCENDING ? DESCENDING : ASCENDING,
                }
            }

            return {
                column: action.column,
                data: _.sortBy(state.data, [action.column]),
                direction: ASCENDING,
            }

        case UPDATE_DATA_ACTION:

            return {
                ...state,
                data: action.data,
                direction: ASCENDING,
            }
        default:
            throw new Error()
    }
}





export default ResultsTable;