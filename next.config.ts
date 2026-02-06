import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.vasudhev.com",
          },
        ],
        destination: "https://vasudhev.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "vasudhev.com",
          },
        ],
        destination: "https://vasudhev.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
