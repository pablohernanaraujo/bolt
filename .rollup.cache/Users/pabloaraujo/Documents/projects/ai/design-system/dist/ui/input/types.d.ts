import { type InputProps as AriaInputProps } from 'react-aria-components';
export interface InputProps extends Omit<AriaInputProps, 'size'> {
    variant?: 'outline' | 'filled';
    size?: 'small' | 'medium' | 'large';
    hasError?: boolean;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
}
