// /src/ui/drawer/types.ts
// Type definitions and interfaces for the Drawer component
// Exports DrawerProps interface extending React Aria Modal and DialogTrigger props
// RELEVANT FILES: drawer.tsx, index.ts, helpers.ts

import { type ReactNode } from 'react';
import {
  type DialogProps,
  type DialogTriggerProps,
  type ModalOverlayProps,
} from 'react-aria-components';

/**
 * Placement variants for the Drawer component
 * Controls which side of the screen the drawer slides in from
 * - left: Drawer slides in from the left side
 * - right: Drawer slides in from the right side
 * - top: Drawer slides in from the top
 * - bottom: Drawer slides in from the bottom
 */
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

/**
 * Size variants for the Drawer component
 * Controls the width (left/right) or height (top/bottom) of the drawer
 * - small: 320px width/height
 * - medium: 400px width/height
 * - large: 500px width/height
 * - full: Full screen drawer covering entire viewport
 */
export type DrawerSize = 'small' | 'medium' | 'large' | 'full';

/**
 * Animation duration options for drawer animations
 * Controls how fast the drawer animates in/out
 * - fast: Quick animations (200ms entry, 150ms exit)
 * - normal: Standard animations (350ms entry, 250ms exit)
 * - slow: Slower animations (500ms entry, 350ms exit)
 */
export type DrawerAnimationSpeed = 'fast' | 'normal' | 'slow';

/**
 * Props for the Drawer component
 * Combines React Aria ModalOverlay and Dialog props with design system extensions
 */
export interface DrawerProps extends Omit<ModalOverlayProps, 'children'> {
  /**
   * Size variant of the drawer
   * Controls the width or height depending on placement
   * @default 'medium'
   */
  size?: DrawerSize;

  /**
   * Placement of the drawer relative to the viewport
   * Controls which side the drawer slides in from
   * @default 'right'
   */
  placement?: DrawerPlacement;

  /**
   * Whether the drawer can be dismissed by clicking outside or pressing Escape
   * @default true
   */
  isDismissable?: boolean;

  /**
   * Whether the Escape key is disabled for dismissing the drawer
   * @default false
   */
  isKeyboardDismissDisabled?: boolean;

  /**
   * Animation speed for drawer entry/exit animations
   * Controls how fast the drawer animates in and out
   * @default 'normal'
   */
  animationSpeed?: DrawerAnimationSpeed;

  /**
   * Whether to disable all animations
   * Useful for testing or accessibility preferences
   * @default false
   */
  disableAnimation?: boolean;

  /**
   * Content of the drawer dialog
   * Can be a render prop that receives dialog close function
   */
  children: ReactNode | ((close: () => void) => ReactNode);
}

/**
 * Props for the DrawerTrigger component
 * Wraps React Aria DialogTrigger with design system conventions
 */
export interface DrawerTriggerProps extends DialogTriggerProps {
  /**
   * Trigger element (typically a Button) and drawer content
   * Should be a clickable element that opens the drawer
   */
  children: [ReactNode, ReactNode];
}

/**
 * Props for the DrawerContent component
 * Extends React Aria Dialog props for the drawer's inner content
 */
export interface DrawerContentProps extends DialogProps {
  /**
   * Title of the drawer
   * Used for accessibility and as the dialog heading
   */
  title?: string;

  /**
   * Whether to show a close button in the drawer header
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Content of the drawer
   * Main body content of the drawer dialog
   */
  children: ReactNode;
}

/**
 * Props for drawer header section
 */
export interface DrawerHeaderProps {
  /**
   * Title text for the drawer
   */
  title?: string;

  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Additional header content
   */
  children?: ReactNode;
}

/**
 * Props for drawer body section
 */
export interface DrawerBodyProps {
  /**
   * Body content
   */
  children: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Props for drawer footer section
 */
export interface DrawerFooterProps {
  /**
   * Footer content (typically buttons)
   */
  children: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}
