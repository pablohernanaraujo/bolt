export declare const tabsRoot: string;
export declare const tabsList: string;
export declare const tabsListVariants: Record<"center" | "end" | "start" | "horizontal" | "vertical" | "fitted", string>;
export declare const tabTrigger: import("@vanilla-extract/recipes").RuntimeFn<{
    [x: string]: {
        [x: string]: string | import("@vanilla-extract/css").ComplexStyleRule;
    };
}>;
export declare const tabContent: string;
export declare const tabContentVariants: Record<"horizontal" | "vertical", string>;
