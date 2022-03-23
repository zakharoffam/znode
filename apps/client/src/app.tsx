import { CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorInterceptor } from "./error-interceptor";

import { HomePage } from './pages/home.page';
import { Error404Page } from './pages/error-404.page';
import { AuthPage } from "./pages/auth.page";


// const EventLogPage = lazy(
//   () => import('@znode/event-log-web-pages')
// );

export default function App() {
  return (
    <ThemeProvider theme={theme('dark')}>
      {/*Перехватываем ошибки возникающие в виртуальном DOM*/}
      <ErrorInterceptor appName="WebClient">
        <CssBaseline />
        {/*Отображает прогресс-бар в момент загрузки lazy-компонентов*/}
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<AuthPage />} />
            {/*<Route path="/event-log" element={<EventLogPage />} />*/}
            <Route path="*" element={<Error404Page />} />

            {/*<Route path="*" element={<ErrorPage status={404} />} />*/}
          </Routes>
        </Suspense>
      </ErrorInterceptor>
    </ThemeProvider>
  );
}
