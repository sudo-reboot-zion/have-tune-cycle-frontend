import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Only Cloudinary needed now - remove local media patterns
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      }
    ]
  },
};

export default nextConfig;
