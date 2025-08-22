// /src/ui/layout/hstack/hstack.tsx
// Horizontal stack layout component for arranging children in a row
// Provides flexible spacing, alignment, and wrapping options
// RELEVANT FILES: hstack.css.ts, types.ts, helpers.ts

import { type ElementRef, forwardRef, type ReactElement } from 'react';

import { buildHStackClassName } from './helpers';
import { type HStackProps } from './types';

/**
 * HStack component for horizontal layouts
 * Arranges children in a horizontal row with configurable spacing and alignment
 *
 * Features:
 * - Flexible spacing using design system tokens
 * - Vertical and horizontal alignment control
 * - Optional wrapping for responsive layouts
 * - Reversible child order
 * - Polymorphic component (can render as any HTML element)
 *
 * @example
 * ```tsx
 * <HStack space="4" align="center" justify="between">
 *   <Button>First</Button>
 *   <Button>Second</Button>
 *   <Button>Third</Button>
 * </HStack>
 * ```
 */
export const HStack = forwardRef<ElementRef<'div'>, HStackProps>(
  (
    {
      space = '0',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      reversed = false,
      as: Component = 'div',
      className,
      children,
      ...props
    },
    ref,
  ): ReactElement => {
    // Build complete className from props
    const hstackClassName = buildHStackClassName({
      space,
      align,
      justify,
      wrap,
      reversed,
      className,
    });

    // Render polymorphic component with proper typing
    return (
      <Component ref={ref} className={hstackClassName} {...props}>
        {children}
      </Component>
    );
  },
);

HStack.displayName = 'HStack';
