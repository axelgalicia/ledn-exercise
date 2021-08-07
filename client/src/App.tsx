import { QueryClient, QueryClientProvider } from 'react-query';
import 'semantic-ui-css/semantic.min.css'
import UsersDashboard from './components/UsersDashboard';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <UsersDashboard />
    </QueryClientProvider>
  )

}

export default App;