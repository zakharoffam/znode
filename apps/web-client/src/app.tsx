import { CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorInterceptor } from '@uparm-automation/web-error-interceptor';

import { HomePage } from './pages/home.page';
import { NotFoundPage } from './pages/not-found.page';

const EventLogPage = lazy(
  () => import('@uparm-automation/event-log-web-pages')
);

export default function App() {
  return (
    <ThemeProvider theme={theme()}>
      {/*Перехватываем ошибки возникающие в виртуальном DOM*/}
      <ErrorInterceptor name="WebClient">
        <CssBaseline />
        <p>WEB CLIENT</p>
        {/*Отображает прогресс-бар в момент загрузки lazy-компонентов*/}
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/event-log" element={<EventLogPage />} />
            <Route path="*" element={<NotFoundPage />} />

            {/*<Route path="*" element={<ErrorPage status={404} />} />*/}
          </Routes>
        </Suspense>
      </ErrorInterceptor>
    </ThemeProvider>
  );
}
