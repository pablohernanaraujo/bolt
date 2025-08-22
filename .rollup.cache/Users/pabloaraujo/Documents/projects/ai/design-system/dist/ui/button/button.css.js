import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const button = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space[2],
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: tokens.lineHeight.normal,
    cursor: 'pointer',
    userSelect: 'none',
    transition: tokens.transition.fast,
    outline: 'none',
    selectors: {
        '&[disabled]': {
            cursor: 'not-allowed',
            opacity: 0.5,
        },
    },
});
export const sizes = styleVariants({
    small: {
        paddingBlock: tokens.space[2],
        paddingInline: tokens.space[3],
        fontSize: tokens.fontSize.sm,
        borderRadius: tokens.radius.base,
    },
    medium: {
        paddingBlock: tokens.space[3],
        paddingInline: tokens.space[4],
        fontSize: tokens.fontSize.base,
        borderRadius: tokens.radius.md,
    },
    large: {
        paddingBlock: tokens.space[4],
        paddingInline: tokens.space[6],
        fontSize: tokens.fontSize.lg,
        borderRadius: tokens.radius.lg,
    },
});
export const variants = styleVariants({
    primary: {
        backgroundColor: colors.brand.primary,
        color: colors.foreground.inverse,
        border: '1px solid transparent',
        selectors: {
            '&:hover:not([disabled])': {
                backgroundColor: colors.brand.primaryHover,
            },
            '&:active:not([disabled])': {
                backgroundColor: colors.brand.primaryActive,
            },
            '&[data-focused]': {
                boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
            },
        },
    },
    secondary: {
        backgroundColor: 'transparent',
        color: colors.brand.primary,
        border: `1px solid ${colors.border.primary}`,
        selectors: {
            '&:hover:not([disabled])': {
                backgroundColor: colors.background.secondary,
            },
            '&:active:not([disabled])': {
                backgroundColor: colors.background.tertiary,
            },
            '&[data-focused]': {
                borderColor: colors.brand.primary,
                boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
            },
        },
    },
    ghost: {
        backgroundColor: 'transparent',
        color: colors.foreground.primary,
        border: '1px solid transparent',
        selectors: {
            '&:hover:not([disabled])': {
                backgroundColor: colors.background.secondary,
            },
            '&:active:not([disabled])': {
                backgroundColor: colors.background.tertiary,
            },
            '&[data-focused]': {
                boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
            },
        },
    },
    danger: {
        backgroundColor: colors.semantic.error,
        color: colors.foreground.inverse,
        border: '1px solid transparent',
        selectors: {
            '&:hover:not([disabled])': {
                backgroundColor: colors.semantic.error,
                opacity: 0.9,
            },
            '&:active:not([disabled])': {
                backgroundColor: colors.semantic.error,
                opacity: 0.8,
            },
            '&[data-focused]': {
                boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
            },
        },
    },
});
export const fullWidth = style({
    width: '100%',
});
