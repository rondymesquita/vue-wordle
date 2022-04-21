import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle("body", {
  padding: 0,
  margin: 0,
});

globalStyle("*", {
  padding: 0,
  margin: 0,
  boxSizing: "border-box",
});

export const main = style({
  fontFamily: vars.font.body,
  color: "white",
  padding: 10,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: vars.color.bg,
});
