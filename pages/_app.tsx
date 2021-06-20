import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthUserProvider } from "../contexts/AuthUser";
import Header from "../components/Header";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/*<AuthUserProvider>*/}
      <Header />
      <main className="container mx-auto p-4">
        <Component {...pageProps} />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
      {/*</AuthUserProvider>*/}
    </QueryClientProvider>
  );
}
export default MyApp;
