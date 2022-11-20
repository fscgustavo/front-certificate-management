/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    allowFutureImage: true,
    browsersListForSwc: true,
    legacyBrowsers: false,
    newNextLinkBehavior: true,
  },
  images: {
    domains: ['ipfs.io'],
  },
};

module.exports = nextConfig;
