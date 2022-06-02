/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, IS_BROWSER, useRef } from "$fresh/runtime.ts";
import { tw } from "$twind";

// Lazy load a <dialog> polyfill.
// @ts-expect-error HTMLDialogElement is not just a type!
if (IS_BROWSER && window.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

declare global {
  interface HTMLDialogElement {
    showModal(): void;
    close(): void;
  }
}

export default function Cart() {
  const ref = useRef<HTMLDialogElement | null>(null);

  const onDialogClick = (e: MouseEvent) => {
    if ((e.target as HTMLDialogElement).tagName === "DIALOG") {
      ref.current!.close();
    }
  };

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `dialog[open] {
  animation: show-bottom 0.4s ease normal;
}

@media (min-width: 640px) {
  dialog[open] {
    animation: show-right 0.4s ease normal;
  }
}

@keyframes show-bottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}


@keyframes show-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
}
`,
        }}
      >
      </style>
      <dialog
        ref={ref}
        class={tw
          `p-0 m-0 pt-[50%] sm:pt-0 sm:ml-auto bg-transparent max-w-full sm:max-w-lg w-full h-full max-h-full`}
        onClick={onDialogClick}
      >
        <div
          class={tw
            `py-8 px-6 h-full bg-white rounded-t-2xl sm:rounded-tr-none sm:rounded-l-2xl flex flex-col justify-between`}
        >
          <h1 class={tw`text-4xl font-bold m-0`}>Cart</h1>
          <button class={tw`p-2 border border-gray-500 rounded-xl bg-gray-100`}>
            Checkout
          </button>
        </div>
      </dialog>
      <button onClick={() => ref.current!.showModal()}>Cart</button>
    </div>
  );
}
