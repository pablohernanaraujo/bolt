export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';
export interface PasswordStrengthInfo {
    strength: PasswordStrength;
    score: number;
    percentage: number;
    label: string;
    feedback?: string[];
}
export interface PasswordStrengthMeterProps {
    value: string;
    calculateStrength?: (password: string) => PasswordStrengthInfo;
    showLabel?: boolean;
    showFeedback?: boolean;
    size?: 'small' | 'medium' | 'large';
    className?: string;
    labels?: Partial<Record<PasswordStrength, string>>;
}
//# sourceMappingURL=types.d.ts.map