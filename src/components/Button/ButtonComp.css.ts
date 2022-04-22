import { style, globalStyle, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme.css";
import { lighten } from "polished";

const { color } = vars;

export const button = style({
  padding: 8,
  background: color.primary,
  borderRadius: 4,
  textAlign: "center",
  selectors: {
    "&:active": {
      background: color.primary100,
    },
  },
});
