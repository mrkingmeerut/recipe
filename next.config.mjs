/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'development',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || 'development'
  }
}

export default nextConfig;
