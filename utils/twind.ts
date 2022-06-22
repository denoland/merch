import { IS_BROWSER } from "$fresh/runtime.ts";
import { setup, ThemeConfiguration } from "twind";
import * as colors from "twind/colors";
export * from "twind";
export const theme: ThemeConfiguration = {
  colors: {
    black: colors.black,
    gray: colors.gray,
    white: colors.white,
    transparent: "transparent",
    red: colors.red,
  },
  extend: {
    spacing: {
      18: "4.5rem",
    },
  },
};
if (IS_BROWSER) setup({ theme });
