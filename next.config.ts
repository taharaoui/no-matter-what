import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
      {
        // Supabase Storage — images uploaded through /admin land here
        // instead of public/images/*.jpg, both for the admin's own
        // previews and wherever the public site renders that same URL
        // (menu items, gallery pieces).
        protocol: "https",
        hostname: "vrswphioblmtaocbxvzz.supabase.co",
        pathname: "/storage/v1/object/public/**",
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
