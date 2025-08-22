// /src/ui/typography/caption/caption.tsx
// Main Caption text component with polymorphic support
// Provides caption text with consistent design system styling
// RELEVANT FILES: caption.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { caption } from './caption.css';
import { type CaptionProps } from './types';

/**
 * Caption component for photo captions, footnotes, and disclaimers
 *
 * Features:
 * - Semantic HTML span element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Very small font size (11px) for secondary content
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 * - Tertiary color for minimal visual impact
 *
 * Usage:
 * <Caption>Photo caption or footnote text</Caption>
 * <Caption as="p">Styled as Caption but semantically a paragraph</Caption>
 */
export const Caption = forwardRef<HTMLSpanElement, CaptionProps>(
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
        caption,
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

Caption.displayName = 'Caption';
