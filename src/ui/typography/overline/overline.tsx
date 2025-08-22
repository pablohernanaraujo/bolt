// /src/ui/typography/overline/overline.tsx
// Main Overline text component with polymorphic support
// Provides overline text with consistent design system styling
// RELEVANT FILES: overline.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { overline } from './overline.css';
import { type OverlineProps } from './types';

/**
 * Overline component for labels, categories, and metadata
 *
 * Features:
 * - Semantic HTML span element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Very small font size (10px) with uppercase styling
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 * - Tertiary color for minimal visual impact
 * - Increased letter spacing for readability
 *
 * Usage:
 * <Overline>Label</Overline>
 * <Overline as="div">Category Tag</Overline>
 */
export const Overline = forwardRef<HTMLSpanElement, OverlineProps>(
  (
    {
      as: Component = 'span',
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
        overline,
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

Overline.displayName = 'Overline';
