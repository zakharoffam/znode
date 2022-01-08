import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme } from '@mui/material';

export const theme = (mode?: 'light' | 'dark') => createTheme({
  palette: {
    mode: mode ?? 'light',
  }
});
