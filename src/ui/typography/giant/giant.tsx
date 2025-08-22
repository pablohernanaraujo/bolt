// /src/ui/typography/giant/giant.tsx
// Main Giant heading component with polymorphic support
// Provides giant display text with consistent design system styling
// RELEVANT FILES: giant.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { giant } from './giant.css';
import { type GiantProps } from './types';

/**
 * Giant component for very large display text and hero titles
 *
 * Features:
 * - Semantic HTML h1 element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Very large font size (64px) for prominent displays
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 * - Bold weight and tight line height for impact
 * - Reduced letter spacing for better readability at large sizes
 *
 * Usage:
 * <Giant>Hero Title</Giant>
 * <Giant as="div">Styled as Giant but semantically a div</Giant>
 */
export const Giant = forwardRef<HTMLHeadingElement, GiantProps>(
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
        giant,
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

Giant.displayName = 'Giant';
