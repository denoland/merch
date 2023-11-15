import { PageProps } from "$fresh/server.ts";
import { Footer } from "@/components/Footer.tsx";
import { HeadElement } from "@/components/HeadElement.tsx";
import { Header } from "@/components/Header.tsx";
import ProductDetails from "@/islands/ProductDetails.tsx";
import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    const form = await req.formData();
    const email = form.get("email")?.toString();
    console.log({ email });

    // Add email to list.

    // Redirect user to thank you page.
    const headers = new Headers();
    headers.set("location", "/thanks");
    return new Response(null, {
      status: 303, // See Other
      headers,
    });
  },
};

export default function ProductPage(ctx: PageProps) {
  const { url } = ctx;

  return (
    <>
      <HeadElement
        description="SupaCharge your closet with Supabase T Shirts. Made of comfortable cotton."
        image="https://supabase.store/cdn/shop/products/tshirt_6fab2a57-963b-41bb-9ba5-0982128f2919_940x.png?v=1696844402"
        title="Supa T Shirt (Dark mode)"
        url={url}
      />

      <Header />
      <ProductDetails />
      <Footer />
    </>
  );
}
