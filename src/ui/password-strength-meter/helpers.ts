/* eslint-disable complexity */
/* eslint-disable max-statements */
// /src/ui/password-strength-meter/helpers.ts
// Utility functions for password strength calculation and analysis
// Provides built-in strength algorithm and helper functions
// RELEVANT FILES: password-strength-meter.tsx, types.ts

import { type PasswordStrength, type PasswordStrengthInfo } from './types';

/**
 * Default labels for password strength levels
 */
export const DEFAULT_STRENGTH_LABELS: Record<PasswordStrength, string> = {
  weak: 'Weak',
  fair: 'Fair',
  good: 'Good',
  strong: 'Strong',
};

/**
 * Calculates password strength based on multiple criteria
 * Returns a score and categorizes into strength levels
 *
 * @param password - The password to analyze
 * @returns PasswordStrengthInfo object with strength details
 */
export const calculatePasswordStrength = (
  password: string,
): PasswordStrengthInfo => {
  if (!password || password.length === 0) {
    return {
      strength: 'weak',
      score: 0,
      percentage: 0,
      label: DEFAULT_STRENGTH_LABELS.weak,
      feedback: ['Enter a password to see strength'],
    };
  }

  let score = 0;
  const feedback: string[] = [];

  // Length check (0-25 points)
  if (password.length >= 8) {
    score += 25;
  } else {
    feedback.push('Use at least 8 characters');
  }

  if (password.length >= 12) {
    score += 10; // Bonus for longer passwords
  }

  // Character variety checks (0-60 points total)
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  if (hasLowercase) score += 10;
  else feedback.push('Add lowercase letters');

  if (hasUppercase) score += 10;
  else feedback.push('Add uppercase letters');

  if (hasNumbers) score += 15;
  else feedback.push('Add numbers');

  if (hasSymbols) score += 25;
  else feedback.push('Add symbols (!@#$%^&*)');

  // Pattern checks (0-15 points)
  // Avoid common patterns
  if (!/(.)\1{2,}/.test(password)) {
    score += 5; // No repeated characters
  } else {
    feedback.push('Avoid repeated characters');
  }

  if (!/123|abc|qwe/i.test(password)) {
    score += 5; // No sequential characters
  } else {
    feedback.push('Avoid sequential characters');
  }

  if (!/password|123456|qwerty|admin/i.test(password)) {
    score += 5; // No common words
  } else {
    feedback.push('Avoid common words');
  }

  // Cap score at 100
  score = Math.min(score, 100);

  // Determine strength level and percentage
  let strength: PasswordStrength;
  let percentage: number;

  if (score < 30) {
    strength = 'weak';
    percentage = Math.max(score, 10); // Minimum 10% for visual feedback
  } else if (score < 60) {
    strength = 'fair';
    percentage = score;
  } else if (score < 80) {
    strength = 'good';
    percentage = score;
  } else {
    strength = 'strong';
    percentage = score;
  }

  return {
    strength,
    score,
    percentage,
    label: DEFAULT_STRENGTH_LABELS[strength],
    feedback: feedback.length > 0 ? feedback : undefined,
  };
};

/**
 * Gets the color for a given strength level
 * Returns CSS color values for theming
 *
 * @param strength - The password strength level
 * @returns Object with color values for the strength level
 */
export const getStrengthColors = (
  strength: PasswordStrength,
): { bg: string; text: string } => {
  const colorMap = {
    weak: {
      bg: 'var(--colors-semantic-error)',
      text: 'var(--colors-semantic-error)',
    },
    fair: {
      bg: 'var(--colors-semantic-warning)',
      text: 'var(--colors-semantic-warning)',
    },
    good: {
      bg: 'var(--colors-semantic-info)',
      text: 'var(--colors-semantic-info)',
    },
    strong: {
      bg: 'var(--colors-semantic-success)',
      text: 'var(--colors-semantic-success)',
    },
  };

  return colorMap[strength];
};

/**
 * Builds className for the strength meter based on size and strength
 *
 * @param strength - The password strength level
 * @param size - The size of the meter
 * @param className - Additional custom className
 * @returns Combined className string
 */
export const buildStrengthMeterClassName = (
  strength: PasswordStrength,
  size: 'small' | 'medium' | 'large',
  className?: string,
): string => {
  const classes = [
    'password-strength-meter',
    `password-strength-meter--${strength}`,
    `password-strength-meter--${size}`,
  ];

  if (className) {
    classes.push(className);
  }

  return classes.join(' ');
};
