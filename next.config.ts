import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // ปิดการใช้งาน Webpack Cache
    config.cache = false;

    // หรือจัดการ snapshot ของ Webpack
    config.snapshot = {
      managedPaths: [],
    };

    return config;
  },
};

export default nextConfig;

