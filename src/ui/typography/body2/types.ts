// /src/ui/typography/body2/types.ts
// Type definitions for Body2 text component
// Provides TypeScript interfaces for standard body text component
// RELEVANT FILES: body2.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for Body2 component
 * Extends HTML paragraph element props with polymorphic support and text styling modifiers
 */
export interface Body2Props
  extends ComponentPropsWithoutRef<'p'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'p')
   * Allows semantic flexibility while maintaining Body2 styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default Body2 styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
