import { style, globalStyle, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../theme.css';
import { lighten } from 'polished';

const { color } = vars;

export const keyboard = style({
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const line = style({
  display: 'flex',
  marginBottom: 8,
  justifyContent: 'center',
  width: '100%',
});
