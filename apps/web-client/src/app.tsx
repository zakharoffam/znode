import { Box, CssBaseline, LinearProgress, ThemeProvider, Typography } from "@mui/material";
import { theme } from "./theme";
import { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";

const ErrorPage = lazy(() => import('@uparm-automation/web-error-pages'));

export default function App() {
  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline />

      <Box>
        <Link to="/">Home</Link>
        <Link to="test">Test</Link>
        <Link to="/404">Not found page</Link>
      </Box>

      <Suspense fallback={<LinearProgress />}>
        <Routes>
          <Route path="/" element={<Typography>Home</Typography>} />
          <Route path="test" element={<Typography>Test</Typography>} />
          <Route path="*" element={<ErrorPage status={404} />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}
