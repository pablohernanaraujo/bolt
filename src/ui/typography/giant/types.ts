// /src/ui/typography/giant/types.ts
// Type definitions for Giant heading component
// Provides TypeScript interfaces for giant display text component
// RELEVANT FILES: giant.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for Giant component
 * Extends HTML heading element props with polymorphic support and text styling modifiers
 */
export interface GiantProps
  extends ComponentPropsWithoutRef<'h1'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'h1')
   * Allows semantic flexibility while maintaining Giant styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default Giant styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
