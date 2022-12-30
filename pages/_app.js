import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "react-query";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import ConfirmModal from "../components/ConfirmModal";



const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer limit={1} position='top-center' />
        <Provider store={store}>
          <ConfirmModal />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen />
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
