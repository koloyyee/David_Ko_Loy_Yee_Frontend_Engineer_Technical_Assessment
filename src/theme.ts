/* eslint-disable new-cap */
import {red} from '@mui/material/colors';
import {createTheme} from '@mui/material/styles';
import {Roboto} from '@next/font/google';

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#191357',
    },
    secondary: {
      main: 'rgb(255, 0, 104)',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
