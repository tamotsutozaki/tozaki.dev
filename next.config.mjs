/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Export estático (Cloudflare Pages). O contato vai por uma Pages Function.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
