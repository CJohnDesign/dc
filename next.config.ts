import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  
  // Configure rewrites for subdomain routing
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'fund.localhost:3000',
          },
        ],
        destination: '/fund/:path*',
      },
      // For production, add your actual domain
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'fund.yourdomain.com',
          },
        ],
        destination: '/fund/:path*',
      },
    ];
  },
};

export default nextConfig;
