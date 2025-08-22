export declare const buildFormFieldClassName: (className?: string) => string;
export declare const hasFormFieldError: (error?: string, isInvalid?: boolean) => boolean;
export declare const generateFormFieldIds: (baseId: string) => {
    input: string;
    label: string;
    hint: string;
    error: string;
};
export declare const buildAriaDescribedBy: (ids: ReturnType<typeof generateFormFieldIds>, hasHint: boolean, hasError: boolean) => string | undefined;
