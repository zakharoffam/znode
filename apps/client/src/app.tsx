import { CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorInterceptor } from "./error-interceptor";
import { HomePage } from './pages/home.page';
import { Error404Page } from './pages/error-404.page';

// const EventLogPage = lazy(
//   () => import('@znode/event-log-web-pages')
// );

export default function App() {

  return (
    <ThemeProvider theme={theme('dark')}>
      <ErrorInterceptor>
        <CssBaseline />
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Error404Page />} />
          </Routes>
        </Suspense>
      </ErrorInterceptor>
    </ThemeProvider>
  );
}
