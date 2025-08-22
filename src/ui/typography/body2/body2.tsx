// /src/ui/typography/body2/body2.tsx
// Main Body2 text component with polymorphic support
// Provides standard body text with consistent design system styling
// RELEVANT FILES: body2.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { body2 } from './body2.css';
import { type Body2Props } from './types';

/**
 * Body2 component for standard body text
 *
 * Features:
 * - Semantic HTML paragraph element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Standard font size with normal line height for optimal readability
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 *
 * Usage:
 * <Body2>This is standard body text content</Body2>
 * <Body2 as="span">Styled as Body2 but semantically a span</Body2>
 */
export const Body2 = forwardRef<HTMLParagraphElement, Body2Props>(
  (
    {
      as: Component = 'p',
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
        body2,
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

Body2.displayName = 'Body2';
