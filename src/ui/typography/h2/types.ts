// /src/ui/typography/h2/types.ts
// Type definitions for H2 heading component
// Provides TypeScript interfaces for the secondary heading component
// RELEVANT FILES: h2.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for H2 component
 * Extends HTML heading element props with polymorphic support and text styling modifiers
 */
export interface H2Props
  extends ComponentPropsWithoutRef<'h2'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'h2')
   * Allows semantic flexibility while maintaining H2 styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default H2 styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
