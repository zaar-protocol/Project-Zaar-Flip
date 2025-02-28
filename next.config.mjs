import TerserPlugin from "terser-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimizer = [
        new TerserPlugin({
          terserOptions: {
            mangle: {
              reserved: ["e"],
            },
          },
        }),
      ];
    }
    return config;
  },
  images: {
    domains: ["946i3uhfwajmzkei.public.blob.vercel-storage.com"],
  },
};

export default nextConfig;
