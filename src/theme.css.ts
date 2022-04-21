import { createTheme, style } from "@vanilla-extract/css";
/* @ts-ignore */
import colors from "tailwindcss/colors";

export const [themeClass, vars] = createTheme({
  color: {
    bg: "#15161E",
  },
  font: {
    body: "Avenir, Helvetica, Arial, sans-serif",
  },
});
