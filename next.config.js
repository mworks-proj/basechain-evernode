/** @type {import('next').NextConfig} */
// biome-ignore lint/correctness/noNodejsModules: <explanation>
const path = require('node:path');

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Required for Docker builds
  images: {
    unoptimized: true, // Disable Next.js image optimization for Docker
  },
  env: {
    NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT || 'http://localhost:3000',
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      src: path.resolve(__dirname, 'src'), // Correct alias resolution
    };
    return config;
  },
};

module.exports = nextConfig;
