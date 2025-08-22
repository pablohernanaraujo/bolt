// /src/ui/badge/types.ts
// Type definitions and interfaces for the Badge component
// Exports BadgeProps interface with variant, colorScheme, and size options
// RELEVANT FILES: badge.tsx, index.ts, helpers.ts

import { type HTMLAttributes } from 'react';

/**
 * Props interface for the Badge component
 * Extends HTML span attributes with design system properties
 */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual style variant of the badge
   * Controls the visual appearance (filled, subtle background, or outlined)
   * @default 'subtle'
   */
  variant?: 'solid' | 'subtle' | 'outline';

  /**
   * Color scheme of the badge
   * Determines the color palette used for the badge
   * @default 'default'
   */
  colorScheme?: 'default' | 'brand' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Size of the badge
   * Controls padding and font size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}
