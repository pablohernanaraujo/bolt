// /.storybook/manager.ts
// Storybook manager configuration
// Customizes the Storybook UI and branding
// RELEVANT FILES: main.ts, preview.ts

import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';

// Check if dark mode is preferred by the user's system
const prefersDark =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

// Create custom light theme
const lightTheme = {
  ...themes.light,
  brandTitle: 'Design System',
  brandUrl: 'http://localhost:3000',
  brandTarget: '_blank',
  colorPrimary: '#FF4628', // Red Orange from design system
  colorSecondary: '#6c47ff',

  // Typography
  fontBase: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode:
    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',

  // UI - Light theme colors
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#dee2e6',
  appBorderRadius: 6,

  // Toolbar
  barTextColor: '#495057',
  barSelectedColor: '#FF4628',
  barBg: '#f8f9fa',

  // Form
  inputBg: '#ffffff',
  inputBorder: '#dee2e6',
  inputTextColor: '#212529',
  inputBorderRadius: 4,
};

// Create custom dark theme
const darkTheme = {
  ...themes.dark,
  brandTitle: 'Design System',
  brandUrl: 'http://localhost:3000',
  brandTarget: '_blank',
  colorPrimary: '#FF6B4F', // Lighter red-orange for dark mode
  colorSecondary: '#9775fa',

  // Typography
  fontBase: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontCode:
    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',

  // UI - Dark theme colors matching design system
  appBg: '#1a1b1e',
  appContentBg: '#25262b',
  appBorderColor: '#373a40',
  appBorderRadius: 6,

  // Toolbar
  barTextColor: '#c1c2c5',
  barSelectedColor: '#FF6B4F',
  barBg: '#25262b',

  // Form
  inputBg: '#2c2e33',
  inputBorder: '#373a40',
  inputTextColor: '#ffffff',
  inputBorderRadius: 4,
};

addons.setConfig({
  theme: prefersDark ? darkTheme : lightTheme,
  panelPosition: 'bottom',
  showToolbar: true,
  isFullscreen: false,
  selectedPanel: 'controls',
});
