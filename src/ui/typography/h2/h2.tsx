// /src/ui/typography/h2/h2.tsx
// Main H2 heading component with polymorphic support
// Provides semantic secondary heading with consistent design system styling
// RELEVANT FILES: h2.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { h2 } from './h2.css';
import { type H2Props } from './types';

/**
 * H2 heading component for section titles
 *
 * Features:
 * - Semantic HTML h2 element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 * - Text emphasis support for visual hierarchy
 *
 * Usage:
 * <H2>Section Title</H2>
 * <H2 as="div">Styled as H2 but semantically a div</H2>
 * <H2 emphasis="medium">Lower emphasis title</H2>
 */
export const H2 = forwardRef<HTMLHeadingElement, H2Props>(
  (
    {
      as: Component = 'h2',
      className,
      emphasis = 'high',
      bold = false,
      isTruncated = false,
      italic = false,
      underline = false,
      strikeThrough = false,
      highlight = false,
      ...props
    },
    ref,
  ): ReactElement => (
    <Component
      ref={ref}
      className={buildCompleteTypographyClass(
        h2,
        emphasis,
        {
          bold,
          isTruncated,
          italic,
          underline,
          strikeThrough,
          highlight,
        },
        className,
      )}
      {...props}
    />
  ),
);

H2.displayName = 'H2';
