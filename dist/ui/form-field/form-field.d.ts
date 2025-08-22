import { type ReactElement } from 'react';
import { type FormFieldProps } from './types';
export declare const FormField: {
    ({ label, inputProps, hint, error, required, children, className, id, isDisabled, isInvalid, ...props }: FormFieldProps): ReactElement;
    displayName: string;
};
