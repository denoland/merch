/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { formatCurrency } from "@/utils/data.ts";
import { graphql } from "@/utils/shopify.ts";
import { NavBar } from "@/components/NavBar.tsx";
import AddToCart from "@/islands/AddToCart.tsx";
import { Product } from "@/utils/types.ts";

const q = `query ($product: String!) {
  product(handle: $product) {
    title
    description
    # TODO: use 'descriptionHtml' instead of 'description'

    variants(first: 10) {
      nodes {
        id
        title
        availableForSale
        priceV2 {
          amount
          currencyCode
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

interface Query {
  product: Product | null;
}

export const handler: Handlers<Query> = {
  async GET(_req, ctx) {
    const data = await graphql<Query>(q, { product: ctx.params.product });
    if (!data.product) {
      return new Response("Product not found", { status: 404 });
    }
    return ctx.render(data);
  },
};

export default function ProductPage({ data }: PageProps<Query>) {
  return (
    <>
      <NavBar />
      <ProductDetails product={data.product!} />
    </>
  );
}

function ProductDetails({ product }: { product: Product }) {
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
          {product.title}
        </h1>

        <section aria-labelledby="information-heading" class={tw`mt-4`}>
          <h2 id="information-heading" class={tw`sr-only`}>
            Product information
          </h2>

          <div class={tw`flex items-center`}>
            <p class={tw`text-lg text-gray-900 sm:text-xl`}>
              {/* TODO: Update this when the variant value changes. */}
              {formatCurrency(product.variants.nodes[0].priceV2)}
            </p>
          </div>

          {/* TODO: Update this when the variant value changes. */}
          {!product.variants.nodes[0].availableForSale && (
            <div class={tw`flex items-center`}>
              <p class={tw`text-base text-gray-500`}>
                Out of stock
              </p>
            </div>
          )}

          <div class={tw`mt-4 space-y-6`}>
            <p class={tw`text-base text-gray-500`}>
              {product.description}
            </p>
          </div>
        </section>
      </div>

      {/* Product image */}
      <div
        class={tw`mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center`}
      >
        <div class={tw`rounded-lg overflow-hidden`}>
          {product.featuredImage && (
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText}
              width={product.featuredImage.width}
              height={product.featuredImage.height}
              class={tw`w-full h-full object-center object-cover`}
            />
          )}
        </div>
      </div>

      {/* Product form */}
      <div
        class={tw
          `mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start`}
      >
        <section aria-labelledby="options-heading">
          <form>
            {product.variants.nodes.length > 1 && (
              <select
                class={tw
                  `w-full border rounded-md py-3 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-50`}
              >
                {product.variants.nodes.map((variant) => {
                  return <option value={variant.id}>{variant.title}</option>;
                })}
              </select>
            )}
            {product.variants.nodes[0].availableForSale && (
              <div class={tw`mt-10`}>
                {/* TODO: Update this when the variant value changes. */}
                <AddToCart id={product.variants.nodes[0].id} />
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
