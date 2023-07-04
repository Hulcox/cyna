/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/tools",
        destination: "/404",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
