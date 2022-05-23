import { config } from "$std/dotenv/mod.ts";

await config({ export: true });

function env(name: string): string {
  const val = Deno.env.get(name);
  if (val === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return val;
}

export const SHOPIFY_SHOP = env("SHOPIFY_SHOP");
export const SHOPIFY_ACCESS_TOKEN = env("SHOPIFY_ACCESS_TOKEN");
