import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, ThemeOptions } from '@mui/material';

/**
 * Светлая тема приложения
 */
const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 8,
  },
};

/**
 * Темная тема приложения
 */
const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#BDBDBD',
    },
  },
  shape: {
    borderRadius: 8,
  },
};


const setTheme = (mode?: 'light' | 'dark') => {
  switch (mode) {
    case 'light': return lightTheme
    case 'dark': return darkTheme
    default: return lightTheme
  }
}


export const theme = (mode?: 'light' | 'dark') => createTheme(setTheme(mode));
