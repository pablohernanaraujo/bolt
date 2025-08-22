// /src/ui/password-strength-meter/types.ts
// Type definitions and interfaces for the PasswordStrengthMeter component
// Defines password strength levels and component props
// RELEVANT FILES: password-strength-meter.tsx, helpers.ts

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

/**
 * Password strength information
 */
export interface PasswordStrengthInfo {
  /**
   * Strength level of the password
   */
  strength: PasswordStrength;

  /**
   * Score from 0-100 representing password strength
   */
  score: number;

  /**
   * Percentage for visual progress bar (0-100)
   */
  percentage: number;

  /**
   * Human readable text for the strength level
   */
  label: string;

  /**
   * Optional feedback messages for improving password
   */
  feedback?: string[];
}

/**
 * Props interface for the PasswordStrengthMeter component
 */
export interface PasswordStrengthMeterProps {
  /**
   * The password value to analyze
   */
  value: string;

  /**
   * Custom strength calculation function
   * If not provided, uses built-in algorithm
   */
  calculateStrength?: (password: string) => PasswordStrengthInfo;

  /**
   * Whether to show the strength label text
   * @default true
   */
  showLabel?: boolean;

  /**
   * Whether to show feedback messages
   * @default false
   */
  showFeedback?: boolean;

  /**
   * Size of the strength meter
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Additional className for styling
   */
  className?: string;

  /**
   * Custom labels for strength levels
   */
  labels?: Partial<Record<PasswordStrength, string>>;
}
