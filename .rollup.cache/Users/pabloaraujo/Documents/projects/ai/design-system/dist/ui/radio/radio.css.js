import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const radioInput = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
    border: `2px solid ${colors.border.primary}`,
    borderRadius: '50%',
    transition: tokens.transition.fast,
    outline: 'none',
    cursor: 'pointer',
    flexShrink: 0,
    selectors: {
        '&[data-focused]': {
            boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
        },
        '&[data-disabled]': {
            cursor: 'not-allowed',
            backgroundColor: colors.background.secondary,
            opacity: 0.5,
        },
    },
});
export const radioBase = style({
    backgroundColor: colors.background.primary,
    borderColor: colors.border.primary,
    selectors: {
        '&:hover:not([data-disabled])': {
            borderColor: colors.border.secondary,
            backgroundColor: colors.background.secondary,
        },
    },
});
export const radioSizes = styleVariants({
    small: {
        width: '16px',
        height: '16px',
    },
    medium: {
        width: '20px',
        height: '20px',
    },
    large: {
        width: '24px',
        height: '24px',
    },
});
export const radioVariants = styleVariants({
    primary: {
        backgroundColor: colors.background.primary,
        borderColor: colors.brand.primary,
        selectors: {
            '&:hover:not([data-disabled])': {
                borderColor: colors.brand.primaryHover,
            },
            '&[data-selected]': {
                backgroundColor: colors.background.primary,
                borderColor: colors.brand.primary,
            },
            '&[data-selected]:hover:not([data-disabled])': {
                borderColor: colors.brand.primaryHover,
            },
        },
    },
    secondary: {
        backgroundColor: colors.background.primary,
        borderColor: colors.border.secondary,
        selectors: {
            '&:hover:not([data-disabled])': {
                borderColor: colors.border.primary,
            },
            '&[data-selected]': {
                backgroundColor: colors.background.primary,
                borderColor: colors.border.primary,
            },
        },
    },
    success: {
        backgroundColor: colors.background.primary,
        borderColor: colors.semantic.success,
        selectors: {
            '&:hover:not([data-disabled])': {
                borderColor: colors.semantic.success,
                opacity: 0.9,
            },
            '&[data-selected]': {
                backgroundColor: colors.background.primary,
                borderColor: colors.semantic.success,
            },
        },
    },
    danger: {
        backgroundColor: colors.background.primary,
        borderColor: colors.semantic.error,
        selectors: {
            '&:hover:not([data-disabled])': {
                borderColor: colors.semantic.error,
                opacity: 0.9,
            },
            '&[data-selected]': {
                backgroundColor: colors.background.primary,
                borderColor: colors.semantic.error,
            },
        },
    },
});
export const radioDot = style({
    borderRadius: '50%',
    opacity: 0,
    transform: 'scale(0.6)',
    transition: tokens.transition.fast,
    selectors: {
        '[data-selected] &': {
            opacity: 1,
            transform: 'scale(1)',
        },
    },
});
export const radioDotSizes = styleVariants({
    small: {
        width: '6px',
        height: '6px',
    },
    medium: {
        width: '8px',
        height: '8px',
    },
    large: {
        width: '10px',
        height: '10px',
    },
});
export const radioDotVariants = styleVariants({
    primary: {
        backgroundColor: colors.brand.primary,
    },
    secondary: {
        backgroundColor: colors.border.primary,
    },
    success: {
        backgroundColor: colors.semantic.success,
    },
    danger: {
        backgroundColor: colors.semantic.error,
    },
});
export const radioLabel = style({
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeight.normal,
    lineHeight: tokens.lineHeight.normal,
    color: colors.foreground.primary,
    cursor: 'pointer',
    userSelect: 'none',
    selectors: {
        '[data-disabled] &': {
            cursor: 'not-allowed',
            opacity: 0.5,
        },
    },
});
export const radioLabelSizes = styleVariants({
    small: {
        fontSize: tokens.fontSize.sm,
    },
    medium: {
        fontSize: tokens.fontSize.base,
    },
    large: {
        fontSize: tokens.fontSize.lg,
    },
});
