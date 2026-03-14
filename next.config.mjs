/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静态导出配置
  output: 'export',
  distDir: 'dist',

  // 图片优化配置（静态导出需要禁用）
  images: {
    unoptimized: true,
  },

  // 严格模式
  reactStrictMode: true,

  // 压缩
  compress: true,

  // 实验性功能
  experimental: {
    // 优化包体积
    optimizePackageImports: ['react', 'react-dom'],
  },
};

export default nextConfig;
