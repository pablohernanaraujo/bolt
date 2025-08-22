// /src/ui/radio-group/types.ts
// Type definitions and interfaces for the RadioGroup component
// Exports RadioGroupProps interface extending React Aria RadioGroupProps
// RELEVANT FILES: radio-group.tsx, index.ts, helpers.ts

import { type RadioGroupProps as AriaRadioGroupProps } from 'react-aria-components';

/**
 * Props interface for the RadioGroup component
 * Extends React Aria RadioGroupProps with additional design system properties
 *
 * ACCESSIBILITY: You must provide either:
 * - A `label` prop for a visible label, or
 * - An `aria-label` or `aria-labelledby` prop for screen readers
 */
export interface RadioGroupProps extends AriaRadioGroupProps {
  /**
   * Visual style variant of the radio group
   * Controls the color scheme when selected
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger';

  /**
   * Size of the radio buttons
   * Controls the dimensions of the radio inputs and text size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Layout orientation of the radio group
   * Determines if radios are arranged horizontally or vertically
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Optional visible label for the radio group
   * Creates a visible label element above the radio options
   * Alternative to aria-label for visible labeling
   */
  label?: string;
}
