/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export function Footer() {
  return (
    <footer
      class={tw
        `h-18 px-4 sm:px-8 border-gray-200 sm:border-transparent border-b flex items-center gap-4`}
    >
      <a href="https://fresh.deno.dev">
        <span class={tw`flex items-center gap-1`}>
          <img
            src="/fresh_logo.svg"
            alt="Fresh Logo"
            class={tw`h-7 w-7`}
          />
          Built with Fresh
        </span>
      </a>
      |
      <span className="flex items-center lt-sm:gap-4 gap-9">
        <a href="https://github.com/denoland/merch">
          Source
        </a>
      </span>
    </footer>
  );
}
