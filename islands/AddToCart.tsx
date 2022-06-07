/** @jsx h */
/** @jsxFrag Fragment */
import { h } from "$fresh/runtime.ts";
import { addToCart, useCart } from "@/utils/data.ts";
import { graphql } from "@/utils/shopify.ts";

interface AddToCartProps {
  id: string;
}

export default function AddToCart(props: AddToCartProps) {
  const { data } = useCart();
  console.log("data", data);

  const add = () => {
    console.log("add", props.id);
    addToCart(data!.id, props.id);
  };

  return (
    <button onClick={add} disabled={!data}>
      Add to Cart
    </button>
  );
}
