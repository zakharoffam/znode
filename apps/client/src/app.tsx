import { CssBaseline, LinearProgress, Snackbar, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ErrorInterceptor } from "./error-interceptor";

import { HomePage } from './pages/home.page';
import { Error404Page } from './pages/error-404.page';
import { AuthPage } from "./pages/auth.page";
import { UserInterface } from "@znode/common/interfaces";
import API from "../../../libs/client/api/src/lib/host.api";


// const EventLogPage = lazy(
//   () => import('@znode/event-log-web-pages')
// );

export default function App() {
  const [requestLoading, setRequestLoading] = useState<boolean>(false);
  const [requestMessage, setRequestMessage] = useState<string | null>(null);

  useEffect(() => {
    setRequestLoading(true);
    API
      .get<UserInterface>('/api/auth/current-user')
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setRequestLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setRequestLoading(false);
        setRequestMessage('При загрузке данных пользователя возникла ошибка :(');
      })
      .finally(() => {
        setTimeout(() => {
          setRequestMessage(null);
        }, 5000);
      });
  }, []);

  return (
    <ThemeProvider theme={theme('dark')}>
      {/*Перехватываем ошибки возникающие в виртуальном DOM*/}
      <ErrorInterceptor appName="WebClient">
        {requestLoading && <LinearProgress />}
        {Boolean(requestMessage) && <Snackbar message={requestMessage} autoHideDuration={5000} />}
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
