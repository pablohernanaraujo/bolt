import { createVar, style } from '@vanilla-extract/css';
export const logicalPropertyVars = {
    inlineStart: createVar('inline-start'),
    inlineEnd: createVar('inline-end'),
    blockStart: createVar('block-start'),
    blockEnd: createVar('block-end'),
    textAlignStart: createVar('text-align-start'),
    textAlignEnd: createVar('text-align-end'),
    borderStartStartRadius: createVar('border-start-start-radius'),
    borderStartEndRadius: createVar('border-start-end-radius'),
    borderEndStartRadius: createVar('border-end-start-radius'),
    borderEndEndRadius: createVar('border-end-end-radius'),
};
export const logicalSpacing = {
    marginInlineStart: (value) => style({
        marginInlineStart: value,
    }),
    marginInlineEnd: (value) => style({
        marginInlineEnd: value,
    }),
    marginInline: (start, end) => style({
        marginInline: end ? `${start} ${end}` : start,
    }),
    marginBlockStart: (value) => style({
        marginBlockStart: value,
    }),
    marginBlockEnd: (value) => style({
        marginBlockEnd: value,
    }),
    marginBlock: (start, end) => style({
        marginBlock: end ? `${start} ${end}` : start,
    }),
    paddingInlineStart: (value) => style({
        paddingInlineStart: value,
    }),
    paddingInlineEnd: (value) => style({
        paddingInlineEnd: value,
    }),
    paddingInline: (start, end) => style({
        paddingInline: end ? `${start} ${end}` : start,
    }),
    paddingBlockStart: (value) => style({
        paddingBlockStart: value,
    }),
    paddingBlockEnd: (value) => style({
        paddingBlockEnd: value,
    }),
    paddingBlock: (start, end) => style({
        paddingBlock: end ? `${start} ${end}` : start,
    }),
};
export const logicalBorders = {
    borderInlineStart: (value) => style({
        borderInlineStart: value,
    }),
    borderInlineEnd: (value) => style({
        borderInlineEnd: value,
    }),
    borderInlineStartWidth: (value) => style({
        borderInlineStartWidth: value,
    }),
    borderInlineEndWidth: (value) => style({
        borderInlineEndWidth: value,
    }),
    borderInlineStartColor: (value) => style({
        borderInlineStartColor: value,
    }),
    borderInlineEndColor: (value) => style({
        borderInlineEndColor: value,
    }),
    borderBlockStart: (value) => style({
        borderBlockStart: value,
    }),
    borderBlockEnd: (value) => style({
        borderBlockEnd: value,
    }),
};
export const logicalBorderRadius = {
    borderStartStartRadius: (value) => style({
        borderStartStartRadius: value,
    }),
    borderStartEndRadius: (value) => style({
        borderStartEndRadius: value,
    }),
    borderEndStartRadius: (value) => style({
        borderEndStartRadius: value,
    }),
    borderEndEndRadius: (value) => style({
        borderEndEndRadius: value,
    }),
};
export const logicalPositioning = {
    inlineStart: (value) => style({
        insetInlineStart: value,
    }),
    inlineEnd: (value) => style({
        insetInlineEnd: value,
    }),
    blockStart: (value) => style({
        insetBlockStart: value,
    }),
    blockEnd: (value) => style({
        insetBlockEnd: value,
    }),
    inline: (start, end) => style({
        insetInline: end ? `${start} ${end}` : start,
    }),
    block: (start, end) => style({
        insetBlock: end ? `${start} ${end}` : start,
    }),
};
export const logicalTextAlign = {
    start: style({
        textAlign: 'start',
    }),
    end: style({
        textAlign: 'end',
    }),
    center: style({
        textAlign: 'center',
    }),
    justify: style({
        textAlign: 'justify',
    }),
};
export const logicalFloat = {
    inlineStart: style({
        float: 'inline-start',
    }),
    inlineEnd: style({
        float: 'inline-end',
    }),
    clearInlineStart: style({
        clear: 'inline-start',
    }),
    clearInlineEnd: style({
        clear: 'inline-end',
    }),
    clearBoth: style({
        clear: 'both',
    }),
};
export const logicalTransforms = {
    translateInlineStart: (value) => style({
        transform: `translateX(${value})`,
        '@media': {
            '(dir: rtl)': {
                transform: `translateX(-${value})`,
            },
        },
    }),
    translateInlineEnd: (value) => style({
        transform: `translateX(-${value})`,
        '@media': {
            '(dir: rtl)': {
                transform: `translateX(${value})`,
            },
        },
    }),
};
export const buildLogicalSpacingClasses = (tokenValue) => ({
    marginInlineStart: logicalSpacing.marginInlineStart(tokenValue),
    marginInlineEnd: logicalSpacing.marginInlineEnd(tokenValue),
    marginInline: logicalSpacing.marginInline(tokenValue),
    marginBlockStart: logicalSpacing.marginBlockStart(tokenValue),
    marginBlockEnd: logicalSpacing.marginBlockEnd(tokenValue),
    marginBlock: logicalSpacing.marginBlock(tokenValue),
    paddingInlineStart: logicalSpacing.paddingInlineStart(tokenValue),
    paddingInlineEnd: logicalSpacing.paddingInlineEnd(tokenValue),
    paddingInline: logicalSpacing.paddingInline(tokenValue),
    paddingBlockStart: logicalSpacing.paddingBlockStart(tokenValue),
    paddingBlockEnd: logicalSpacing.paddingBlockEnd(tokenValue),
    paddingBlock: logicalSpacing.paddingBlock(tokenValue),
});
export const applyLogicalProperties = (ltrProperties, rtlProperties) => {
    if (!rtlProperties) {
        return style(ltrProperties);
    }
    return style({
        ...ltrProperties,
        '@media': {
            '(dir: rtl)': rtlProperties,
        },
    });
};
export const directionalClasses = {
    ltrOnly: style({
        '@media': {
            '(dir: rtl)': {
                display: 'none',
            },
        },
    }),
    rtlOnly: style({
        display: 'none',
        '@media': {
            '(dir: rtl)': {
                display: 'initial',
            },
        },
    }),
    hideInRtl: style({
        '@media': {
            '(dir: rtl)': {
                display: 'none',
            },
        },
    }),
    hideInLtr: style({
        display: 'none',
        '@media': {
            '(dir: rtl)': {
                display: 'initial',
            },
        },
    }),
};
