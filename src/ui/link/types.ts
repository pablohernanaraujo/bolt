/* eslint-disable @typescript-eslint/no-explicit-any */
// /src/ui/link/types.ts
// Type definitions for Link component
// Provides TypeScript interfaces for accessible link component with typography integration
// RELEVANT FILES: link.tsx, shared-types.ts, index.ts

import { type ComponentPropsWithoutRef, type ElementType } from 'react';

import { type KeyEmphasis } from '@/tokens';

import { type SharedTypographyProps } from '../typography/shared-types';

/**
 * Link visual variants
 * Defines the different visual styles available for links
 */
export type LinkVariant =
  | 'primary' // Primary brand color, for main navigation and important links
  | 'secondary' // Subtle secondary color, for less prominent links
  | 'external' // Special styling for external links with icon
  | 'disabled'; // Disabled state with reduced opacity

/**
 * Typography size variants for links
 * Inherits from typography system for consistent text sizing
 */
export type LinkSize =
  | 'caption' // Small text links (12px)
  | 'body3' // Small body text links (14px)
  | 'body2' // Medium body text links (16px)
  | 'body1' // Large body text links (18px)
  | 'h5' // Small heading links (20px)
  | 'h4' // Medium heading links (24px)
  | 'h3' // Large heading links (30px)
  | 'h2' // Extra large heading links (36px)
  | 'h1'; // Largest heading links (48px)

/**
 * Underline display variants
 * Controls when and how underlines are shown
 */
export type LinkUnderline =
  | 'none' // No underline ever
  | 'hover' // Underline only on hover/focus
  | 'always'; // Always show underline

/**
 * Base props for Link component
 * Extends HTML anchor element props with polymorphic support and typography integration
 */
export interface LinkProps
  extends ComponentPropsWithoutRef<'a'>,
    SharedTypographyProps {
  /**
   * Element type to render (defaults to 'a')
   * Allows semantic flexibility while maintaining Link styling
   * Use 'button' for click handlers without navigation
   */
  as?: ElementType;

  /**
   * Additional CSS class names to apply
   * Will be merged with default Link styles
   */
  className?: string;

  /**
   * Link visual variant
   * Controls the color scheme and visual treatment
   * @default 'primary'
   */
  variant?: LinkVariant;

  /**
   * Typography size following design system scale
   * Determines font size, line height and spacing
   * @default 'body2'
   */
  size?: LinkSize;

  /**
   * Text emphasis level for visual hierarchy
   * Controls the opacity/prominence of the link text
   * @default 'high'
   */
  emphasis?: KeyEmphasis;

  /**
   * Underline display behavior
   * Controls when underlines are shown
   * @default 'hover'
   */
  underlineBehavior?: LinkUnderline;

  /**
   * Whether this is an external link
   * Automatically adds external icon and appropriate attributes
   * @default false
   */
  isExternal?: boolean;

  /**
   * Whether the link is disabled
   * Prevents interaction and applies disabled styling
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Custom icon to display alongside the link text
   * Will be positioned after the text content
   */
  icon?: any;

  /**
   * Position of the icon relative to the text
   * @default 'right'
   */
  iconPosition?: 'left' | 'right';
}
