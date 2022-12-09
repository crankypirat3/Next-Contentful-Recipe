/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net']
  },
  compiler: {
    styledComponents:true,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en"
  }
}

module.exports = nextConfig
