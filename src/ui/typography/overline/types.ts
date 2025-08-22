// /src/ui/typography/overline/types.ts
// Type definitions for Overline text component
// Provides TypeScript interfaces for overline text component
// RELEVANT FILES: overline.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for Overline component
 * Extends HTML span element props with polymorphic support and text styling modifiers
 */
export interface OverlineProps
  extends ComponentPropsWithoutRef<'span'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'span')
   * Allows semantic flexibility while maintaining Overline styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default Overline styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
