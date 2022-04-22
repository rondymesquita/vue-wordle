import { createTheme, style } from "@vanilla-extract/css";
/* @ts-ignore */
import colors from "tailwindcss/lib/public/colors";
import { opacify, darken, lighten } from "polished";

export const [themeClass, vars] = createTheme({
  color: {
    bg: "#15161E",
    foreground: "#fff",
    background: "#595E6D",
    background50: darken(0.1, "#595E6D"),
    background200: darken(0.2, "#595E6D"),
    accent: "red",
    success: "#21fa90",
    success250: darken(0.25, "#21fa90"),
    warning: "#CA8A04",
  },
  font: {
    body: "Avenir, Helvetica, Arial, sans-serif",
  },
});
