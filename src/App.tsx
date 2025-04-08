import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import AppRoutes from "./routes/AppRoutes";
import { store } from "./store";

const App = () => {

  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Provider store={store}>
            <AppRoutes />
          </Provider>
        </BrowserRouter>
      </QueryClientProvider >
    </div >
  )
}

export default App