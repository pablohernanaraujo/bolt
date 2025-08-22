import { type TextAreaProps as AriaTextAreaProps } from 'react-aria-components';
export interface TextAreaProps extends AriaTextAreaProps {
    variant?: 'outline' | 'filled';
    size?: 'small' | 'medium' | 'large';
    hasError?: boolean;
    placeholder?: string;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    rows?: number;
    maxRows?: number;
    isDisabled?: boolean;
    isInvalid?: boolean;
}
