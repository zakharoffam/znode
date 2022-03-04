import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ErrorInterceptor } from "../error-interceptor";

export function HomePage() {
  const [error, setError] = useState(false);

  return (
    <ErrorInterceptor appName="Домашняя страница">
      <Box>
        <Typography>Домашняя страница</Typography>
        <Link to="/">Домой</Link>
        <br />
        <Link to="/404">Страница ошибки 404</Link>
        <br />
        <Link to="/common-error">Страница общей ошибки приложения</Link>
        <br />
        <Button onClick={() => setError(true)}>Error</Button>
        {error && new Error('sfdsjfkldsfkdlj')}
      </Box>
    </ErrorInterceptor>
  );
}
