/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/storybook/utils/decorators.tsx
// Reusable decorators and utilities for Storybook
// Provides theme switching and common layout patterns
// RELEVANT FILES: ../../.storybook/preview.ts, story-helpers.tsx

import { type ReactElement } from 'react';
import { darkTheme, lightTheme } from '../../tokens/themes';

/**
 * Theme decorator that applies theme classes based on global theme setting
 * Wraps stories with appropriate theme class for vanilla-extract
 * Also applies the correct background color for the theme
 */
export const withTheme = (Story: any, context: any): ReactElement => {
  const theme = context.globals.theme || 'light';
  const themeClass = theme === 'dark' ? darkTheme : lightTheme;

  // Define background colors matching our design tokens
  const backgrounds = {
    light: '#ffffff',
    dark: '#1a1b1e', // From dark theme background.primary
  };

  const backgroundColor = backgrounds[theme as keyof typeof backgrounds];

  return (
    <div className={themeClass}>
      <div
        style={{
          backgroundColor,
          minHeight: '100vh',
          padding: 0,
          margin: 0,
          fontFamily:
            'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          transition: 'background-color 0.3s ease', // Smooth transition when switching themes
        }}
      >
        <Story />
      </div>
    </div>
  );
};

/**
 * Theme decorator with padding for components that need spacing
 * Use this for individual components that should have padding from canvas edges
 */
export const withThemeAndPadding = (Story: any, context: any): ReactElement => {
  const theme = context.globals.theme || 'light';
  const themeClass = theme === 'dark' ? darkTheme : lightTheme;

  // Define background colors matching our design tokens
  const backgrounds = {
    light: '#ffffff',
    dark: '#1a1b1e', // From dark theme background.primary
  };

  const backgroundColor = backgrounds[theme as keyof typeof backgrounds];

  return (
    <div className={themeClass}>
      <div
        style={{
          backgroundColor,
          minHeight: '100vh',
          padding: '2rem',
          fontFamily:
            'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          transition: 'background-color 0.3s ease', // Smooth transition when switching themes
        }}
      >
        <Story />
      </div>
    </div>
  );
};

/**
 * Centered decorator for components that need to be centered
 * Useful for buttons, icons, and other individual components
 */
export const withCentered = (Story: any): ReactElement => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
    }}
  >
    <Story />
  </div>
);

/**
 * Grid decorator for showcasing multiple variations
 * Creates a responsive grid layout for component variations
 */
export const withGrid = (Story: any): ReactElement => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
      padding: '1rem',
    }}
  >
    <Story />
  </div>
);

/**
 * Max width decorator for documentation pages
 * Constrains content width for better readability
 */
export const withMaxWidth = (Story: any): ReactElement => (
  <div
    style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
    }}
  >
    <Story />
  </div>
);
