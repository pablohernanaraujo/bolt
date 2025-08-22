import { type HTMLAttributes, type ReactNode } from 'react';
export interface InputGroupBaseProps {
    size?: 'small' | 'medium' | 'large';
    variant?: 'outline' | 'filled';
}
export interface InputGroupProps extends InputGroupBaseProps, HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    isDisabled?: boolean;
    hasError?: boolean;
    className?: string;
}
export interface InputAddonProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    isDisabled?: boolean;
    className?: string;
}
export interface InputElementProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    isDisabled?: boolean;
    className?: string;
    isInteractive?: boolean;
}
export interface InputGroupContextValue {
    size: 'small' | 'medium' | 'large';
    variant: 'outline' | 'filled';
    isDisabled?: boolean;
    hasError?: boolean;
    hasLeftAddon?: boolean;
    hasRightAddon?: boolean;
    hasLeftElement?: boolean;
    hasRightElement?: boolean;
}
