import { type ButtonHTMLAttributes } from 'react';
import { type ThemeVariant } from '@/tokens/themes';
import { type ButtonProps } from '@/ui/button/types';
export interface ThemeToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'onClick'> {
    initialTheme?: ThemeVariant;
    showLabel?: boolean;
    size?: ButtonProps['size'];
    variant?: ButtonProps['variant'];
    className?: string;
}
