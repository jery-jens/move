/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'move.onrender.com']
  },
  env: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    cmsUrl: process.env.NEXT_PUBLIC_CMS_URL,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
