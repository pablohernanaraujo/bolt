// /src/ui/checkbox/types.ts
// Type definitions and interfaces for the Checkbox component
// Exports CheckboxProps interface extending React Aria CheckboxProps
// RELEVANT FILES: checkbox.tsx, index.ts, helpers.ts

import { type CheckboxProps as AriaCheckboxProps } from 'react-aria-components';

/**
 * Props interface for the Checkbox component
 * Extends React Aria CheckboxProps with additional design system properties
 */
export interface CheckboxProps extends AriaCheckboxProps {
  /**
   * Visual style variant of the checkbox
   * Controls the color scheme when checked
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger';

  /**
   * Size of the checkbox
   * Controls the dimensions of the checkbox and text size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Position of the label relative to the checkbox
   * Determines if label appears on left or right side
   * @default 'right'
   */
  labelPosition?: 'left' | 'right';
}
