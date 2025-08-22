export declare const skeletonBase: string;
export declare const animationSpeed: Record<"normal" | "fast" | "slow", string>;
export declare const animationState: Record<"static" | "animated", string>;
export declare const borderRadiusVariants: Record<"small" | "medium" | "large" | "none" | "full", string>;
export declare const circleSizes: Record<"xs" | "sm" | "lg" | "xl" | "2xl" | "md", string>;
export declare const skeleton: import("@vanilla-extract/recipes").RuntimeFn<{
    animation: Record<"static" | "animated", string>;
    speed: Record<"normal" | "fast" | "slow", string>;
    borderRadius: Record<"small" | "medium" | "large" | "none" | "full", string>;
    preset: Record<"text" | "button" | "avatar" | "card", string>;
    loaded: {
        true: string;
        false: {};
    };
}>;
export declare const skeletonCircle: import("@vanilla-extract/recipes").RuntimeFn<{
    size: Record<"xs" | "sm" | "lg" | "xl" | "2xl" | "md", string>;
    animation: Record<"static" | "animated", string>;
    speed: Record<"normal" | "fast" | "slow", string>;
    loaded: {
        true: string;
        false: {};
    };
}>;
export declare const skeletonText: string;
export declare const skeletonTextLine: string;
//# sourceMappingURL=skeleton.css.d.ts.map