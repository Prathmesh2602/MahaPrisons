import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://13-204-230-95.sslip.io';
    return [
      {
        source: '/uploads/:path*',
        destination: `${apiUrl}/uploads/:path*`
      }
    ]
  }
};

export default nextConfig;
