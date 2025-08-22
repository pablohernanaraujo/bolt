// /src/ui/layout/aspect-ratio/helpers.ts
// Utility functions and helpers for the AspectRatio component
// Handles className composition and aspect ratio calculations
// RELEVANT FILES: aspect-ratio.tsx, types.ts, aspect-ratio.css.ts

import * as styles from './aspect-ratio.css';
import {
  type AspectRatioClassNameProps,
  type CustomAspectRatio,
} from './types';

/**
 * Calculates aspect ratio value from custom width/height
 * Returns a string suitable for CSS aspect-ratio property
 *
 * @param ratio - Custom aspect ratio object with width and height
 * @returns CSS aspect-ratio value as string
 *
 * @example
 * calculateAspectRatio({ width: 16, height: 9 }) // "16 / 9"
 */
export const calculateAspectRatio = (ratio: CustomAspectRatio): string =>
  `${ratio.width} / ${ratio.height}`;

/**
 * Calculates fallback padding percentage for older browsers
 * Uses padding-bottom trick to maintain aspect ratio
 *
 * @param ratio - Custom aspect ratio object with width and height
 * @returns Padding percentage as string
 *
 * @example
 * calculateFallbackPadding({ width: 16, height: 9 }) // "56.25%"
 */
export const calculateFallbackPadding = (ratio: CustomAspectRatio): string => {
  const percentage = (ratio.height / ratio.width) * 100;
  return `${percentage}%`;
};

/**
 * Gets the aspect ratio CSS value based on preset or custom ratio
 * Handles both predefined presets and custom ratio calculations
 *
 * @param preset - Predefined aspect ratio preset
 * @param ratio - Custom aspect ratio object
 * @returns CSS aspect-ratio value as string or undefined
 *
 * @example
 * getAspectRatioValue('video') // "16 / 9"
 * getAspectRatioValue(undefined, { width: 3, height: 2 }) // "3 / 2"
 */
export const getAspectRatioValue = (
  preset?: string,
  ratio?: CustomAspectRatio,
): string | undefined => {
  // Custom ratio takes precedence over preset
  if (ratio) {
    return calculateAspectRatio(ratio);
  }

  // Map presets to their CSS values
  const presetMap: Record<string, string> = {
    square: '1 / 1',
    video: '16 / 9',
    photo: '4 / 3',
    classic: '3 / 2',
    cinema: '21 / 9',
    portrait: '3 / 4',
    golden: '1.618 / 1',
  };

  return preset ? presetMap[preset] : undefined;
};

/**
 * Builds complete className for AspectRatio component
 * Combines base styles with preset, object-fit, and custom classes
 *
 * @param props - AspectRatio className props
 * @returns Complete className string
 *
 * @example
 * buildAspectRatioClassName({ preset: 'video', objectFit: 'cover' })
 * // Returns combined className with base, preset, and object-fit styles
 */
export const buildAspectRatioClassName = ({
  preset,
  objectFit = 'cover',
  className,
}: AspectRatioClassNameProps): string => {
  const classNames = [styles.base, styles.container, styles.responsive];

  // Add preset styles if specified
  if (preset && preset in styles.presets) {
    classNames.push(styles.presets[preset as keyof typeof styles.presets]);
  }

  // Add object-fit styles
  if (objectFit && objectFit in styles.objectFit) {
    classNames.push(
      styles.objectFit[objectFit as keyof typeof styles.objectFit],
    );
  }

  // Add custom className if provided
  if (className) {
    classNames.push(className);
  }

  return classNames.join(' ');
};

/**
 * Creates CSS custom properties for dynamic aspect ratio
 * Returns style object with CSS custom properties for aspect ratio and fallback
 *
 * @param preset - Predefined aspect ratio preset
 * @param ratio - Custom aspect ratio object
 * @returns Style object with CSS custom properties
 *
 * @example
 * createAspectRatioStyles('video')
 * // Returns { '--aspect-ratio': '16 / 9', '--fallback-padding': '56.25%' }
 */
export const createAspectRatioStyles = (
  preset?: string,
  ratio?: CustomAspectRatio,
): Record<string, string> => {
  const aspectRatioValue = getAspectRatioValue(preset, ratio);

  if (!aspectRatioValue) {
    return {};
  }

  // Calculate fallback padding for custom ratios
  let fallbackPadding = '100%'; // Default to square

  if (ratio) {
    fallbackPadding = calculateFallbackPadding(ratio);
  } else if (preset) {
    // Map presets to their fallback padding values
    const fallbackMap: Record<string, string> = {
      square: '100%', // 1:1
      video: '56.25%', // 16:9
      photo: '75%', // 4:3
      classic: '66.67%', // 3:2
      cinema: '42.86%', // 21:9
      portrait: '133.33%', // 3:4
      golden: '61.8%', // 1.618:1
    };
    fallbackPadding = fallbackMap[preset] || '100%';
  }

  return {
    '--aspect-ratio': aspectRatioValue,
    '--fallback-padding': fallbackPadding,
  } as Record<string, string>;
};
