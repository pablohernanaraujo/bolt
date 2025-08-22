// /src/ui/typography/body3/types.ts
// Type definitions for Body3 text component
// Provides TypeScript interfaces for small body text component
// RELEVANT FILES: body3.tsx, index.ts, ../../types.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../shared-types';

/**
 * Base props for Body3 component
 * Extends HTML paragraph element props with polymorphic support and text styling modifiers
 */
export interface Body3Props
  extends ComponentPropsWithoutRef<'p'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'p')
   * Allows semantic flexibility while maintaining Body3 styling
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default Body3 styles
   */
  className?: string;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity of the text content
   * @default 'high'
   */
  emphasis?: KeyEmphasis;
}
