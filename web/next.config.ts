import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker image on AWS builds a self-contained server (see web/Dockerfile)
  output: process.env.NEXT_OUTPUT === 'standalone' ? 'standalone' : undefined,
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
