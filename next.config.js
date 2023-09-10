const nextConfig = {
  experimental: {
    appDir: true,
  },
  // output: "export",
};

const withMDX = require("@next/mdx")();
module.exports = withMDX(nextConfig);
