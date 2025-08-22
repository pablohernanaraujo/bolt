// /src/ui/typography/caption/types.ts
// Type definitions for Caption text component
// Provides TypeScript interfaces for caption text component
// RELEVANT FILES: caption.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for Caption component
 * Extends HTML span element props with polymorphic support and text styling modifiers
 */
export interface CaptionProps
  extends ComponentPropsWithoutRef<'span'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'span')
   * Allows semantic flexibility while maintaining Caption styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default Caption styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
