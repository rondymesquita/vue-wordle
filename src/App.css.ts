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

export const main = style({
  fontFamily: vars.font.body,
  color: 'white',
  padding: 10,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  // alignItems: "center",
  background: vars.color.background,
  height: '100vh',
  justifyContent: 'space-between',
});

export const content = style({
  alignItems: 'center',
  margin: '0 auto',
});

export const keyboard = style({});
