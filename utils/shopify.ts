const SHOPIFY_SHOP = Deno.env.get("SHOPIFY_SHOP");
const SHOPIFY_ACCESS_TOKEN = Deno.env.get("SHOPIFY_ACCESS_TOKEN");

if (SHOPIFY_SHOP === undefined || SHOPIFY_ACCESS_TOKEN === undefined) {
  throw new Error(
    "env `SHOPIFY_SHOP` and `SHOPIFY_ACCESS_TOKEN` must be set",
  );
}

export async function graphql<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const resp = await fetch(`https://${SHOPIFY_SHOP}/api/2022-04/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`${resp.status} ${body}`);
  }
  const json = await resp.json();
  if (json.errors) {
    throw new Error(json.errors.map((e: Error) => e.message).join("\n"));
  }
  return json.data as T;
}
