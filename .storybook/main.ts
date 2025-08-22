// /.storybook/main.ts
// Main Storybook configuration file
// Configures stories location, addons, and Next.js integration
// RELEVANT FILES: preview.ts, ../src/storybook/**/*.stories.*

import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../src/storybook/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    // '../src/storybook/**/*.stories.mdx', // Temporarily disabled
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  // Configure vanilla-extract integration for Storybook
  webpackFinal: async (config) => {
    const { VanillaExtractPlugin } = await import(
      '@vanilla-extract/webpack-plugin'
    );

    // Add VanillaExtractPlugin
    config.plugins?.push(new VanillaExtractPlugin());

    return config;
  },
  staticDirs: ['../public'],
  features: {
    buildStoriesJson: true,
  },
};

export default config;
