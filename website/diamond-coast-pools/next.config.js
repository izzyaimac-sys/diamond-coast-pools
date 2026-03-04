/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'static.wixstatic.com'],
  },
}

module.exports = nextConfig