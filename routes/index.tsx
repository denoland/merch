/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { aspectRatio } from "@twind/aspect-ratio";
import { formatCurrency } from "@/utils/data.ts";
import { graphql } from "@/utils/shopify.ts";
import { Footer } from "@/components/Footer.tsx";
import { HeadElement } from "@/components/HeadElement.tsx";
import { Header } from "@/components/Header.tsx";
import IconCart from "@/components/IconCart.tsx";
import { List, Product } from "../utils/types.ts";

const q = `{
  products(first: 10) {
    nodes {
      id
      handle
      title
      featuredImage {
        url
        width
        height
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
}`;

interface Data {
  products: List<Product>;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const data = await graphql<Data>(q);
    return ctx.render(data);
  },
};

export default function Home(ctx: PageProps<Data>) {
  const { data, url } = ctx;
  const products = data.products.nodes;
  return (
    <div>
      <HeadElement
        description="Shop for Deno Merch"
        image={url.href + "og-image.png"}
        title="Deno Merch"
        url={url}
      />
      <Header />
      <div class={tw`w-11/12 max-w-5xl mx-auto mt-24`}>
        <svg
          width="100"
          height="4"
          viewBox="0 0 100 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line y1="2" x2="100" y2="2" stroke="#ccc" stroke-width="3" />
        </svg>
        <h2 class={tw`text-2xl lg:!text-4xl font-medium mt-6 text-gray-800`}>
          Deno's collection of Dino in the rain<br /> for you and your friends.
        </h2>
      </div>
      <div
        class={tw`w-11/12 max-w-5xl mx-auto mt-24`}
      >
        <div
          class={tw
            `grid grid-cols-1 gap-12 sm:!grid-cols-2 lg:!grid-cols-3 lg:!gap-16`}
        >
          {products.map((product) => <ProductCard product={product} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ProductCard(props: { product: Product }) {
  const { product } = props;
  return (
    <a key={product.id} href={`/products/${product.handle}`} class={tw`group`}>
      <div
        class={tw`${
          aspectRatio(1, 1)
        } w-full bg-white rounded-xl overflow-hidden border-2 border-gray-200 group-hover:border-gray-300 group-hover:shadow-lg transition-all duration-500 relative`}
      >
        {product.featuredImage && (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            width={product.featuredImage.width}
            height={product.featuredImage.height}
            class={tw
              `w-full h-full object-center object-contain absolute block`}
          />
        )}
        <div
          class={tw
            `w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.6)] opacity-0 group-hover:opacity-90 transition-all duration-500`}
        >
          <IconCart size={30} />
        </div>
      </div>
      <div class={tw`flex items-center justify-between mt-3`}>
        <h3 class={tw`text-lg text-gray-800 font-medium`}>{product.title}</h3>
        <strong class={tw`text-lg font-bold text-gray-800`}>
          {formatCurrency(product.priceRange.minVariantPrice)}
        </strong>
      </div>
    </a>
  );
}
