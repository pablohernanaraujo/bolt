export declare const logicalPropertyVars: {
    inlineStart: `var(--${string})`;
    inlineEnd: `var(--${string})`;
    blockStart: `var(--${string})`;
    blockEnd: `var(--${string})`;
    textAlignStart: `var(--${string})`;
    textAlignEnd: `var(--${string})`;
    borderStartStartRadius: `var(--${string})`;
    borderStartEndRadius: `var(--${string})`;
    borderEndStartRadius: `var(--${string})`;
    borderEndEndRadius: `var(--${string})`;
};
export declare const logicalSpacing: {
    marginInlineStart: (value: string) => string;
    marginInlineEnd: (value: string) => string;
    marginInline: (start: string, end?: string) => string;
    marginBlockStart: (value: string) => string;
    marginBlockEnd: (value: string) => string;
    marginBlock: (start: string, end?: string) => string;
    paddingInlineStart: (value: string) => string;
    paddingInlineEnd: (value: string) => string;
    paddingInline: (start: string, end?: string) => string;
    paddingBlockStart: (value: string) => string;
    paddingBlockEnd: (value: string) => string;
    paddingBlock: (start: string, end?: string) => string;
};
export declare const logicalBorders: {
    borderInlineStart: (value: string) => string;
    borderInlineEnd: (value: string) => string;
    borderInlineStartWidth: (value: string) => string;
    borderInlineEndWidth: (value: string) => string;
    borderInlineStartColor: (value: string) => string;
    borderInlineEndColor: (value: string) => string;
    borderBlockStart: (value: string) => string;
    borderBlockEnd: (value: string) => string;
};
export declare const logicalBorderRadius: {
    borderStartStartRadius: (value: string) => string;
    borderStartEndRadius: (value: string) => string;
    borderEndStartRadius: (value: string) => string;
    borderEndEndRadius: (value: string) => string;
};
export declare const logicalPositioning: {
    inlineStart: (value: string) => string;
    inlineEnd: (value: string) => string;
    blockStart: (value: string) => string;
    blockEnd: (value: string) => string;
    inline: (start: string, end?: string) => string;
    block: (start: string, end?: string) => string;
};
export declare const logicalTextAlign: {
    start: string;
    end: string;
    center: string;
    justify: string;
};
export declare const logicalFloat: {
    inlineStart: string;
    inlineEnd: string;
    clearInlineStart: string;
    clearInlineEnd: string;
    clearBoth: string;
};
export declare const logicalTransforms: {
    translateInlineStart: (value: string) => string;
    translateInlineEnd: (value: string) => string;
};
export declare const buildLogicalSpacingClasses: (tokenValue: string) => Record<string, any>;
export declare const applyLogicalProperties: (ltrProperties: Record<string, string>, rtlProperties?: Record<string, string>) => string;
export declare const directionalClasses: {
    ltrOnly: string;
    rtlOnly: string;
    hideInRtl: string;
    hideInLtr: string;
};
//# sourceMappingURL=logical-properties.css.d.ts.map