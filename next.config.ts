import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  serverExternalPackages: ['better-sqlite3', 'drizzle-orm'],
  reactStrictMode: true,
  outputFileTracingRoot: path.join(process.cwd()),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
