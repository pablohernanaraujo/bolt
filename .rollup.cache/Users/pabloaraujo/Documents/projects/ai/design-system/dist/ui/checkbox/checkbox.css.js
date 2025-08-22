import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const checkboxContainer = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.space[3],
    cursor: 'pointer',
    userSelect: 'none',
    selectors: {
        '&[data-disabled]': {
            cursor: 'not-allowed',
            opacity: 0.5,
        },
    },
});
export const checkboxContainerLabelLeft = style({
    flexDirection: 'row-reverse',
});
export const checkboxContainerLabelRight = style({
    flexDirection: 'row',
});
export const checkboxInput = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
    border: `2px solid ${colors.border.primary}`,
    transition: tokens.transition.fast,
    outline: 'none',
    cursor: 'pointer',
    selectors: {
        '&[data-focused]': {
            boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
        },
        '&[data-disabled]': {
            cursor: 'not-allowed',
            backgroundColor: colors.background.secondary,
        },
    },
});
export const checkboxBase = style({
    backgroundColor: colors.background.primary,
    borderColor: colors.border.primary,
    selectors: {
        '&:hover:not([data-disabled])': {
            borderColor: colors.border.secondary,
            backgroundColor: colors.background.secondary,
        },
    },
});
export const checkboxSizes = styleVariants({
    small: {
        width: '16px',
        height: '16px',
        borderRadius: tokens.radius.sm,
    },
    medium: {
        width: '20px',
        height: '20px',
        borderRadius: tokens.radius.sm,
    },
    large: {
        width: '24px',
        height: '24px',
        borderRadius: tokens.radius.md,
    },
});
export const checkboxVariants = styleVariants({
    primary: {
        backgroundColor: colors.brand.primary,
        borderColor: colors.brand.primary,
        selectors: {
            '&:hover:not([data-disabled])': {
                backgroundColor: colors.brand.primaryHover,
                borderColor: colors.brand.primaryHover,
            },
        },
    },
    secondary: {
        backgroundColor: colors.background.tertiary,
        borderColor: colors.border.secondary,
        selectors: {
            '&:hover:not([data-disabled])': {
                backgroundColor: colors.background.secondary,
            },
        },
    },
    success: {
        backgroundColor: colors.semantic.success,
        borderColor: colors.semantic.success,
        selectors: {
            '&:hover:not([data-disabled])': {
                backgroundColor: colors.semantic.success,
                opacity: 0.9,
            },
        },
    },
    danger: {
        backgroundColor: colors.semantic.error,
        borderColor: colors.semantic.error,
        selectors: {
            '&:hover:not([data-disabled])': {
                backgroundColor: colors.semantic.error,
                opacity: 0.9,
            },
        },
    },
});
export const checkboxCheckmark = style({
    color: colors.foreground.inverse,
    opacity: 0,
    transform: 'scale(0.8)',
    transition: tokens.transition.fast,
    selectors: {
        '[data-selected] &': {
            opacity: 1,
            transform: 'scale(1)',
        },
    },
});
export const checkmarkSizes = styleVariants({
    small: {
        width: '10px',
        height: '10px',
    },
    medium: {
        width: '12px',
        height: '12px',
    },
    large: {
        width: '14px',
        height: '14px',
    },
});
export const checkboxLabel = style({
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeight.normal,
    lineHeight: tokens.lineHeight.normal,
    color: colors.foreground.primary,
});
export const labelSizes = styleVariants({
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
