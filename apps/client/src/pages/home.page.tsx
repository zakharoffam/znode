import { ErrorInterceptor } from "../error-interceptor";
import { Box, Paper } from '@mui/material';
import { Header } from "@znode/client/header";

export function HomePage() {
  document.title = 'ZNode - Домашняя страница';

  return (
    <ErrorInterceptor appName="Домашняя страница">
      <Box>
        <Header />
        <Paper sx={{ margin: 2, padding: 2 }}>

        </Paper>
      </Box>
    </ErrorInterceptor>
  );
}
