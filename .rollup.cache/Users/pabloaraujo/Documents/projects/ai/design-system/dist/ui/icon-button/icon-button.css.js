import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const iconButton = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: tokens.lineHeight.normal,
    cursor: 'pointer',
    userSelect: 'none',
    transition: tokens.transition.fast,
    outline: 'none',
    aspectRatio: '1',
    selectors: {
        '&[disabled]': {
            cursor: 'not-allowed',
            opacity: 0.5,
        },
    },
});
export const sizes = styleVariants({
    small: {
        width: tokens.space[8],
        height: tokens.space[8],
        padding: tokens.space[2],
        borderRadius: tokens.radius.base,
    },
    medium: {
        width: tokens.space[10],
        height: tokens.space[10],
        padding: tokens.space[3],
        borderRadius: tokens.radius.md,
    },
    large: {
        width: tokens.space[12],
        height: tokens.space[12],
        padding: tokens.space[4],
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
