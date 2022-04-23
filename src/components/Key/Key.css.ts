import { style, globalStyle, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../theme.css';
const { color } = vars;

export const baseKey = style({
  background: color.background200,
  padding: '15px 10px',
  marginRight: 6,
  // minWidth: 36,
  fontSize: 18,
  textTransform: 'uppercase',
  borderRadius: 4,
  selectors: {
    '&:last-child': {
      marginRight: 0,
    },
    '&:active': {
      background: color.background300,
    },
  },
});

export const key = styleVariants({
  default: [baseKey],
  isPresent: [
    baseKey,
    {
      background: color.warning,
    },
  ],
  isMissing: [
    baseKey,
    {
      background: color.background50,
      color: color.foreground200,
    },
  ],
  isCorrect: [
    baseKey,
    {
      background: color.success250,
    },
  ],
});
