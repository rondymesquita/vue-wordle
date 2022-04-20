import { style } from '@vanilla-extract/css';

export const word = style({
  display: 'flex',
  padding: '4px',
  textTransform: 'uppercase',
});

export const wordIsSelected = style({
  border: '1px solid red',
});
