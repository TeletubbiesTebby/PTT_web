import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // กำหนดให้ Next.js สร้างไฟล์แบบ Static Export
  images: {
    unoptimized: true, // ปิด Image Optimization เพื่อรองรับ Static Export
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
