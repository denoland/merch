/** @jsx h */
import { h, PageProps } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { tw } from "twind";
import { query } from "@/utils/shopify.ts";

const q = `{
  shop {
    name
  }

  products(first: 10) {
    edges {
      node {
        id
        handle
        title
      }
    }
  }
}`;

export const handler: Handlers = {
  async GET(req, ctx) {
    const data = await query(q);
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps) {
  return (
    <div class={tw`flex h-screen justify-center items-center flex-col`}>
      <img src="/logo.svg" alt="Deno Logo" class={tw`h-24 w-24`} />
      <h1 class={tw`text-4xl font-medium py-16`}>
        Welcome to {data.shop.name}!
      </h1>
      <ul class={tw`text-xl list-disc`}>
        {data.products.edges.map(({ node }) => (
          <li key={node.id}>
            <a href={`/products/${node.handle}`} class={tw`hover:underline`}>
              {node.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
