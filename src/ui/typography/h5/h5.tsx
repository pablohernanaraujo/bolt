// /src/ui/typography/h5/h5.tsx
// Main H5 heading component with polymorphic support
// Provides semantic quinary heading with consistent design system styling
// RELEVANT FILES: h5.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { h5 } from './h5.css';
import { type H5Props } from './types';

/**
 * H5 heading component for smallest section titles
 *
 * Features:
 * - Semantic HTML h5 element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 *
 * Usage:
 * <H5>Smallest Section Title</H5>
 * <H5 as="div">Styled as H5 but semantically a div</H5>
 */
export const H5 = forwardRef<HTMLHeadingElement, H5Props>(
  (
    {
      as: Component = 'h5',
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
        h5,
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

H5.displayName = 'H5';
