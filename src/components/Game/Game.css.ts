import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '../../theme.css';

export const main = style({
  fontFamily: vars.font.body,
  color: 'white',
  padding: 15,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  // alignItems: "center",
  background: vars.color.background,
  minHeight: '100%',
  justifyContent: 'space-between',
});

export const content = style({
  alignItems: 'center',
  margin: '0 auto',
});

export const keyboard = style({});
