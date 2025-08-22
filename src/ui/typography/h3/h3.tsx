// /src/ui/typography/h3/h3.tsx
// Main H3 heading component with polymorphic support
// Provides semantic tertiary heading with consistent design system styling
// RELEVANT FILES: h3.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { h3 } from './h3.css';
import { type H3Props } from './types';

/**
 * H3 heading component for subsection titles
 *
 * Features:
 * - Semantic HTML h3 element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 *
 * Usage:
 * <H3>Subsection Title</H3>
 * <H3 as="div">Styled as H3 but semantically a div</H3>
 */
export const H3 = forwardRef<HTMLHeadingElement, H3Props>(
  (
    {
      as: Component = 'h3',
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
        h3,
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

H3.displayName = 'H3';
