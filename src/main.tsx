import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import { store } from './Store/Store.tsx'
import {QueryClient,QueryClientProvider} from 'react-query'
import './index.css'
import App from './App.tsx'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60*  4,
      retry: false,
      //staleTime
      refetchOnWindowFocus: false,
      // retryDelay: 1000,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
