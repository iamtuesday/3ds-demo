/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: '/api-payment/:path*',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          ],
        },
      ];
    },
    rewrites: async () => [
      {
        source: '/api-payment/:path*',
        destination: 'https://api.micuentaweb.pe/api-payment/:path*',
      },
    ],
  };
  
  module.exports = nextConfig;
  