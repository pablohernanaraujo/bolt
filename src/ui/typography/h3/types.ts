// /src/ui/typography/h3/types.ts
// Type definitions for H3 heading component
// Provides TypeScript interfaces for the tertiary heading component
// RELEVANT FILES: h3.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for H3 component
 * Extends HTML heading element props with polymorphic support and text styling modifiers
 */
export interface H3Props
  extends ComponentPropsWithoutRef<'h3'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'h3')
   * Allows semantic flexibility while maintaining H3 styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default H3 styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
