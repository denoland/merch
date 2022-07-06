/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Footer } from "@/components/Footer.tsx";
import { NavBar } from "@/components/NavBar.tsx";
import ProductDetails from "@/islands/ProductDetails.tsx";
import { graphql } from "@/utils/shopify.ts";
import { Product } from "@/utils/types.ts";

const q = `query ($product: String!) {
  product(handle: $product) {
    title
    descriptionHtml

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
      <Footer />
    </>
  );
}
