/** @jsx h */
import { h } from "preact";
import { Head } from "$fresh/runtime.ts";

export function HeadElement({ description, image, title, url }) {
    return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <meta name="description" content={description} />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content={url.href} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content={url.hostname} />
      <meta property="twitter:url" content={url.href} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
