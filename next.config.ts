import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(wav|mp3|ogg)$/,
      type: 'asset/resource',
    });

    return config;
  },
};

export default nextConfig;
