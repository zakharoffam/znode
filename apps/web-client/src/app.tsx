import { CssBaseline, LinearProgress, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/home.page";
import { NotFoundPage } from "./pages/not-found.page";
import { ErrorHandler } from "../../../libs/web-client/error-handler/src";

// const ErrorPage = lazy(() => import('@uparm-automation/web-error-pages'));

export default function App() {
  return (
    <ThemeProvider theme={theme()}>
      {/*Перехватываем ошибки возникающие в виртуальном DOM*/}
      <ErrorHandler name="WebClient">
        <CssBaseline />
        {/*Отображает прогресс-бар в момент загрузки lazy-компонентов*/}
        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            {/*<Route path="*" element={<ErrorPage status={404} />} />*/}
          </Routes>
        </Suspense>
      </ErrorHandler>
    </ThemeProvider>
  );
}
