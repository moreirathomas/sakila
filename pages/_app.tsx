import type { AppProps } from "next/app";

import "../styles/globals.css";

import { FilmsProvider } from "../contexts/FilmsContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FilmsProvider>
      <Component {...pageProps} />;
    </FilmsProvider>
  );
}

export default MyApp;
