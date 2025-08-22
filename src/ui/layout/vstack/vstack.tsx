// /src/ui/layout/vstack/vstack.tsx
// Vertical stack layout component for arranging children in a column
// Provides flexible spacing, alignment, and wrapping options for vertical layouts
// RELEVANT FILES: vstack.css.ts, types.ts, helpers.ts

import { type ElementRef, forwardRef, type ReactElement } from 'react';

import { buildVStackClassName } from './helpers';
import { type VStackProps } from './types';

/**
 * VStack component for vertical layouts
 * Arranges children in a vertical column with configurable spacing and alignment
 *
 * Features:
 * - Flexible spacing using design system tokens
 * - Horizontal and vertical alignment control
 * - Optional wrapping for responsive layouts
 * - Reversible child order
 * - Polymorphic component (can render as any HTML element)
 *
 * @example
 * ```tsx
 * <VStack space="4" align="center" justify="between">
 *   <Button>First</Button>
 *   <Button>Second</Button>
 *   <Button>Third</Button>
 * </VStack>
 * ```
 *
 * @example
 * ```tsx
 * // Form layout example
 * <VStack space="6" align="stretch">
 *   <Input placeholder="Name" />
 *   <Input placeholder="Email" />
 *   <Button>Submit</Button>
 * </VStack>
 * ```
 *
 * @example
 * ```tsx
 * // Sidebar layout example
 * <VStack space="2" align="start" as="nav">
 *   <Button variant="ghost">Home</Button>
 *   <Button variant="ghost">Profile</Button>
 *   <Button variant="ghost">Settings</Button>
 * </VStack>
 * ```
 */
export const VStack = forwardRef<ElementRef<'div'>, VStackProps>(
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
    const vstackClassName = buildVStackClassName({
      space,
      align,
      justify,
      wrap,
      reversed,
      className,
    });

    // Render polymorphic component with proper typing
    return (
      <Component ref={ref} className={vstackClassName} {...props}>
        {children}
      </Component>
    );
  },
);

VStack.displayName = 'VStack';
