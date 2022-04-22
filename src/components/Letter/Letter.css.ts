import { style, globalStyle, styleVariants } from "@vanilla-extract/css";
import { vars } from "../../theme.css";
import { lighten } from "polished";

const { color } = vars;

export const letter = style({
  marginRight: "4px",
  minHeight: "45px",
  minWidth: "45px",
  fontWeight: "900",
  perspective: "1000px" /* Remove this if you don't want the 3D effect */,
  selectors: {
    "&:last-child": {
      marginRight: 0,
    },
  },
});

export const letterContentBase = style({
  width: "100%",
  height: "100%",
  padding: 0,
  margin: 0,
  transition: "all 0.4s",
  transformStyle: "preserve-3d",
  background: vars.color.background50,
  borderRadius: 5,
  color: vars.color.foreground,
});

export const letterContent = styleVariants({
  default: [letterContentBase],
  selected: [
    letterContentBase,
    {
      background: "transparent",
      boxShadow: `0 0 0 3px ${color.background200} inset`,
    },
  ],
  highlighted: [
    letterContentBase,
    {
      background: "transparent",
      boxShadow: `0 0 0 3px ${color.foreground} inset`,
    },
  ],
  correct: [
    letterContentBase,
    {
      background: color.success250,
      transform: "rotateY(180deg)",
    },
  ],
  exists: [
    letterContentBase,
    {
      background: color.warning,
      transform: "rotateY(180deg)",
    },
  ],
  revealed: [
    letterContentBase,
    {
      background: vars.color.background200,
      transform: "rotateY(180deg)",
    },
  ],
});

const baseLetter = style({
  position: "absolute",
  width: "100%",
  height: "100%",
  backfaceVisibility: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  /*
  Fix for backface-visibility not working in firefox
  */
  transform: "rotateX(0deg)",
});

export const letterFront = style([baseLetter, {}]);
export const letterBack = style([
  baseLetter,
  {
    transform: "rotateY(180deg)",
  },
]);
