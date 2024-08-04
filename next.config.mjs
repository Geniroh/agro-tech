/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Routes this applies to
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            // value: "*",
            value: "https://stavmia.org",
          },
          // Allows for specific methods accepted
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stavmia.nyc3.digitaloceanspaces.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'stavmia.nyc3.cdn.digitaloceanspaces',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '"lh3.googleusercontent.com"',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
