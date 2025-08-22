// /src/ui/divider/divider.tsx
// Accessible divider component for visual separation of content
// Supports horizontal/vertical orientation with multiple variants and sizes
// RELEVANT FILES: divider.css.ts, types.ts, helpers.ts

import { forwardRef, type ReactElement } from 'react';

import {
  buildDividerClassName,
  getDividerAriaOrientation,
  getDividerRole,
} from './helpers';
import { type DividerProps } from './types';

/**
 * Divider component for visual separation of content
 * Provides flexible visual separation with multiple orientations and styles
 *
 * Features:
 * - Horizontal and vertical orientations
 * - Multiple visual variants (solid, dashed, dotted)
 * - Three thickness sizes (thin, medium, thick)
 * - Configurable spacing around the divider
 * - Full accessibility support with ARIA attributes
 * - Semantic HTML with proper separator role
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      size = 'thin',
      spacing = 'medium',
      className,
      ...props
    },
    ref,
  ): ReactElement => (
    <div
      ref={ref}
      role={getDividerRole(orientation)}
      aria-orientation={getDividerAriaOrientation(orientation)}
      className={buildDividerClassName(
        orientation,
        variant,
        size,
        spacing,
        className,
      )}
      {...props}
    />
  ),
);

Divider.displayName = 'Divider';
