/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/prayer-times-webapp" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/prayer-times-webapp/" : "",
  distDir: "out",
};

export default nextConfig;
