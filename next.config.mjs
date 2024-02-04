/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "img.clerk.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "bucketproyectoespecial.s3.us-east-2.amazonaws.com",
      "res.akamaized.net",
      "i.insider.com",
      "d7lrki2kktov4uja.public.blob.vercel-storage.com",
    ],
  },

  /**
   * If you are using `appDir` then you must comment the below `i18n` config out.
   *
   * @see https://github.com/vercel/next.js/issues/41980
   */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
};

export default config;
