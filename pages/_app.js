import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "react-query/devtools";


const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer limit={1} position='top-center' />
      <Provider store={store}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen />
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
