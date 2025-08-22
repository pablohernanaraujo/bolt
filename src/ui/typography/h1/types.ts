// /src/ui/typography/h1/types.ts
// Type definitions for H1 heading component
// Provides TypeScript interfaces for the main heading component
// RELEVANT FILES: h1.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for H1 component
 * Extends HTML heading element props with polymorphic support and text styling modifiers
 */
export interface H1Props
  extends ComponentPropsWithoutRef<'h1'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'h1')
   * Allows semantic flexibility while maintaining H1 styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default H1 styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
