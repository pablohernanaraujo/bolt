import { type PasswordStrength, type PasswordStrengthInfo } from './types';
export declare const DEFAULT_STRENGTH_LABELS: Record<PasswordStrength, string>;
export declare const calculatePasswordStrength: (password: string) => PasswordStrengthInfo;
export declare const getStrengthColors: (strength: PasswordStrength) => {
    bg: string;
    text: string;
};
export declare const buildStrengthMeterClassName: (strength: PasswordStrength, size: "small" | "medium" | "large", className?: string) => string;
