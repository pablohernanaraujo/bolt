// /src/ui/layout/flex/flex.tsx
// Flexible layout component for arranging children with flexbox
// Unified component combining capabilities of HStack and VStack with full flexbox control
// RELEVANT FILES: flex.css.ts, types.ts, helpers.ts

import { type ElementRef, forwardRef, type ReactElement } from 'react';

import { buildFlexClassName } from './helpers';
import { type FlexProps } from './types';

/**
 * Flex component for flexible layouts
 * Arranges children using flexbox with complete control over direction, alignment, and spacing
 *
 * Features:
 * - Full flexbox control with direction, wrap, align, and justify
 * - Gap spacing using design system tokens
 * - Polymorphic component (can render as any HTML element)
 * - Responsive-friendly with proper wrap support
 * - Zero-runtime CSS with vanilla-extract
 *
 * Based on Chakra UI's Flex component with design system integration
 *
 * @example
 * ```tsx
 * // Basic horizontal layout (like HStack)
 * <Flex gap="4" align="center" justify="between">
 *   <Button>First</Button>
 *   <Button>Second</Button>
 *   <Button>Third</Button>
 * </Flex>
 * ```
 *
 * @example
 * ```tsx
 * // Vertical layout (like VStack)
 * <Flex direction="column" gap="3" align="stretch">
 *   <Input placeholder="Name" />
 *   <Input placeholder="Email" />
 *   <Button>Submit</Button>
 * </Flex>
 * ```
 *
 * @example
 * ```tsx
 * // Complex responsive layout
 * <Flex direction="column" wrap="wrap" gap="6" align="center">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Flex>
 * ```
 */
export const Flex = forwardRef<ElementRef<'div'>, FlexProps>(
  (
    {
      direction = 'row',
      wrap = 'nowrap',
      align = 'stretch',
      justify = 'start',
      gap = '0',
      as: Component = 'div',
      className,
      children,
      ...props
    },
    ref,
  ): ReactElement => {
    // Build complete className from props using helper function
    const flexClassName = buildFlexClassName({
      direction,
      wrap,
      align,
      justify,
      gap,
      className,
    });

    // Render polymorphic component with proper typing
    return (
      <Component ref={ref} className={flexClassName} {...props}>
        {children}
      </Component>
    );
  },
);

Flex.displayName = 'Flex';
