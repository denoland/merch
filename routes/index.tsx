/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { tw } from "@twind";
import { formatCurrency } from "@/utils/data.ts";
import { graphql } from "@/utils/shopify.ts";
import { Footer } from "@/components/Footer.tsx";
import { NavBar } from "@/components/NavBar.tsx";
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

export default function Home({ data }: PageProps<Data>) {
  const products = data.products.nodes;
  return (
    <div>
      <NavBar />
      <div
        class={tw
          `max-w-2xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8`}
      >
        <h2 class={tw`sr-only`}>Products</h2>

        <div
          class={tw
            `grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8`}
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
      <div class={tw`w-full bg-gray-200 rounded-lg overflow-hidden`}>
        {product.featuredImage && (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText}
            width={product.featuredImage.width}
            height={product.featuredImage.height}
            class={tw
              `w-full h-full object-center object-cover group-hover:opacity-75`}
          />
        )}
      </div>
      <h3 class={tw`mt-4 text-sm text-gray-700`}>{product.title}</h3>
      <p class={tw`mt-1 text-lg font-medium text-gray-900`}>
        {formatCurrency(product.priceRange.minVariantPrice)}
      </p>
    </a>
  );
}
