import type { NextConfig } from 'next';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

// Bundle analyzer for performance monitoring
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false, // Don't auto-open browser in CI
});

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-aria-components', 'lucide-react'],
  },

  // Optimize images for better performance
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Enable gzip compression
  compress: true,

  // Exclude non-Next.js files from compilation
  pageExtensions: ['tsx', 'ts'],

  // Performance optimizations
  poweredByHeader: false,

  // Advanced webpack configuration for bundle analysis
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Enable proper tree shaking - only in production
    if (!dev) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }

    // Bundle analysis in production builds
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          // Separate vendor bundle for better caching
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // UI components bundle
          ui: {
            test: /[\\/]src[\\/]ui[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 5,
          },
          // Design tokens bundle
          tokens: {
            test: /[\\/]src[\\/]tokens[\\/]/,
            name: 'tokens',
            chunks: 'all',
            priority: 5,
          },
        },
      };
    }

    return config;
  },
};

export default withBundleAnalyzer(withVanillaExtract(nextConfig));
