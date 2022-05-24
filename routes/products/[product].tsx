/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, PageProps } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { tw } from "twind";
import { query } from "@/utils/shopify.ts";
import { NavBar } from "@/components/NavBar.tsx";

const q = `query ($product: String!) {
  product(handle: $product) {
    title
    description
    # TODO: use 'descriptionHtml' instead of 'description'

    featuredImage {
      url
      width
      height
      altText
    }
  }
}`;

export const handler: Handlers = {
  async GET(req, ctx) {
    const data = await query(q, { product: ctx.params.product });
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps) {
  return (
    <>
      <NavBar />
      <div class={tw`px-4 sm:px-8 py-6`}>
        <h2 class={tw`text-2xl font-semibold`}>{data.product.title}</h2>
        <p>{data.product.description}</p>
        {data.product.featuredImage && (
          <img
            src={data.product.featuredImage.url}
            alt={data.product.featuredImage.altText}
            width={data.product.featuredImage.width}
            height={data.product.featuredImage.height}
            class={tw`mt-4 w-32`}
          />
        )}
      </div>
    </>
  );
}
