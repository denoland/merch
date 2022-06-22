import useSWR, { mutate } from "swr";
import { graphql } from "@/utils/shopify.ts";

export interface CartData {
  id: string;
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          title: string;
        };
        estimatedCost: {
          totalAmount: {
            amount: number;
            currencyCode: string;
          };
        };
      };
    }[];
  };
  estimatedCost: {
    totalAmount: {
      amount: number;
      currencyCode: string;
    };
  };
}

const CART_QUERY = `{
  id
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ...on ProductVariant {
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
  }
  estimatedCost {
    totalAmount {
      amount
      currencyCode
    }
  }
}`;

async function cartFetcher(): Promise<CartData> {
  const id = localStorage.getItem("cartId");
  if (id === null) {
    const { cartCreate } = await graphql(
      `mutation { cartCreate { cart ${CART_QUERY} } }`,
    );
    localStorage.setItem("cartId", cartCreate.cart.id);
    return cartCreate.cart;
  }

  const { cart } = await graphql(
    `query($id: ID!) { cart(id: $id) ${CART_QUERY} }`,
    { id },
  );

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
  const mutation = graphql<{ cart: CartData }>(ADD_TO_CART_QUERY, {
    cartId,
    lines: [{ merchandiseId: productId }],
  }).then(({ cart }) => cart);
  mutate("cart", mutation);
}

const REMOVE_FROM_CART_MUTATION = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart ${CART_QUERY}
    }
  }
`;

export async function removeFromCart(cartId: string, lineItemId: string) {
  const mutation = graphql<{ cart: CartData }>(REMOVE_FROM_CART_MUTATION, {
    cartId,
    lineIds: [lineItemId],
  }).then(({ cart }) => cart);
  mutate("cart", mutation);
}

export function formatCurrency(
  amount: { amount: number; currencyCode: string },
) {
  const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: amount.currencyCode,
  });
  return intl.format(amount.amount);
}
