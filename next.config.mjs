/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: hasil build berupa HTML statis di folder out/,
  // disajikan Cloudflare Workers Static Assets (lihat wrangler.jsonc).
  output: 'export',
};

export default nextConfig;
