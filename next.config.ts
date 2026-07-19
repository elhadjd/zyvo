import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3', 'drizzle-orm'],
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
