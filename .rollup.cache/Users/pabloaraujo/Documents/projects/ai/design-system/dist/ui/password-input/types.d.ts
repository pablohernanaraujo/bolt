import { type InputProps as AriaInputProps } from 'react-aria-components';
export interface PasswordInputProps extends Omit<AriaInputProps, 'size'> {
    variant?: 'outline' | 'filled';
    size?: 'small' | 'medium' | 'large';
    hasError?: boolean;
    defaultVisible?: boolean;
    isVisible?: boolean;
    onVisibilityChange?: (isVisible: boolean) => void;
    toggleAriaLabel?: string;
}
