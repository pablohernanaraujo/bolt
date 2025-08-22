// /src/ui/password-strength-meter/index.ts
// Export all from password-strength-meter folder (barrel export)
// Main entry point for PasswordStrengthMeter component and utilities
// RELEVANT FILES: password-strength-meter.tsx, types.ts, helpers.ts

export {
  calculatePasswordStrength,
  DEFAULT_STRENGTH_LABELS,
  getStrengthColors,
} from './helpers';
export { PasswordStrengthMeter } from './password-strength-meter';
export type {
  PasswordStrength,
  PasswordStrengthInfo,
  PasswordStrengthMeterProps,
} from './types';
