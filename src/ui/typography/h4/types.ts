// /src/ui/typography/h4/types.ts
// Type definitions for H4 heading component
// Provides TypeScript interfaces for the quaternary heading component
// RELEVANT FILES: h4.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for H4 component
 * Extends HTML heading element props with polymorphic support and text styling modifiers
 */
export interface H4Props
  extends ComponentPropsWithoutRef<'h4'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'h4')
   * Allows semantic flexibility while maintaining H4 styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default H4 styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
