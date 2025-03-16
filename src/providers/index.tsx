import React from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '../contexts/AuthContext';
import ViewProvider from '../contexts/ViewContext';
import { esES } from '@mui/x-data-grid/locales';
import { esES as pickersesES } from '@mui/x-date-pickers/locales';
import { esES as coreesES } from '@mui/material/locale';
import 'dayjs/locale/en-gb';

type ProvidersProp = {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const Providers:React.FC<ProvidersProp> = ({children}) => {
  const [colorMode, setColorMode] = React.useState<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');
  const onChangeColorMode = (colorMode: 'light' | 'dark') => {
    setColorMode(colorMode);
    localStorage.setItem('theme', colorMode);
  }
  const theme = createTheme(
    {
      palette: {
        mode: colorMode,
      },
      components: {
        MuiDialog: {
          defaultProps: {
            closeAfterTransition: false,
          },
        },
      },
    },
    esES, // x-data-grid translations
    pickersesES, // x-date-pickers translations
    coreesES, // core translations
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <AuthProvider>
              <ViewProvider {...{ onChangeColorMode }}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                  <CssBaseline />
                  {children}
                </LocalizationProvider>
              </ViewProvider>
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default Providers