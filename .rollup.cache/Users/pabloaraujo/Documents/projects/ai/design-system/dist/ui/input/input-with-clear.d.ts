import { type ReactElement } from 'react';
import { type InputProps } from './types';
export interface InputWithClearProps extends Omit<InputProps, 'isClearable'> {
    onClear?: () => void;
    clearIcon?: ReactElement;
    alwaysShowClear?: boolean;
    isDisabled?: boolean;
}
export declare const InputWithClear: import("react").ForwardRefExoticComponent<InputWithClearProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=input-with-clear.d.ts.map