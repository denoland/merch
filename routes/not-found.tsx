import { Footer } from "@/components/Footer.tsx";
import { Header } from "@/components/Header.tsx";

export default function Thanks() {
  return (
    <>
      <Header />
      <div class="w-11/12 max-w-5xl mx-auto mt-8 lg:grid lg:grid-cols-2 lg:gap-x-16">
        <p class="text-xl">
          Sorry, either you've already claimed your shirt or your email isn't
          registered!
        </p>
      </div>
      <Footer />
    </>
  );
}
