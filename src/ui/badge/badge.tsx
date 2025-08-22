// /src/ui/badge/badge.tsx
// Badge component for highlighting status and quick recognition
// Provides multiple variants, color schemes, and sizes
// RELEVANT FILES: badge.css.ts, types.ts, helpers.ts

import { forwardRef, type ReactElement } from 'react';

import { buildBadgeClassName } from './helpers';
import { type BadgeProps } from './types';

/**
 * Badge component for status indicators and labels
 * Used to highlight an item's status for quick recognition
 *
 * Features:
 * - Multiple visual variants (solid, subtle, outline)
 * - Six color schemes (default, brand, success, warning, error, info)
 * - Three sizes (small, medium, large)
 * - Inline display for use within text
 * - Non-selectable for better UX
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'subtle',
      colorScheme = 'default',
      size = 'medium',
      className,
      children,
      ...props
    },
    ref,
  ): ReactElement => (
    <span
      ref={ref}
      className={buildBadgeClassName(variant, colorScheme, size, className)}
      {...props}
    >
      {children}
    </span>
  ),
);

Badge.displayName = 'Badge';
