// /src/ui/typography/body1/types.ts
// Type definitions for Body1 text component
// Provides TypeScript interfaces for large body text component
// RELEVANT FILES: body1.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for Body1 component
 * Extends HTML paragraph element props with polymorphic support and text styling modifiers
 */
export interface Body1Props
  extends ComponentPropsWithoutRef<'p'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'p')
   * Allows semantic flexibility while maintaining Body1 styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default Body1 styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
