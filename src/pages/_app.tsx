import * as React from "react";
import Head from "next/head";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import createEmotionCache from "../utils/createEmotionCache";
import { CssBaseline, ThemeProvider } from "@mui/material";

const client = new ApolloClient({
  uri: "https://axieinfinity.com/graphql-server-v2/graphql",
  cache: new InMemoryCache(),
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Axie Team Builder</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
