import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalStyle('body', {
  padding: 0,
  margin: 0,
  zoom: '100%',
});

globalStyle('*', {
  padding: 0,
  // margin: '0 auto',
  boxSizing: 'border-box',
  userSelect: 'none',
});
