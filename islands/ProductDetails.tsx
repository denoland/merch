/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import AddToCart from "@/islands/AddToCart.tsx";
import { formatCurrency } from "@/utils/data.ts";
import { Product } from "@/utils/types.ts";

export default function ProductDetails({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants.nodes[0]);

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
              {formatCurrency(variant.priceV2)}
            </p>
          </div>

          {!variant.availableForSale && (
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
                onChange={(e) => setVariant(JSON.parse(e.target.value))}
                class={tw
                  `w-full border rounded-md py-3 px-8 flex items-center justify-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-50`}
              >
                {product.variants.nodes.map((variant) => {
                  return <option value={JSON.stringify(variant)}>{variant.title}</option>;
                })}
              </select>
            )}
            {variant.availableForSale && (
              <div class={tw`mt-10`}>
                <AddToCart id={variant.id} />
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
}
