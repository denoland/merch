import GitHub from "./IconGithub.tsx";

export function Footer() {
  return (
    <footer class="w-11/12 max-w-5xl mx-auto mt-24 sm:!mt-28 mb-8 flex items-center justify-between">
      <span class="flex items-center gap-4">
        <a
          class="flex items-center gap-2 text-gray-700"
          href="https://fresh.deno.dev"
        >
          <a href="https://fresh.deno.dev">
            <img
              width="197"
              height="37"
              src="https://fresh.deno.dev/fresh-badge.svg"
            />
          </a>
        </a>
        <a
          class="hover:underline flex gap-2 items-center"
          href="https://github.com/thorwebdev/SupaSwagStore"
        >
          <GitHub class="h-5 w-5 text-gray-500" />
          Source
        </a>
      </span>
      <a
        class="text-sm text-gray-400 hidden items-center gap-2 sm:!flex"
        href="https://deno-merch.myshopify.com"
      >
        Powered by
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          width={(28 / 32) * 20}
          height={20}
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 109 113"
          fill="none"
        >
          <path
            d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
            fill="url(#paint0_linear)"
          />
          <path
            d="M63.7076 110.284C60.8481 113.885 55.0502 111.912 54.9813 107.314L53.9738 40.0627L99.1935 40.0627C107.384 40.0627 111.952 49.5228 106.859 55.9374L63.7076 110.284Z"
            fill="url(#paint1_linear)"
            fill-opacity="0.2"
          />
          <path
            d="M45.317 2.07103C48.1765 -1.53037 53.9745 0.442937 54.0434 5.041L54.4849 72.2922H9.83113C1.64038 72.2922 -2.92775 62.8321 2.1655 56.4175L45.317 2.07103Z"
            fill="#3ECF8E"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="53.9738"
              y1="54.974"
              x2="94.1635"
              y2="71.8295"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#249361" />
              <stop offset="1" stop-color="#3ECF8E" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="36.1558"
              y1="30.578"
              x2="54.4844"
              y2="65.0806"
              gradientUnits="userSpaceOnUse"
            >
              <stop />
              <stop offset="1" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        Supabase
      </a>
    </footer>
  );
}
