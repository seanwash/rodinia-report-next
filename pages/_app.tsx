import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthUserProvider } from "../contexts/AuthUser";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <Header />
      <main className="container mx-auto p-4">
        <Component {...pageProps} />
      </main>
    </AuthUserProvider>
  );
}
export default MyApp;
