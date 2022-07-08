/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APOLLO_URI: process.env.APOLLO_URI,
  },
}

module.exports = nextConfig
