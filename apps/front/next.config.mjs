import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Raíz del monorepo (apps/): el server standalone queda en .next/standalone/front/server.js
  outputFileTracingRoot: path.join(__dirname, '..'),
  transpilePackages: ['@orbit/shared'],
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Se resuelve en build: en Docker pasar BACKEND_INTERNAL_URL como build arg.
        destination: `${process.env.BACKEND_INTERNAL_URL || 'http://localhost:3001'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
