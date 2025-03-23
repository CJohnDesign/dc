import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disable the development mode indicators that appear in the bottom right corner
  
  // Configure rewrites for subdomain routing
  async rewrites() {
    return [
      {
        // This rewrite rule handles requests to the fund.localhost:3000 subdomain during local development
        source: '/:path*',        // Match any path on the subdomain
        has: [
          {
            type: 'host',         // Check the host header
            value: 'fund.localhost:3000', // Match this specific host
          },
        ],
        destination: '/fund/:path*', // Redirect to the /fund/ directory in the app
                                    // This allows subdomain requests to be handled by the /fund route
      },
      // For production environment
      {
        // This rewrite rule handles requests to the fund.yourdomain.com subdomain in production
        source: '/:path*',        // Match any path on the subdomain
        has: [
          {
            type: 'host',         // Check the host header
            value: 'fund.yourdomain.com', // Match this specific production host
          },
        ],
        destination: '/fund/:path*', // Redirect to the /fund/ directory in the app
                                    // This creates a virtual subdomain without needing separate deployments
      },
    ];
  },
};

export default nextConfig;
