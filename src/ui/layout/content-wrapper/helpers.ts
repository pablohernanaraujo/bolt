// /src/ui/layout/content-wrapper/helpers.ts
// Helper functions for Content Wrapper component className building and utilities
// Handles CSS class composition for different variants and padding configurations
// RELEVANT FILES: content-wrapper.tsx, types.ts, content-wrapper.css.ts

import { clsx } from 'clsx';

import * as styles from './content-wrapper.css';
import { type ContentWrapperVariant, type SpaceValue } from './types';

/**
 * Props for building Content Wrapper className
 * Used internally by buildContentWrapperClassName helper
 */
interface BuildContentWrapperClassNameProps {
  /**
   * Semantic variant type
   */
  variant?: ContentWrapperVariant;

  /**
   * Horizontal padding value from space tokens
   */
  paddingX?: SpaceValue;

  /**
   * Whether to remove all padding for nesting
   */
  borderless?: boolean;

  /**
   * Additional class names to merge
   */
  className?: string;
}

/**
 * Default horizontal padding values for each variant
 * Used when paddingX is not explicitly specified
 */
const VARIANT_DEFAULT_PADDING: Record<ContentWrapperVariant, SpaceValue> = {
  screen: '6', // 24px - comfortable for full-screen content
  header: '4', // 16px - tighter for navigation areas
  body: '6', // 24px - standard for main content
  footer: '4', // 16px - compact for footer areas
};

/**
 * Determines the effective horizontal padding based on props
 * Handles borderless override and variant defaults
 *
 * @param variant - The semantic variant
 * @param paddingX - Explicit padding value (optional)
 * @param borderless - Whether to remove all padding
 * @returns The effective padding value to use
 */
export const getEffectivePadding = (
  variant: ContentWrapperVariant = 'body',
  paddingX?: SpaceValue,
  borderless: boolean = false,
): SpaceValue => {
  // Borderless always results in no padding
  if (borderless) {
    return '0';
  }

  // Use explicit paddingX if provided, otherwise use variant default
  return paddingX ?? VARIANT_DEFAULT_PADDING[variant];
};

/**
 * Builds complete className string for Content Wrapper component
 * Combines base styles with variant styles, padding variations, and custom classes
 *
 * @param props - Configuration for className building
 * @returns Complete className string for the content wrapper
 *
 * @example
 * ```tsx
 * buildContentWrapperClassName({
 *   variant: 'body',
 *   paddingX: '8',
 *   className: 'custom-class'
 * })
 * // Returns: 'base-wrapper variant-body padding-8 custom-class'
 * ```
 *
 * @example
 * ```tsx
 * buildContentWrapperClassName({
 *   variant: 'header',
 *   borderless: true
 * })
 * // Returns: 'base-wrapper variant-header padding-0'
 * ```
 */
export const buildContentWrapperClassName = ({
  variant = 'body',
  paddingX,
  borderless = false,
  className,
}: BuildContentWrapperClassNameProps): string => {
  // Determine effective padding considering borderless and defaults
  const effectivePadding = getEffectivePadding(variant, paddingX, borderless);

  return clsx(
    // Base content wrapper styles
    styles.base,

    // Variant-specific styles (semantic styling if needed)
    styles.variantStyles[variant],

    // Horizontal padding variation based on effective padding
    styles.paddingVariants[effectivePadding],

    // Custom classes passed from parent
    className,
  );
};
