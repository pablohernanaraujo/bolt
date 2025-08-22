// /src/ui/typography/body3/body3.tsx
// Main Body3 text component with polymorphic support
// Provides small body text with consistent design system styling
// RELEVANT FILES: body3.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { body3 } from './body3.css';
import { type Body3Props } from './types';

/**
 * Body3 component for small body text
 *
 * Features:
 * - Semantic HTML paragraph element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Small font size for captions, labels, and secondary content
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 *
 * Usage:
 * <Body3>This is small body text for captions</Body3>
 * <Body3 as="span">Styled as Body3 but semantically a span</Body3>
 */
export const Body3 = forwardRef<HTMLParagraphElement, Body3Props>(
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
        body3,
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

Body3.displayName = 'Body3';
