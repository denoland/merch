/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export function Footer() {
  return (
    <footer
      class={tw`w-11/12 max-w-5xl mx-auto mt-32 mb-12 flex justify-between`}
    >
      <span class={tw`flex items-center gap-4`}>
        <a
          class={tw`flex items-center gap-2 text-gray-700`}
          href="https://fresh.deno.dev"
        >
          <img
            src="/fresh_logo.svg"
            alt="Fresh Logo"
            class={tw`h-7 w-7`}
          />
          Built with <strong>Fresh</strong>
        </a>
        <span class={tw`text-gray-300 text-sm`}>|</span>
        <a class={tw`hover:underline`} href="https://github.com/denoland/merch">
          Source
        </a>
      </span>
    </footer>
  );
}
