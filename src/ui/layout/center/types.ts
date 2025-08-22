// /src/ui/layout/center/types.ts
// Type definitions for Center layout component
// Defines props interface for centering content horizontally and vertically
// RELEVANT FILES: center.tsx, helpers.ts, center.css.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

/**
 * Center component props interface
 * Polymorphic component that can render as any HTML element while centering content
 */
export interface CenterProps<T extends ElementType = 'div'> {
  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: T;

  /**
   * Child elements to center
   */
  children?: React.ReactNode;

  /**
   * Additional CSS class name to apply
   */
  className?: string;
}

/**
 * Final props type combining Center props with HTML element props
 * Enables full polymorphic behavior with proper TypeScript support
 */
export type CenterComponentProps<T extends ElementType = 'div'> =
  CenterProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof CenterProps<T>>;
