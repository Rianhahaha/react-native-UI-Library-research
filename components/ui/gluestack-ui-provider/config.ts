"use client";
import { vars } from "nativewind";

export const config = {
  light: vars({
    "--background": "#FFFFFF",
    "--background-50": "#FFBCFB",
    "--background-100": "#FEE7FF",
    "--card": "#ffffff30",
    "--text": "#000000",
    "--border": "#ffffff70",
  }),
  dark: vars({
    "--background": "#372141",
    "--background-50": "#562261",
    "--background-100": "#1D131A",
    "--card": "#00000040",
    "--text": "#ffffff",
    "--border": "#D951DF50",
  }),
};
