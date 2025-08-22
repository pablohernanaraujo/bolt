// /src/ui/spinner/types.ts
// Type definitions for Spinner component
// Defines all props and variants for the loading spinner
// RELEVANT FILES: spinner.tsx, helpers.ts, spinner.css.ts

/**
 * Size options for the Spinner component
 * Affects the overall dimensions of the spinner
 */
export type SpinnerSize = 'small' | 'medium' | 'large';

/**
 * Color scheme options for the Spinner component
 * Determines the visual appearance and color of the spinner
 */
export type SpinnerColorScheme =
  | 'default'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Props for the Spinner component
 */
export interface SpinnerProps {
  /**
   * Size of the spinner
   * @default 'medium'
   */
  size?: SpinnerSize;

  /**
   * Color scheme of the spinner
   * @default 'brand'
   */
  colorScheme?: SpinnerColorScheme;

  /**
   * Whether to show the background track
   * @default true
   */
  showTrack?: boolean;

  /**
   * Accessible label for screen readers
   * @default 'Loading'
   */
  label?: string;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Inline styles
   */
  style?: React.CSSProperties;
}
