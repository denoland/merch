import { SHOPIFY_ACCESS_TOKEN, SHOPIFY_SHOP } from "./config.ts";

export async function query<T>(
  query: string,
  variables: Record<string, any> = {},
): Promise<T> {
  const resp = await fetch(`https://${SHOPIFY_SHOP}/api/2022-04/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`${resp.status} ${body}`);
  }
  const json = await resp.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: any) => e.message).join("\n"));
  }
  return json.data as T;
}
