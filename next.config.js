const nextConfig = {
  experimental: {
    appDir: true,
  },
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
