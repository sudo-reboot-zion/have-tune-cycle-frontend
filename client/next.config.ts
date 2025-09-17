import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost', 
        port: '8000',
        pathname: '/media/**',
      },

      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
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