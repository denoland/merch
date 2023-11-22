import Input from "@/islands/Input.tsx";

export default function EmailForm() {
  return (
    <form
      method="post"
      class="mt-12 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start"
    >
      <div class="mt-4">
        <Input
          class="w-full"
          type="email"
          name="email"
          placeholder="Email"
          disabled={false}
          required
        />
      </div>
      <div class="mt-4">
        <button
          type="submit"
          disabled={false}
          class={`w-full ${
            false ? "!bg-gray-400" : "bg-gray-700"
          } border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-900`}
        >
          {false ? "Adding..." : "Send me a code!"}
        </button>
      </div>
    </form>
  );
}
