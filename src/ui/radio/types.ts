// /src/ui/radio/types.ts
// Type definitions and interfaces for the Radio component
// Exports RadioProps interface extending React Aria RadioProps
// RELEVANT FILES: radio.tsx, index.ts, helpers.ts

import { type RadioProps as AriaRadioProps } from 'react-aria-components';

/**
 * Props interface for the Radio component
 * Extends React Aria RadioProps with additional design system properties
 */
export interface RadioProps extends AriaRadioProps {
  /**
   * Visual style variant of the radio button
   * Inherited from the parent RadioGroup but can be overridden
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'success' | 'danger';

  /**
   * Size of the radio button
   * Inherited from the parent RadioGroup but can be overridden
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
}
