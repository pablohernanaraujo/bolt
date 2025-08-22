import { type HTMLAttributes } from 'react';
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: 'solid' | 'subtle' | 'outline';
    colorScheme?: 'default' | 'brand' | 'success' | 'warning' | 'error' | 'info';
    size?: 'small' | 'medium' | 'large';
}
