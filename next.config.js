/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/one-p-daohang' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/one-p-daohang' : '',
}

module.exports = nextConfig 