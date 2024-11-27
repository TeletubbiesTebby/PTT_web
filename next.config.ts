import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // ใช้ Static Export
  images: {
    unoptimized: true, // ปิด Image Optimization
  },
  webpack: (config) => {
    // ปิดการใช้งาน Webpack Cache
    config.cache = false;

    // จัดการ snapshot ของ Webpack
    config.snapshot = {
      managedPaths: [],
    };

    return config;
  },
};

export default nextConfig;
