// /src/tokens/themes/light.css.ts
// Light theme implementation
// Provides light mode colors and shadows for the design system
// RELEVANT FILES: ../contracts.css.ts, dark.css.ts, index.ts

import { createTheme } from '@vanilla-extract/css';

import { colors, shadows } from '../contracts.css';

export const lightTheme = createTheme(
  {
    colors,
    shadows,
  },
  {
    colors: {
      background: {
        primary: '#ffffff',
        secondary: '#f8f9fa',
        tertiary: '#e9ecef',
        inverse: '#283238',
      },
      foreground: {
        primary: '#283238',
        secondary: '#495057',
        tertiary: '#6c757d',
        inverse: '#ffffff',
      },
      brand: {
        primary: '#FF4628', // Red Orange from design
        primaryHover: '#E63E22', // 10% darker for hover state
        primaryActive: '#CC361E', // 20% darker for active state
        secondary: '#6c47ff',
        secondaryHover: '#5835db',
        secondaryActive: '#4527b8',
      },
      semantic: {
        error: '#dc3545',
        errorBackground: '#f8d7da',
        warning: '#ffc107',
        warningBackground: '#fff3cd',
        success: '#28a745',
        successBackground: '#d4edda',
        info: '#17a2b8',
        infoBackground: '#d1ecf1',
      },
      border: {
        primary: '#dee2e6',
        secondary: '#e9ecef',
        focus: '#FF4628', // Updated to match new primary color
      },
      toast: {
        background: '#ffffff',
        border: '#dee2e6',
        shadow: 'rgb(0 0 0 / 0.1)',
        // Success variant
        successBackground: '#d4edda',
        successBorder: '#c3e6cb',
        successIcon: '#28a745',
        // Error variant
        errorBackground: '#f8d7da',
        errorBorder: '#f5c6cb',
        errorIcon: '#dc3545',
        // Warning variant
        warningBackground: '#fff3cd',
        warningBorder: '#ffeaa7',
        warningIcon: '#ffc107',
        // Info variant
        infoBackground: '#d1ecf1',
        infoBorder: '#bee5eb',
        infoIcon: '#17a2b8',
      },
    },
    shadows: {
      small: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      medium:
        '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      large:
        '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      focus: '0 0 0 3px rgb(255 70 40 / 0.15)', // Red Orange with 15% opacity
      toast:
        '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
    },
  },
);
