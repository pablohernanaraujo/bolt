// /src/ui/badge/helpers.ts
// Helper functions for Badge component
// Handles className composition and variant selection
// RELEVANT FILES: badge.tsx, badge.css.ts, types.ts

import { badge, sizes, variants } from './badge.css';

/**
 * Builds the complete className string for Badge component
 * Combines base styles with variant, color scheme, and size modifiers
 *
 * @param variant - Visual style variant (solid, subtle, outline)
 * @param colorScheme - Color scheme for the badge
 * @param size - Size of the badge
 * @param className - Additional custom className
 * @returns Complete className string for the badge element
 */
export const buildBadgeClassName = (
  variant: 'solid' | 'subtle' | 'outline',
  colorScheme: 'default' | 'brand' | 'success' | 'warning' | 'error' | 'info',
  size: 'small' | 'medium' | 'large',
  className?: string,
): string => {
  // Start with base badge styles
  const classes = [badge];

  // Add size styles
  classes.push(sizes[size]);

  // Add variant-specific color scheme styles
  const variantStyles = variants[variant];
  if (variantStyles && variantStyles[colorScheme]) {
    classes.push(variantStyles[colorScheme]);
  }

  // Add custom className if provided
  if (className) {
    classes.push(className);
  }

  // Join all classes with space separator
  return classes.join(' ');
};
