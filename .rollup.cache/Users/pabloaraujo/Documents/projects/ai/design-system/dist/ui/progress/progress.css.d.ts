export declare const progressBase: string;
export declare const progressTrack: string;
export declare const progressBar: string;
export declare const progressLabel: string;
export declare const progressValue: string;
export declare const trackSizes: Record<"small" | "medium" | "large", string>;
export declare const barVariants: Record<string | number, string>;
export declare const stripedOverlay: string;
export declare const animatedStripes: string;
export declare const indeterminate: string;
export declare const indeterminateTrack: string;
export declare const progress: import("@vanilla-extract/recipes").RuntimeFn<{
    variant: {
        primary: {};
        success: {};
        warning: {};
        error: {};
    };
    size: {
        small: {};
        medium: {};
        large: {};
    };
    isStriped: {
        true: {};
        false: {};
    };
    isAnimated: {
        true: {};
        false: {};
    };
    isIndeterminate: {
        true: {};
        false: {};
    };
}>;
export declare const progressWithLabel: string;
export declare const labelRow: string;
