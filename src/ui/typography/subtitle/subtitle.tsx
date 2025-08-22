// /src/ui/typography/subtitle/subtitle.tsx
// Main Subtitle text component with polymorphic support
// Provides subtitle text with consistent design system styling
// RELEVANT FILES: subtitle.css.ts, types.ts, index.ts

import { forwardRef, type ReactElement } from 'react';

import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';

import { subtitle } from './subtitle.css';
import { type SubtitleProps } from './types';

/**
 * Subtitle component for secondary text and descriptions
 *
 * Features:
 * - Semantic HTML paragraph element by default
 * - Polymorphic 'as' prop for flexible element rendering
 * - Medium font size (13px) for subtitle content
 * - Consistent styling using design system tokens
 * - Full TypeScript support with proper ref forwarding
 * - Automatic margin reset for layout control
 * - Secondary color for visual hierarchy
 *
 * Usage:
 * <Subtitle>This is subtitle text</Subtitle>
 * <Subtitle as="span">Styled as Subtitle but semantically a span</Subtitle>
 */
export const Subtitle = forwardRef<HTMLParagraphElement, SubtitleProps>(
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
        subtitle,
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

Subtitle.displayName = 'Subtitle';
