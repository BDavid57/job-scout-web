import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { JobsScreen } from "./features";

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <JobsScreen />
    </QueryClientProvider>
  );
}

export default App;
