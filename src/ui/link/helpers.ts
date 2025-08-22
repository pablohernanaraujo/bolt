/* eslint-disable max-params */
// /src/ui/link/helpers.ts
// Helper functions for Link component className building and utilities
// Provides utility functions for combining styles and handling link-specific logic
// RELEVANT FILES: link.css.ts, types.ts, link.tsx

import { type KeyEmphasis } from '@/tokens';
import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import * as styles from './link.css';
import { type LinkSize, type LinkUnderline, type LinkVariant } from './types';

/**
 * Builds the complete className for a Link component
 * Combines base styles, variants, size, emphasis and custom classes
 *
 * @param variant - Visual variant of the link
 * @param size - Typography size of the link
 * @param underlineBehavior - Underline display behavior
 * @param isDisabled - Whether the link is disabled
 * @param emphasis - Text emphasis level
 * @param typographyProps - Typography modifier props (bold, italic, etc.)
 * @param customClassName - Additional custom class names
 * @returns Combined className string
 */
export const buildLinkClassName = (
  variant: LinkVariant = 'primary',
  size: LinkSize = 'body2',
  underlineBehavior: LinkUnderline = 'hover',
  isDisabled: boolean = false,
  emphasis: KeyEmphasis = 'high',
  typographyProps: {
    bold?: boolean;
    isTruncated?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikeThrough?: boolean;
    highlight?: boolean;
  } = {},
  customClassName?: string,
): string => {
  // Use disabled variant if link is disabled
  const effectiveVariant = isDisabled ? 'disabled' : variant;

  // Build the complete typography class with all modifiers
  const typographyClass = buildCompleteTypographyClass(
    styles.sizeVariants[size],
    emphasis,
    typographyProps,
  );

  // Combine all class names
  const classNames = [
    styles.linkBase,
    styles.linkVariants[effectiveVariant],
    styles.underlineVariants[underlineBehavior],
    typographyClass,
    customClassName,
  ].filter(Boolean);

  return classNames.join(' ');
};

/**
 * Builds className for link icons
 * Handles both regular icons and external link indicators
 *
 * @param isExternal - Whether this is an external link icon
 * @param customClassName - Additional custom class names
 * @returns Combined className string for the icon
 */
export const buildIconClassName = (
  isExternal: boolean = false,
  customClassName?: string,
): string => {
  const classNames = [
    styles.linkIcon,
    isExternal && styles.externalIcon,
    customClassName,
  ].filter(Boolean);

  return classNames.join(' ');
};

/**
 * Determines if a URL is external
 * Checks if the URL points to an external domain
 *
 * @param href - The URL to check
 * @returns True if the URL is external, false otherwise
 */
export const isExternalUrl = (href?: string): boolean => {
  if (!href) return false;

  // Check for common external URL patterns
  return (
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.includes('://') // Covers other protocols like mailto:, tel:, etc.
  );
};

/**
 * Gets appropriate attributes for external links
 * Returns security and accessibility attributes for external links
 *
 * @param isExternal - Whether this is an external link
 * @returns Object with appropriate attributes
 */
export const getExternalLinkAttributes = (
  isExternal: boolean,
): { target: string; rel: string } => {
  if (!isExternal) {
    return {
      target: '_self',
      rel: 'noopener noreferrer',
    };
  }

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  };
};

/**
 * Sanitizes href attribute
 * Ensures the href is safe and properly formatted
 *
 * @param href - The href to sanitize
 * @returns Sanitized href or undefined if invalid
 */
export const sanitizeHref = (href?: string): string | undefined => {
  if (!href) return undefined;

  // Allow relative paths, absolute paths, and valid protocols
  const validProtocols = ['http:', 'https:', 'mailto:', 'tel:', 'sms:'];

  // If it starts with a protocol, validate it
  if (href.includes('://')) {
    const protocol = href.split('://')[0] + ':';
    if (!validProtocols.includes(protocol)) {
      console.warn(`Invalid protocol in href: ${href}`);
      return undefined;
    }
  }

  // Block dangerous protocols
  if (
    href.toLowerCase().startsWith('javascript:') ||
    href.toLowerCase().startsWith('data:') ||
    href.toLowerCase().startsWith('vbscript:')
  ) {
    console.warn(`Blocked potentially dangerous href: ${href}`);
    return undefined;
  }

  return href;
};

/**
 * Builds the container className with icon positioning
 * Handles the flex direction based on icon position
 *
 * @param iconPosition - Position of the icon (left or right)
 * @param customClassName - Additional custom class names
 * @returns Combined className string for the container
 */
export const buildContainerClassName = (
  iconPosition: 'left' | 'right' = 'right',
  customClassName?: string,
): string => {
  const classNames = [
    styles.iconPositionVariants[iconPosition],
    customClassName,
  ].filter(Boolean);

  return classNames.join(' ');
};
