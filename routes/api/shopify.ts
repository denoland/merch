import { Handlers } from "$fresh/server.ts";
import { graphql } from "@/utils/shopify.ts";

export const handler: Handlers = {
  async POST(req) {
    const { query, variables } = await req.json();
    const data = await graphql(query, variables);
    return Response.json(data);
  },
};
