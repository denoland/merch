import useSWR, { mutate } from "swr";
import { Image, Money } from "./types.ts";

export interface CartData {
  id: string;
  lines: {
    nodes: {
      id: string;
      quantity: number;
      merchandise: {
        product: {
          title: string;
        };
        title: string;
        image: Image;
      };
      estimatedCost: {
        totalAmount: Money;
      };
    }[];
  };
  checkoutUrl: string;
  estimatedCost: {
    totalAmount: Money;
  };
}

const CART_QUERY = `{
  id
  lines(first: 100) {
    nodes {
      id
      quantity
      merchandise {
        ...on ProductVariant {
          title
          image {
            url
            altText
          }
          product {
            title
          }
        }
      }
      estimatedCost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
  checkoutUrl
  estimatedCost {
    totalAmount {
      amount
      currencyCode
    }
  }
}`;

// deno-lint-ignore no-explicit-any
function shopifyFetch<T = any>(query: string, variables?: unknown): Promise<T> {
  return fetch("/api/shopify", {
    method: "POST",
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());
}

async function cartFetcher(): Promise<CartData> {
  const id = localStorage.getItem("cartId");
  if (id === null) {
    const { cartCreate } = await shopifyFetch<
      { cartCreate: { cart: CartData } }
    >(`mutation { cartCreate { cart ${CART_QUERY} } }`);
    localStorage.setItem("cartId", cartCreate.cart.id);
    return cartCreate.cart;
  }

  const { cart } = await shopifyFetch(
    `query($id: ID!) { cart(id: $id) ${CART_QUERY} }`,
    { id },
  );
  if (cart === null) {
    // If there is a cart ID, but the returned cart is null, then the cart
    // was already part of a completed order. Clear the cart ID and get a new
    // one.
    localStorage.removeItem("cartId");
    return cartFetcher();
  }

  return cart;
}

export function useCart() {
  return useSWR<CartData, Error>("cart", cartFetcher, {});
}

const ADD_TO_CART_QUERY =
  `mutation add($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart ${CART_QUERY}
  }
}`;

export async function addToCart(cartId: string, productId: string) {
  const mutation = shopifyFetch<{ cart: CartData }>(ADD_TO_CART_QUERY, {
    cartId,
    lines: [{ merchandiseId: productId }],
  }).then(({ cart }) => cart);
  await mutate("cart", mutation);
}

const REMOVE_FROM_CART_MUTATION = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart ${CART_QUERY}
    }
  }
`;

export async function removeFromCart(cartId: string, lineItemId: string) {
  const mutation = shopifyFetch<{ cart: CartData }>(REMOVE_FROM_CART_MUTATION, {
    cartId,
    lineIds: [lineItemId],
  }).then(({ cart }) => cart);
  await mutate("cart", mutation);
}

export function formatCurrency(amount: Money) {
  const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: amount.currencyCode,
  });
  return intl.format(amount.amount);
}
