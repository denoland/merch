/** @jsx h */
import { h } from "$fresh/runtime.ts";
import { tw } from "twind";
import Cart from "../islands/Cart.tsx";

export function NavBar() {
  return (
    <nav
      class={tw
        `h-18 px-4 sm:px-8 border-gray-200 sm:border-transparent border-b flex items-center gap-4`}
    >
      <a href="/">
        <img
          src="/logo.svg"
          alt="Deno Logo"
          class={tw`h-7 w-7`}
        />
      </a>
      <a href="/">
        <h1 class={tw`text-xl`}>
          Deno <span class={tw`font-light`}>Shop</span>
        </h1>
      </a>
      <Cart />
    </nav>
  );
}
