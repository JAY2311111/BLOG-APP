/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['192.168.1.166'], // Add the allowed hostname here
  },
}

module.exports = nextConfig
