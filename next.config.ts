import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/isp-proxy/:path*",
        destination: "https://pavilionsquarekl.com/ISP/:path*",
      },
      {
        source: "/media/:path*",
        destination: "https://pavilionsquarekl.com/ISP/media/:path*",
      },
    ];
  },
};

export default nextConfig;
