// /src/ui/typography/h1/h1.tsx
// Main H1 heading component with polymorphic support
// Provides semantic heading with consistent design system styling
// RELEVANT FILES: h1.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { h1 } from './h1.css';
import { type H1Props } from './types';

/**
 * H1 heading component for main page titles
 *
 * Features:
 * - Semantic HTML h1 element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 * - Text emphasis support for visual hierarchy
 *
 * Usage:
 * <H1>Main Page Title</H1>
 * <H1 as="div">Styled as H1 but semantically a div</H1>
 * <H1 emphasis="medium">Lower emphasis title</H1>
 */
export const H1 = forwardRef<HTMLHeadingElement, H1Props>(
  (
    {
      as: Component = 'h1',
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
        h1,
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

H1.displayName = 'H1';
