import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "react-query";
import { Grid, Button, Statistic } from "semantic-ui-react";
import { IUserStatistics } from "./types";
import { fetchDeleteAllUsers, fetchLoadFile, fetchUserStatistics } from "./services";
import styled from 'styled-components';
import ErrorMessage from "../../ErrorMessage";
import { useEffect, useState } from "react";
import SuccessMessage from "../../SuccessMessage";
import CustomSection from "../../CustomSection";
import userSearchStore from "../stores/useUserSearchStore";

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

    useEffect(() => {
        setTimeout(() => {
            setShowSuccess(false);
            setShowError(false);
        }, 5000);
    }, [showError, showSucess]);

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
    const mutationLoadFile: UseMutationResult<any, Error> = useMutation('loadFile', fetchLoadFile, {
        onSuccess: () => {
            queryStatistics.refetch();
            setShowError(false);
            setShowSuccess(true);
            setSuccessMessage('Loaded successfully');
        },
        onError: (error: Error) => {
            setShowError(true);
            setErrorMessage('Could not load the file');
        }
    });

    if (queryStatistics.isLoading) {
        return <span>Loading...</span>
    }

    if (queryStatistics.isSuccess) {
        updateActiveUsers(queryStatistics.data.activeUsers);
    }

    return (
        <CustomSection title="User's Data" color='blue'>
            <Grid columns={3} stackable textAlign='center' verticalAlign='middle'>
                <Grid.Column>
                    <SpacedButton disabled={shouldDisableLoad(queryStatistics)} color="green" onClick={() => loadFile(mutationLoadFile)}>LOAD FILE          (data/accounts.json)</SpacedButton>
                </Grid.Column>
                <Grid.Column>
                    <Button color="red" disabled={shouldDisableDelete(queryStatistics)}
                        onClick={() => deleteAllUsers(mutationDeleteAllUsers)}>DELETE ALL USERS</Button>
                </Grid.Column>
                <Grid.Column>
                    <Statistic label='LOADED UNIQUE USERS' value={getActiveUsers(queryStatistics)} size='large' />
                </Grid.Column>
            </Grid>
            <ErrorMessage message={errorMessage} visible={showError}></ErrorMessage>
            <SuccessMessage message={successMessage} visible={showSucess}></SuccessMessage>
        </CustomSection>

    )


}

const shouldDisableDelete = ({ isFetching, isSuccess, data, isError }: UseQueryResult<IUserStatistics, Error>) => {
    return isError || isFetching || (isSuccess && data?.activeUsers === 0);
}

const shouldDisableLoad = ({ isFetching, isLoading }: UseQueryResult<IUserStatistics, Error>) => {
    return isLoading || isFetching;
}

const getActiveUsers = ({ isSuccess, data, isFetching }: UseQueryResult<IUserStatistics, Error>) => {
    return isFetching ? 'Loading..' : isSuccess ? data?.activeUsers : '-';
}


const loadFile = (mutationLoadFile: UseMutationResult<void, Error>): void => {
    mutationLoadFile.mutate({}, {});
};

const deleteAllUsers = (mutationDeleteAllUsers: UseMutationResult<void, Error>): void => {
    mutationDeleteAllUsers.mutate({}, {});

};

const updateActiveUsers = (activeUsers: number): void => {
    const previousActiveUsers = userSearchStore.getState().statistics.activeUsers;
    if (previousActiveUsers !== activeUsers) {
        userSearchStore.setState({ statistics: { activeUsers: activeUsers } });
    }
}

export default UsersData;
