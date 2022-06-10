/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, PageProps } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import { tw } from "twind";
import { graphql } from "@/utils/shopify.ts";
import { NavBar } from "@/components/NavBar.tsx";
import AddToCart from "@/islands/AddToCart.tsx";

const q = `query ($product: String!) {
  product(handle: $product) {
    title
    description
    # TODO: use 'descriptionHtml' instead of 'description'

    variants(first: 10) {
      edges {
        node {
          id
        }
      }
    }

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
    const data = await graphql(q, { product: ctx.params.product });
    return ctx.render(data);
  },
};

export default function Home({ data }: PageProps) {
  console.log("data", data.product.variants);
  return (
    <>
      <NavBar />
      <ProductDetails data={data} />
    </>
  );
}

function ProductDetails({ data }: Record<string, any>) {
  return (
    <div
      class={tw
        `max-w-2xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8`}
    >
      {/* Product details */}
      <div class={tw`lg:max-w-lg`}>
        <h1
          class={tw
            `text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl`}
        >
          {data.product.title}
        </h1>

        <section aria-labelledby="information-heading" class={tw`mt-4`}>
          <h2 id="information-heading" class={tw`sr-only`}>
            Product information
          </h2>

          <div class={tw`flex items-center`}>
            <p class={tw`text-lg text-gray-900 sm:text-xl`}>$100</p>
          </div>

          <div class={tw`mt-4 space-y-6`}>
            <p class={tw`text-base text-gray-500`}>
              {data.product.description}
            </p>
          </div>
        </section>
      </div>

      {/* Product image */}
      <div
        class={tw`mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center`}
      >
        <div class={tw`rounded-lg overflow-hidden`}>
          <img
            src={data.product.featuredImage.url}
            alt={data.product.featuredImage.altText}
            width={data.product.featuredImage.width}
            height={data.product.featuredImage.height}
            class={tw`w-full h-full object-center object-cover`}
          />
        </div>
      </div>

      {/* Product form */}
      <div
        class={tw
          `mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start`}
      >
        <section aria-labelledby="options-heading">
          <form>
            <div class={tw`mt-10`}>
              <AddToCart id={data.product.variants.edges[0].node.id} />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
