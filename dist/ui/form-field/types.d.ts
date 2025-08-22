import { type ReactNode } from 'react';
import { type TextFieldProps } from 'react-aria-components';
import { type InputProps } from '../input';
export interface FormFieldProps extends Omit<TextFieldProps, 'children'> {
    label: string;
    inputProps?: Omit<InputProps, 'isDisabled' | 'isInvalid'>;
    hint?: string;
    error?: string;
    required?: boolean;
    children?: ReactNode;
    className?: string;
}
