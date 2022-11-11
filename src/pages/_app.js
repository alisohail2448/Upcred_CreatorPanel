import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { SnackbarProvider } from "notistack";
import "../styles.css";
import Script from 'next/script'

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>UPCRED Panel</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <Script src="https://accounts.google.com/gsi/client" />
      </Head>

      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(
                <Component {...pageProps} />
            )}
          </ThemeProvider>
        </LocalizationProvider>
      </SnackbarProvider>
    </CacheProvider>
  );
};

export default App;
