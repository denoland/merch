/** @jsx h */
import { h } from "$fresh/runtime.ts";
import { tw } from "twind";

export default function Home() {
  return (
    <div class={tw`flex h-screen justify-center items-center flex-col`}>
      <img src="/logo.svg" alt="Deno Logo" class={tw`h-24 w-24`} />
      <h1 class={tw`text-4xl font-medium py-16`}>Welcome to the Deno Shop!</h1>
    </div>
  );
}
