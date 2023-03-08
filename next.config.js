/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "***",
      },
    ],
  },
};

module.exports = nextConfig;
