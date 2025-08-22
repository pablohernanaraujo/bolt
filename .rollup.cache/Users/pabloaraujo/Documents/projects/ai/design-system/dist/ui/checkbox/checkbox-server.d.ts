import { type InputHTMLAttributes } from 'react';
export interface CheckboxServerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'small' | 'medium' | 'large';
    labelPosition?: 'left' | 'right';
    className?: string;
    children?: React.ReactNode;
}
export declare const CheckboxServer: import("react").ForwardRefExoticComponent<CheckboxServerProps & import("react").RefAttributes<HTMLLabelElement>>;
