// /src/ui/layout/aspect-ratio/aspect-ratio.css.ts
// Styling for AspectRatio component using vanilla-extract and design tokens
// Provides aspect ratio container with predefined presets and custom ratios
// RELEVANT FILES: aspect-ratio.tsx, types.ts, helpers.ts

import { globalStyle, style, styleVariants } from '@vanilla-extract/css';

/**
 * Base aspect ratio container styles
 * Creates a container that maintains aspect ratio and positions content
 */
export const base = style({
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
});

/**
 * Aspect ratio container using CSS aspect-ratio property
 * Modern approach with fallback for older browsers via padding trick
 */
export const container = style({
  position: 'relative',
  width: '100%',
  aspectRatio: 'var(--aspect-ratio)', // Set dynamically via CSS custom property
});

/**
 * Content wrapper for child elements
 * Ensures content fills the aspect ratio container properly
 */
export const content = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/**
 * Predefined aspect ratio presets
 * Common ratios used for different types of content
 */
export const presets = styleVariants({
  square: {
    aspectRatio: '1 / 1', // 1:1 - Perfect square
  },
  video: {
    aspectRatio: '16 / 9', // 16:9 - Standard video
  },
  photo: {
    aspectRatio: '4 / 3', // 4:3 - Traditional photo
  },
  classic: {
    aspectRatio: '3 / 2', // 3:2 - Classic photo
  },
  cinema: {
    aspectRatio: '21 / 9', // 21:9 - Ultra-wide cinema
  },
  portrait: {
    aspectRatio: '3 / 4', // 3:4 - Portrait orientation
  },
  golden: {
    aspectRatio: '1.618 / 1', // 1.618:1 - Golden ratio
  },
});

/**
 * Object fit variants for content display
 * Controls how child content fits within the aspect ratio container
 */
export const objectFitFill = style({});
export const objectFitContain = style({});
export const objectFitCover = style({});
export const objectFitNone = style({});
export const objectFitScaleDown = style({});

// Global styles for object-fit variants using child selectors
globalStyle(`${objectFitFill} > *`, {
  width: '100%',
  height: '100%',
  objectFit: 'fill',
});

globalStyle(`${objectFitContain} > *`, {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

globalStyle(`${objectFitCover} > *`, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

globalStyle(`${objectFitNone} > *`, {
  objectFit: 'none',
});

globalStyle(`${objectFitScaleDown} > *`, {
  width: '100%',
  height: '100%',
  objectFit: 'scale-down',
});

/**
 * Object fit mapping for helper functions
 */
export const objectFit = {
  fill: objectFitFill,
  contain: objectFitContain,
  cover: objectFitCover,
  none: objectFitNone,
  'scale-down': objectFitScaleDown,
};

/**
 * Fallback styles for older browsers without aspect-ratio support
 * Uses padding-bottom trick to maintain aspect ratio
 */
export const fallback = style({
  '@supports': {
    'not (aspect-ratio: 1)': {
      paddingBottom: 'var(--fallback-padding)', // Set dynamically via CSS custom property
      height: '0',
    },
  },
});

/**
 * Responsive behavior for smaller screens
 * Ensures aspect ratio container works well on mobile devices
 */
export const responsive = style({
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
});
