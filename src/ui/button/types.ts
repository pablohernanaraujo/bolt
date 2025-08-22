// /src/ui/button/types.ts
// Type definitions and interfaces for the Button component
// Exports ButtonProps interface extending React Aria ButtonProps
// RELEVANT FILES: button.tsx, index.ts, helpers.ts

import { type ButtonProps as AriaButtonProps } from 'react-aria-components';

/**
 * Props interface for the Button component
 * Extends React Aria ButtonProps with additional design system properties
 */
export interface ButtonProps extends AriaButtonProps {
  /**
   * Visual style variant of the button
   * Controls the color scheme and appearance
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';

  /**
   * Size of the button
   * Controls padding, font size, and border radius
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Whether the button should take full width
   * Makes button expand to container width
   * @default false
   */
  fullWidth?: boolean;
}
