// /src/ui/toggle/types.ts
// Type definitions and interfaces for the Toggle component
// Exports ToggleProps interface extending React Aria SwitchProps
// RELEVANT FILES: toggle.tsx, index.ts, helpers.ts

import { type SwitchProps as AriaSwitchProps } from 'react-aria-components';

/**
 * Props interface for the Toggle component
 * Extends React Aria SwitchProps with additional design system properties
 */
export interface ToggleProps extends AriaSwitchProps {
  /**
   * Visual style variant of the toggle
   * Controls the color scheme when checked
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger';

  /**
   * Size of the toggle switch
   * Controls the dimensions of the toggle track and thumb
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Position of the label relative to the toggle
   * Determines if label appears on left or right side
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
}
