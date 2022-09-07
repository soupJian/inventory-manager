/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      's3.us-west-2.amazonaws.com',
      'beyond-diving.s3.us-west-2.amazonaws.com'
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/inventory'
        }
      ]
    }
  }
}

module.exports = nextConfig
