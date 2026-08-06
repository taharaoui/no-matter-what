import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
  // /histoire told the old placeholder three-generations story and was
  // replaced by /a-propos (the real one) — redirected rather than left to
  // 404 for anything already indexed or bookmarked.
  async redirects() {
    return [
      { source: "/histoire", destination: "/a-propos", permanent: true },
    ];
  },
};

export default nextConfig;
