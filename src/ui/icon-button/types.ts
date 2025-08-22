// /src/ui/icon-button/types.ts
// Type definitions and interfaces for the IconButton component
// Exports IconButtonProps interface extending React Aria ButtonProps
// RELEVANT FILES: icon-button.tsx, index.ts, helpers.ts

import { type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { type LucideIcon } from 'lucide-react';

import { type IconSize } from '@/icons';

/**
 * Props interface for the IconButton component
 * Extends React Aria ButtonProps with additional design system properties
 */
export interface IconButtonProps extends AriaButtonProps {
  /**
   * Visual style variant of the icon button
   * Controls the color scheme and appearance
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';

  /**
   * Size of the icon button
   * Controls padding and icon size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * The Lucide icon component to display
   * Required for accessibility and visual appearance
   */
  icon: LucideIcon;

  /**
   * Size of the icon within the button
   * Can use preset sizes or custom number
   * @default matches button size preset
   */
  iconSize?: IconSize | number;

  /**
   * Accessible label for screen readers
   * Required since icon-only buttons need descriptive labels
   */
  'aria-label': string;
}
