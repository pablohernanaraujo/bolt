// /src/ui/typography/h4/h4.tsx
// Main H4 heading component with polymorphic support
// Provides semantic quaternary heading with consistent design system styling
// RELEVANT FILES: h4.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { h4 } from './h4.css';
import { type H4Props } from './types';

/**
 * H4 heading component for minor section titles
 *
 * Features:
 * - Semantic HTML h4 element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 *
 * Usage:
 * <H4>Minor Section Title</H4>
 * <H4 as="div">Styled as H4 but semantically a div</H4>
 */
export const H4 = forwardRef<HTMLHeadingElement, H4Props>(
  (
    {
      as: Component = 'h4',
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
        h4,
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

H4.displayName = 'H4';
