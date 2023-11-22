import { tw } from "twind";
import { css } from "twind/css";
import { aspectRatio } from "@twind/aspect-ratio";
import EmailForm from "@/islands/EmailForm.tsx";

const descriptionStyles = css({
  a: {
    color: "#056CF0",
  },
  "a:hover": {
    textDecoration: "underline",
  },
});

export default function ProductDetails() {
  return (
    <div class="w-11/12 max-w-5xl mx-auto mt-8 lg:grid lg:grid-cols-2 lg:gap-x-16">
      {/* Product details */}
      <div>
        <div class="flex flex-col gap-4">
          <div class="w-full flex items-center justify-between gap-4">
            <hgroup>
              <h2 class="text-xl lg:!text-2xl font-semibold text-gray-800">
                T Shirt (Dark mode)
              </h2>
            </hgroup>
            <div class="bg-[#E8E7E5] rounded-full px-6 py-2 text-lg text-gray-900 font-bold">
              FREE
            </div>
          </div>
        </div>

        <section
          aria-labelledby="information-heading"
          class="mt-12 pt-6 border-t-1 border-gray-200"
        >
          <h2 id="information-heading" class="sr-only">
            Product information
          </h2>

          <div class="mt-4 space-y-6">
            <p class={tw`text-base text-gray-600 ${descriptionStyles}`}>
              SupaCharge your closet with Supabase T Shirts. Made of comfortable
              cotton.
            </p>
          </div>
        </section>
      </div>

      {/* Product image */}
      <div
        class={tw`${aspectRatio(
          1,
          1
        )} w-full bg-white rounded-xl border-2 border-gray-200 mt-12 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-start`}
      >
        <div class="rounded-lg overflow-hidden">
          {
            <img
              id="productImage"
              src="https://supabase.store/cdn/shop/products/tshirt_6fab2a57-963b-41bb-9ba5-0982128f2919_2048x2048.png?v=1696844402"
              alt="The classic Supa Shirt"
              width="400"
              height="400"
              class="w-full h-full object-center object-contain"
            />
          }
        </div>
      </div>

      {/* Email form */}
      <EmailForm />
    </div>
  );
}
