/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { addToCart, useCart } from "@/utils/data.ts";

interface AddToCartProps {
  id: string;
}

export default function AddToCart(props: AddToCartProps) {
  const { data } = useCart();
  console.log("data", data);

  const add = (e) => {
    e.preventDefault();
    console.log("add", props.id);
    addToCart(data!.id, props.id);
  };

  return (
    <button
      onClick={add}
      disabled={!data}
      class={tw
        `w-full bg-gray-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-50`}
    >
      Add to cart
    </button>
  );
}
