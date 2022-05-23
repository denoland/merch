import { IS_BROWSER } from "$fresh/runtime.ts";
import { apply, setup, tw } from "$twind";
import * as colors from "$twind/colors";
export { apply, setup, tw };
export const theme = {
  colors: {
    black: colors.black,
    gray: colors.gray,
    white: colors.white,
    transparent: "transparent",
    red: colors.red,
  },
};
if (IS_BROWSER) setup({ theme });
