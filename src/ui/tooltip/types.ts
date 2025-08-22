// /src/ui/tooltip/types.ts
// Type definitions and interfaces for the Tooltip component
// Exports TooltipProps interface extending React Aria Tooltip and TooltipTrigger props
// RELEVANT FILES: tooltip.tsx, index.ts, helpers.ts

import { type ReactNode } from 'react';
import { type TooltipProps as AriaTooltipProps } from 'react-aria-components';

/**
 * Placement options for the Tooltip component
 * Controls the positioning of the tooltip relative to its trigger element
 * - top: Above the trigger element
 * - bottom: Below the trigger element
 * - left: To the left of the trigger element
 * - right: To the right of the trigger element
 * - start: Left in LTR, right in RTL
 * - end: Right in LTR, left in RTL
 */
export type TooltipPlacement =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'start'
  | 'end'
  | 'top start'
  | 'top end'
  | 'bottom start'
  | 'bottom end'
  | 'left top'
  | 'left bottom'
  | 'right top'
  | 'right bottom';

/**
 * Size variants for the Tooltip component
 * Controls the padding and font size of the tooltip
 * - small: Compact tooltip for short text
 * - medium: Standard tooltip size for most use cases
 * - large: Larger tooltip for detailed information
 */
export type TooltipSize = 'small' | 'medium' | 'large';

/**
 * Variant styles for the Tooltip component
 * Controls the visual appearance and color scheme
 * - default: Standard neutral appearance
 * - inverse: High contrast inverse colors
 * - accent: Uses accent color scheme
 */
export type TooltipVariant = 'default' | 'inverse' | 'accent';

/**
 * Props for the TooltipTrigger component
 * Wraps React Aria TooltipTrigger with design system conventions
 */
export interface TooltipTriggerProps {
  /**
   * The delay time for opening the tooltip after hover starts
   * @default 700
   */
  delay?: number;

  /**
   * The delay time for closing the tooltip after hover ends
   * @default 0
   */
  closeDelay?: number;

  /**
   * Trigger element and tooltip content
   * First child should be the trigger element, second should be the Tooltip
   */
  children: [ReactNode, ReactNode];
}

/**
 * Props for the Tooltip component
 * Combines React Aria Tooltip props with design system extensions
 */
export interface TooltipProps extends Omit<AriaTooltipProps, 'children'> {
  /**
   * Content to display inside the tooltip
   * Can be simple text or complex ReactNode
   */
  children: ReactNode;

  /**
   * Placement of the tooltip relative to the trigger
   * @default 'top'
   */
  placement?: TooltipPlacement;

  /**
   * Size variant of the tooltip
   * Controls padding and font size
   * @default 'medium'
   */
  size?: TooltipSize;

  /**
   * Visual style variant of the tooltip
   * @default 'default'
   */
  variant?: TooltipVariant;

  /**
   * Distance in pixels between tooltip and trigger element
   * @default 8
   */
  offset?: number;

  /**
   * Whether to show an arrow pointing to the trigger element
   * @default false
   */
  showArrow?: boolean;

  /**
   * Maximum width of the tooltip in pixels
   * Tooltip will wrap text if content exceeds this width
   * @default 300
   */
  maxWidth?: number;

  /**
   * Additional CSS class names
   */
  className?: string;
}
