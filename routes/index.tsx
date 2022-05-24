/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, PageProps } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { tw } from "twind";
import { query } from "@/utils/shopify.ts";
import { NavBar } from "@/components/NavBar.tsx";

const q = `{
  products(first: 10) {
    edges {
      node {
        id
        handle
        title
        featuredImage {
          url
          width
          height
          altText
        }
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
    <>
      <NavBar />
      <ul class={tw`text-xl px-4 sm:px-8 py-6`}>
        {data.products.edges.map(({ node }) => (
          <li
            key={node.id}
            class={tw`flex gap-4 items-center border border-gray-100`}
          >
            {node.featuredImage
              ? (
                <img
                  src={node.featuredImage.url}
                  alt={node.featuredImage.altText}
                  width={node.featuredImage.width}
                  height={node.featuredImage.height}
                  class={tw`w-16`}
                />
              )
              : <div class={tw`w-16 bg-gray-100`}></div>}
            <a href={`/products/${node.handle}`} class={tw`hover:underline`}>
              {node.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
