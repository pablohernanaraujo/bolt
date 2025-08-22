import { type InputHTMLAttributes } from 'react';
export interface InputServerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> {
    variant?: 'outline' | 'filled';
    size?: 'small' | 'medium' | 'large';
    hasError?: boolean;
    className?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    fieldName?: string;
}
export declare const InputServer: import("react").ForwardRefExoticComponent<InputServerProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=input-server.d.ts.map