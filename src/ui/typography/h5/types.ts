// /src/ui/typography/h5/types.ts
// Type definitions for H5 heading component
// Provides TypeScript interfaces for the quinary heading component
// RELEVANT FILES: h5.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for H5 component
 * Extends HTML heading element props with polymorphic support and text styling modifiers
 */
export interface H5Props
  extends ComponentPropsWithoutRef<'h5'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'h5')
   * Allows semantic flexibility while maintaining H5 styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default H5 styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
