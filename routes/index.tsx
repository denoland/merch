/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, PageProps } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { tw } from "twind";
import { graphql } from "@/utils/shopify.ts";
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
    const data = await graphql(q);
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps) {
  return (
    <div>
      <NavBar />
      <div
        class={tw
          `max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8`}
      >
        <h2 class={tw`sr-only`}>Products</h2>

        <div
          class={tw
            `grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8`}
        >
          {data.products.edges.map(({ node }) => (
            <a
              key={node.id}
              href={`/products/${node.handle}`}
              class={tw`group`}
            >
              <div
                class={tw
                  `w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8`}
              >
                <img
                  src={node.featuredImage.url}
                  alt={node.featuredImage.altText}
                  width={node.featuredImage.width}
                  height={node.featuredImage.height}
                  class={tw
                    `w-full h-full object-center object-cover group-hover:opacity-75`}
                />
              </div>
              <h3 class={tw`mt-4 text-sm text-gray-700`}>{node.title}</h3>
              <p class={tw`mt-1 text-lg font-medium text-gray-900`}>$100</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
