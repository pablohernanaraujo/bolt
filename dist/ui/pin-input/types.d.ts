import { type ReactElement } from 'react';
export type PinInputType = 'numeric' | 'alphanumeric';
export type PinInputVariant = 'outline' | 'filled';
export type PinInputSize = 'small' | 'medium' | 'large';
export interface PinInputProps {
    length?: number;
    type?: PinInputType;
    variant?: PinInputVariant;
    size?: PinInputSize;
    hasError?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    masked?: boolean;
    maskChar?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    onFocus?: (index: number) => void;
    onBlur?: (index: number) => void;
    'aria-label'?: string;
    'aria-describedby'?: string;
    className?: string;
    children?: ReactElement | ReactElement[];
}
export interface PinInputFieldProps {
    index: number;
    className?: string;
}
export interface PinInputContextValue {
    values: string[];
    type: PinInputType;
    variant: PinInputVariant;
    size: PinInputSize;
    hasError: boolean;
    disabled: boolean;
    masked: boolean;
    maskChar: string;
    length: number;
    fieldRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    setValue: (index: number, value: string) => void;
    focusField: (index: number) => void;
    handleFocus: (index: number) => void;
    handleBlur: (index: number) => void;
}
export interface PinInputGroupProps {
    children: ReactElement | ReactElement[];
    className?: string;
}
export interface PinInputSeparatorProps {
    children?: React.ReactNode;
    className?: string;
}
