/** @jsx h */
import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "@twind";
import { css } from "twind/css";
import { aspectRatio } from "@twind/aspect-ratio";
import AddToCart from "@/islands/AddToCart.tsx";
import { formatCurrency } from "@/utils/data.ts";
import { Product } from "@/utils/types.ts";

const descriptionStyles = css({
  "a": {
    color: "blue",
  },
});

export default function ProductDetails({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants.nodes[0]);

  return (
    <div
      class={tw
        `w-11/12 max-w-5xl mx-auto mt-24 lg:grid lg:grid-cols-2 lg:gap-x-16`}
    >
      {/* Product details */}
      <div>
        <div
          class={tw`flex flex-col gap-4`}
        >
          <div class={tw`w-full flex items-center justify-between gap-4`}>
            <h2 class={tw`text-xl lg:!text-2xl font-semibold text-gray-800`}>
              {product.title}
            </h2>
            <div
              class={tw
                `bg-[#E8E7E5] rounded-full px-6 py-2 text-lg text-gray-900 font-bold`}
            >
              {formatCurrency(variant.priceV2)}
            </div>
          </div>
        </div>

        <section
          aria-labelledby="information-heading"
          class={tw`mt-12 pt-6 border-t-1 border-gray-200`}
        >
          <h2 id="information-heading" class={tw`sr-only`}>
            Product information
          </h2>

          {!variant.availableForSale && (
            <div class={tw`flex items-center`}>
              <p class={tw`text-base text-gray-500`}>
                Out of stock
              </p>
            </div>
          )}

          <div class={tw`mt-4 space-y-6`}>
            <p
              class={tw`text-base text-gray-600 ${descriptionStyles}`}
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          </div>
        </section>
      </div>

      {/* Product image */}
      <div
        class={tw`${
          aspectRatio(1, 1)
        } w-full bg-white rounded-xl overflow-hidden border-2 border-gray-200 mt-12 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-start`}
      >
        <div class={tw`rounded-lg overflow-hidden`}>
          {product.featuredImage && (
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText}
              width={product.featuredImage.width}
              height={product.featuredImage.height}
              class={tw`w-full h-full object-center object-contain`}
            />
          )}
        </div>
      </div>

      {/* Product form */}
      <div
        class={tw
          `mt-12 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start`}
      >
        <section aria-labelledby="options-heading">
          {product.variants.nodes.length > 1 && (
            <div class={tw`group`}>
              <div
                class={tw
                  `relative p-4 flex items-center justify-between rounded-lg border-2 border-gray-300 group-hover:border-gray-400 transition-colors`}
              >
                <span>{/* space holderplace, don't remove */}</span>
                <span
                  class={tw
                    `text-gray-400 group-hover:text-gray-600 transition-colors`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 5.85716L8 3.00002L11 5.85716"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11 10.1429L8 13L5 10.1429"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <select
                  onChange={(e) =>
                    setVariant(
                      JSON.parse((e.target as HTMLSelectElement).value),
                    )}
                  class={tw
                    `absolute pl-4 top-0 left-0 block w-full h-full rounded-lg appearance-none bg-transparent cursor-pointer`}
                >
                  {product.variants.nodes.map((variant) => {
                    return (
                      <option value={JSON.stringify(variant)}>
                        {variant.title}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}
          {variant.availableForSale && (
            <div class={tw`mt-4`}>
              <AddToCart id={variant.id} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
