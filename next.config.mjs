import nextBuildId from 'next-build-id';
import createNextIntlPlugin from 'next-intl/plugin';
import analyzer from '@next/bundle-analyzer';
import withPlugins from 'next-compose-plugins';

const withBundleAnalyzer = analyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  generateBuildId: async () => nextBuildId(),
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default withPlugins([withNextIntl, withBundleAnalyzer], nextConfig);
