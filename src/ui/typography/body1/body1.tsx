// /src/ui/typography/body1/body1.tsx
// Main Body1 text component with polymorphic support
// Provides large body text with consistent design system styling
// RELEVANT FILES: body1.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { body1 } from './body1.css';
import { type Body1Props } from './types';

/**
 * Body1 component for large body text
 *
 * Features:
 * - Semantic HTML paragraph element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Large font size with relaxed line height for readability
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 *
 * Usage:
 * <Body1>This is prominent body text content</Body1>
 * <Body1 as="span">Styled as Body1 but semantically a span</Body1>
 */
export const Body1 = forwardRef<HTMLParagraphElement, Body1Props>(
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
        body1,
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

Body1.displayName = 'Body1';
