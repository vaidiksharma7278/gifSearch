import { useState } from "react";
import Head from "next/head";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "@/theme/theme";
import createEmotionCache from "@/theme/createEmotionCache";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar } from "@/components";
import {ProtectedRoute} from "@/components"
import { AuthContextProvider } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { Footer } from "@/components";
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  dehydratedState: unknown;
}

const noAuthRequired = ['/', '/login', '/signup']
export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter()


  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthContextProvider>
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
       
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar/>
            {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
      <Footer/>
          </ThemeProvider>
        
      </QueryClientProvider>
    </CacheProvider>
    </AuthContextProvider>
  );
}
