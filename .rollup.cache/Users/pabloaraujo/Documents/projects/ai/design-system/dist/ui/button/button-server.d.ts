import { type ButtonHTMLAttributes } from 'react';
export interface ButtonServerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    className?: string;
}
export declare const ButtonServer: import("react").ForwardRefExoticComponent<ButtonServerProps & import("react").RefAttributes<HTMLButtonElement>>;
