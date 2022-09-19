/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off"
  }
}

module.exports = nextConfig
