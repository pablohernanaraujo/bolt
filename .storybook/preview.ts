// /.storybook/preview.ts
// Global preview configuration for Storybook
// Sets up themes, decorators, and global parameters
// RELEVANT FILES: main.ts, ../src/storybook/utils/decorators.tsx

import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/tokens/reset.css.ts';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true, // Enable table of contents
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1b1e',
        },
      ],
    },
    // Configure a11y addon
    a11y: {
      element: '#storybook-root',
      config: {},
      options: {},
      manual: true,
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Locale for internationalization',
      defaultValue: 'en-US',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en-US', title: 'English (US)', flag: '🇺🇸' },
          { value: 'en-GB', title: 'English (UK)', flag: '🇬🇧' },
          { value: 'ar-SA', title: 'العربية (السعودية)', flag: '🇸🇦' },
          { value: 'he-IL', title: 'עברית (ישראל)', flag: '🇮🇱' },
          { value: 'fa-IR', title: 'فارسی (ایران)', flag: '🇮🇷' },
          { value: 'fr-FR', title: 'Français (France)', flag: '🇫🇷' },
          { value: 'de-DE', title: 'Deutsch (Deutschland)', flag: '🇩🇪' },
          { value: 'es-ES', title: 'Español (España)', flag: '🇪🇸' },
          { value: 'ja-JP', title: '日本語 (日本)', flag: '🇯🇵' },
          { value: 'ko-KR', title: '한국어 (대한민국)', flag: '🇰🇷' },
          { value: 'zh-CN', title: '中文 (中国)', flag: '🇨🇳' },
        ],
        dynamicTitle: true,
      },
    },
    direction: {
      description: 'Text direction for RTL testing',
      defaultValue: 'ltr',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: [
          { value: 'ltr', title: 'Left to Right (LTR)', icon: 'arrowleft' },
          { value: 'rtl', title: 'Right to Left (RTL)', icon: 'arrowright' },
        ],
        dynamicTitle: true,
      },
    },
    accessibilityMode: {
      description: 'Accessibility simulation mode',
      defaultValue: 'normal',
      toolbar: {
        title: 'A11y Mode',
        icon: 'accessibility',
        items: [
          { value: 'normal', title: 'Normal', icon: 'eye' },
          { value: 'screenreader', title: 'Screen Reader', icon: 'speaker' },
          { value: 'keyboard', title: 'Keyboard Only', icon: 'keyboard' },
          { value: 'high-contrast', title: 'High Contrast', icon: 'contrast' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      const locale = context.globals.locale || 'en-US';
      const direction = context.globals.direction || 
        (locale.startsWith('ar') || locale.startsWith('he') || locale.startsWith('fa') ? 'rtl' : 'ltr');
      const accessibilityMode = context.globals.accessibilityMode || 'normal';

      // Apply theme and locale to document root
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('lang', locale);
        document.documentElement.setAttribute('dir', direction);
        document.documentElement.setAttribute('data-accessibility-mode', accessibilityMode);

        // Apply accessibility mode styles
        if (accessibilityMode === 'high-contrast') {
          document.documentElement.style.filter = 'contrast(150%)';
        } else if (accessibilityMode === 'screenreader') {
          // Simulate focus indicators for screen reader testing
          document.documentElement.style.setProperty('--focus-ring-width', '3px');
        } else {
          document.documentElement.style.filter = '';
          document.documentElement.style.removeProperty('--focus-ring-width');
        }

        // Define background colors matching our design tokens
        const backgrounds = {
          light: '#ffffff',
          dark: '#1a1b1e',
        };

        const backgroundColor = backgrounds[theme as keyof typeof backgrounds];

        // Apply background color to the document body to eliminate white borders
        document.body.style.backgroundColor = backgroundColor;
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.transition = 'background-color 0.3s ease';

        // Also apply to documentElement for complete coverage
        document.documentElement.style.backgroundColor = backgroundColor;
        document.documentElement.style.margin = '0';
        document.documentElement.style.padding = '0';
      }

      // Sync background with theme
      const backgrounds = {
        light: '#ffffff',
        dark: '#1a1b1e',
      };

      // Update Storybook's background parameter to match the theme
      context.parameters.backgrounds = {
        ...context.parameters.backgrounds,
        default: theme,
      };

      const backgroundColor = backgrounds[theme as keyof typeof backgrounds];

      // Create container with locale and accessibility context
      return React.createElement(
        'div',
        {
          style: {
            backgroundColor,
            minHeight: '100vh',
            width: '100%',
            transition: 'background-color 0.3s ease',
            margin: 0,
            padding: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          'data-locale': locale,
          'data-direction': direction,
          'data-accessibility-mode': accessibilityMode,
          'data-theme': theme,
          lang: locale,
          dir: direction,
        },
        React.createElement(Story),
      );
    },
  ],
};

export default preview;
