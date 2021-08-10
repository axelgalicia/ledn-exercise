
import { Container, Divider, Grid } from 'semantic-ui-react';
import UsersData from './UsersData/UsersData';
import DeveloperInfo from './DeveloperInfo';
import MainHeader from '../MainHeader';
import ResultsTable from './ResultsTable';
import SearchingFields from './SearchingFields';



const UsersDashboard = () => {

    return (

        <>
            <Grid centered padded='vertically' />
            <Grid centered padded='horizontally'>
                <Grid.Column width={14}>
                    <Container fluid>
                        <MainHeader
                            title="Ledn Users Search"
                            subheader="Token holder's accounts"
                            color='blue'
                            icon='search' />

                        <Container textAlign='left'>
                            <DeveloperInfo
                                name='Axel Galicia'
                                email='axelgalicia@gmail.com'
                                websiteLink='https://axel.today'
                                linkLabel='axel.today'
                                city='Toronto ON' />
                        </Container>

                        <Divider />

                        <UsersData />
                        <SearchingFields />
                        <ResultsTable />

                    </Container>

                </Grid.Column>
            </Grid>
        </>

    );
}

export default UsersDashboard;