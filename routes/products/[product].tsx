/** @jsx h */
import { h, PageProps } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { tw } from "twind";
import { query } from "@/utils/shopify.ts";

const q = `query ($product: String!) {
  product(handle: $product) {
    title
    description
    # TODO: use 'descriptionHtml' instead of 'description'
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
    <div class={tw`flex h-screen justify-center items-center flex-col`}>
      <h2>{data.product.title}</h2>
      <p>{data.product.description}</p>
    </div>
  );
}
