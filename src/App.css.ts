import { style } from '@vanilla-extract/css';
import { globalStyle } from '@vanilla-extract/css';

globalStyle('html, body', {
  background: '#1A1124',
  fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '30px',
});

export const app = style({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
});

export const inputStyle = style({
  outline: 'none !important',
  textTransform: 'uppercase',
  width: '100%',
});
