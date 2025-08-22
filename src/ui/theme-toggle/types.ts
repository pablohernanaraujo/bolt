// /src/ui/theme-toggle/types.ts
// Type definitions for theme toggle component
// Defines props and configuration options for theme switching functionality
// RELEVANT FILES: theme-toggle.tsx, button/types.ts, themes/index.ts

import { type ButtonHTMLAttributes } from 'react';

import { type ThemeVariant } from '@/tokens/themes';
import { type ButtonProps } from '@/ui/button/types';

/**
 * Props for the ThemeToggle component
 * Extends button props for consistent styling and behavior
 */
export interface ThemeToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'onClick'> {
  /**
   * Initial theme value from server-side detection
   * Used to prevent hydration mismatches
   * @default 'light'
   */
  initialTheme?: ThemeVariant;

  /**
   * Whether to show text label next to the icon
   * @default true
   */
  showLabel?: boolean;

  /**
   * Button size variant
   * @default 'small'
   */
  size?: ButtonProps['size'];

  /**
   * Button visual variant
   * @default 'secondary'
   */
  variant?: ButtonProps['variant'];

  /**
   * Additional CSS classes
   */
  className?: string;
}
