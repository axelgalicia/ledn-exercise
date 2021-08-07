import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query";
import { Segment, Header, Divider, Grid, Button, Statistic } from "semantic-ui-react";
import { IUserStatistics } from "./interfaces/IUserStatistics";
import { fetchDeleteAllUsers, fetchUserStatistics } from "./services/UserServices";
import styled from 'styled-components';
import ErrorMessage from "../../ErrorMessage";
import { useState } from "react";
import SuccessMessage from "../../SuccessMessage";

const SpacedButton = styled(Button)`
&&& {
    white-space: pre;
}
`


const UsersData = () => {

    const [showError, setShowError] = useState<boolean>(false);
    const [showSucess, setShowSuccess] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');


    const queryStatistics: UseQueryResult<IUserStatistics, Error> = useQuery('userStatistics', fetchUserStatistics);
    const mutationDeleteAllUsers: UseMutationResult<void, Error> = useMutation('deleteAllUsers', fetchDeleteAllUsers, {
        onSuccess: () => {
            queryStatistics.refetch();
            setShowError(false);
            setShowSuccess(true);
            setSuccessMessage('Users deleted successfully');
        },
        onError: (error: Error) => {
            setShowError(true);
            setErrorMessage('Could not delete all users');
        }
    });

    if (queryStatistics.isLoading) {
        return <span>Loading...</span>
    }

    return (
        <Segment color='blue'>
            <Header as='h3' color='blue'>User's Data</Header>
            <Divider section />
            <Grid columns={3} stackable textAlign='center' verticalAlign='middle'>
                <Grid.Column>
                    <SpacedButton color="green" onClick={loadFile}>LOAD FILE          (data/accounts.json)</SpacedButton>
                </Grid.Column>
                <Grid.Column>
                    <Button color="red" disabled={shouldDisableDelete(queryStatistics)}
                        onClick={() => deleteAllUsers(mutationDeleteAllUsers)}>DELETE ALL USERS</Button>
                </Grid.Column>
                <Grid.Column>
                    <Statistic label='Active Users' value={getActiveUsers(queryStatistics)} size='large' />
                </Grid.Column>
            </Grid>
            <ErrorMessage message={errorMessage} visible={showError}></ErrorMessage>
            <SuccessMessage message={successMessage} visible={showSucess}></SuccessMessage>
        </Segment>
    )


}

const shouldDisableDelete = ({ isFetching, isSuccess, data, isError }: UseQueryResult<IUserStatistics, Error>) => {
    // return isError || isFetching || (isSuccess && data?.activeUsers === 0);
    return false;
}

const getActiveUsers = ({ isSuccess, data, isFetching }: UseQueryResult<IUserStatistics, Error>) => {
    return isFetching ? 'Loading..' : isSuccess ? data?.activeUsers : 'No Data';
}


const loadFile = (): void => {
    console.log('Load File');
};

const deleteAllUsers = (mutationDeleteAllUsers: UseMutationResult<void, Error>): void => {
    console.log('Delete Users');
    mutationDeleteAllUsers.mutate({}, {});

};

export default UsersData;
