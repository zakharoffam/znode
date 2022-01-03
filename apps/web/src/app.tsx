import { Suspense, lazy, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Box, ThemeProvider, CssBaseline, Button, LinearProgress } from "@mui/material";
import { theme } from "./theme";

import { NotFoundPage } from "./404";

/* Ленивый импорт приложений-страниц */
const HomeWeb = lazy(() => import('@uparm-automation/home/home-web'));


export function App() {
  const [mode, setMode] = useState<'light'|'dark'>('dark');

  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      <Box>
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Button
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          >
            Сменить тему
          </Button>
          <Link to="/">Home</Link>
          <Link to="test">Test</Link>
          <Link to="/notFound">Not found</Link>
        </Box>

        <Suspense fallback={<LinearProgress />}>
          <Routes>
            <Route path="/" element={<HomeWeb />} />
            <Route path="test" element={<h1>Test</h1>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Box>
    </ThemeProvider>
  );
}

export default App;
