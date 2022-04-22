import { style, globalStyle, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme.css";
import { lighten } from "polished";

const { color } = vars;

export const keyboard = style({
  marginTop: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export const line = style({
  display: "flex",
  marginBottom: 8,
});

export const letter = style({
  background: color.background200,
  padding: "15px 10px",
  marginRight: 6,
  fontSize: 18,
  textTransform: "uppercase",
  borderRadius: 4,
  selectors: {
    "&:last-child": {
      marginRight: 0,
    },
    "&:active": {
      background: color.background300,
    },
  },
});
