// /src/app/fonts.ts
// Next.js font configuration using next/font/google
// Optimized font loading for better performance and FOUT prevention
// RELEVANT FILES: layout.tsx, tokens/typography.css.ts, tokens/css-variables.css.ts

import { Roboto } from 'next/font/google';

/**
 * Roboto font configuration using next/font/google
 * Loads multiple weights for design system typography hierarchy
 *
 * Weights included:
 * - 300: Light (used for subtle text)
 * - 400: Regular (base text weight)
 * - 500: Medium (emphasis and UI labels)
 * - 700: Bold (headings and strong emphasis)
 *
 * Features:
 * - Automatic font optimization by Next.js
 * - Preload for critical font weights
 * - CSS variables for easy integration with design tokens
 * - Fallback fonts for better loading experience
 */
export const roboto = Roboto({
  // Font weights that match our design system tokens
  weight: ['300', '400', '500', '700'],

  // Font styles - normal is sufficient for our design system
  style: ['normal'],

  // Subsets for internationalization - latin covers most use cases
  subsets: ['latin'],

  // Display strategy - swap provides best balance of performance and UX
  // Shows fallback font until custom font loads, then swaps
  display: 'swap',

  // Preload critical font weights for better performance
  preload: true,

  // Fallback fonts that closely match Roboto's metrics
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],

  // Generate CSS variables for easy integration with design tokens
  // Creates --font-roboto CSS variable we can use in vanilla-extract
  variable: '--font-roboto',
});

/**
 * Font CSS class name for applying Roboto font
 * Use this in layout.tsx body element
 */
export const robotoClassName = roboto.className;

/**
 * Font CSS variable name for use in design tokens
 * Access the CSS variable in vanilla-extract styles
 */
export const robotoVariable = roboto.variable;
