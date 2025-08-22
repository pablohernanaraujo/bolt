// /src/ui/typography/subtitle/types.ts
// Type definitions for Subtitle text component
// Provides TypeScript interfaces for subtitle text component
// RELEVANT FILES: subtitle.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for Subtitle component
 * Extends HTML paragraph element props with polymorphic support and text styling modifiers
 */
export interface SubtitleProps
  extends ComponentPropsWithoutRef<'p'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'p')
   * Allows semantic flexibility while maintaining Subtitle styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default Subtitle styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
