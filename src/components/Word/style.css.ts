import { style, globalStyle, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

export const base = style({
  display: "flex",
  marginBottom: "4px",
  textTransform: "uppercase",
  overflow: "hidden",
});

export const word = styleVariants({
  default: [base],
  selected: [
    base,
    {
      // background: "aqua",
      selectors: {
        "&::before": {
          content: "",
          position: "absolute",
          transform: "translate(-10px, -10px)",
          width: "260px",
          height: "55px",
          color: "red",
          // background: "#fafafa",
          borderRadius: "5px",
        },
      },
    },
  ],
});
