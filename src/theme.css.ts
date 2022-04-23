import { createTheme, style } from '@vanilla-extract/css';
/* @ts-ignore */
import colors from 'tailwindcss/lib/public/colors';
import { opacify, darken, lighten } from 'polished';

export const [themeClass, vars] = createTheme({
  color: {
    bg: '#15161E',
    foreground: '#fff',
    foreground200: darken(0.2, '#fff'),
    foreground300: darken(0.3, '#fff'),
    background: '#595E6D',
    background50: darken(0.1, '#595E6D'),
    background200: darken(0.2, '#595E6D'),
    background300: darken(0.3, '#595E6D'),
    accent: 'red',
    success: '#21fa90',
    success250: darken(0.25, '#21fa90'),
    warning: '#CA8A04',
    primary: '#ff1053',
    primary100: darken(0.1, '#ff1053'),
  },
  font: {
    body: 'Oxygen',
  },
});
