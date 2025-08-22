import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const pinInputContainer = style({
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space[2],
});
export const pinInputGroup = style({
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space[2],
});
export const pinInputSeparator = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.foreground.secondary,
    fontSize: tokens.fontSize.lg,
    fontWeight: tokens.fontWeight.medium,
    userSelect: 'none',
    margin: `0 ${tokens.space[1]}`,
});
export const pinInputFieldBase = style({
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: '1',
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: tokens.lineHeight.tight,
    textAlign: 'center',
    color: colors.foreground.primary,
    cursor: 'text',
    transition: tokens.transition.fast,
    selectors: {
        '&:focus-visible': {
            outline: `2px solid ${colors.brand.primary}`,
            outlineOffset: '2px',
        },
        '&[data-disabled]': {
            cursor: 'not-allowed',
            color: colors.foreground.tertiary,
        },
        '&::selection': {
            backgroundColor: colors.brand.primary,
            color: colors.background.primary,
        },
    },
});
export const pinInputFieldVariants = styleVariants({
    outline: {
        backgroundColor: colors.background.primary,
        border: `1px solid ${colors.border.primary}`,
        selectors: {
            '&:hover:not([data-disabled])': {
                borderColor: colors.border.secondary,
            },
            '&:focus': {
                borderColor: colors.brand.primary,
                boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
            },
            '&[data-disabled]': {
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.secondary,
            },
            '&[data-error]': {
                borderColor: colors.semantic.error,
            },
            '&[data-error]:focus': {
                borderColor: colors.semantic.error,
                boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
            },
        },
    },
    filled: {
        backgroundColor: colors.background.secondary,
        border: `1px solid transparent`,
        selectors: {
            '&:hover:not([data-disabled])': {
                backgroundColor: colors.background.tertiary,
            },
            '&:focus': {
                backgroundColor: colors.background.primary,
                borderColor: colors.brand.primary,
                boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
            },
            '&[data-disabled]': {
                backgroundColor: colors.background.secondary,
                opacity: 0.5,
            },
            '&[data-error]': {
                borderColor: colors.semantic.error,
                backgroundColor: colors.background.primary,
            },
            '&[data-error]:focus': {
                borderColor: colors.semantic.error,
                boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
            },
        },
    },
});
export const pinInputFieldSizes = styleVariants({
    small: {
        width: tokens.space[8],
        height: tokens.space[8],
        fontSize: tokens.fontSize.sm,
        borderRadius: tokens.radius.base,
    },
    medium: {
        width: tokens.space[12],
        height: tokens.space[12],
        fontSize: tokens.fontSize.lg,
        borderRadius: tokens.radius.md,
    },
    large: {
        width: tokens.space[16],
        height: tokens.space[16],
        fontSize: tokens.fontSize.xl,
        borderRadius: tokens.radius.lg,
    },
});
export const pinInputFieldRecipe = recipe({
    base: [pinInputFieldBase],
    variants: {
        variant: pinInputFieldVariants,
        size: pinInputFieldSizes,
    },
    defaultVariants: {
        variant: 'outline',
        size: 'medium',
    },
});
export const hiddenInput = style({
    position: 'absolute',
    left: '-9999px',
    width: '1px',
    height: '1px',
    opacity: 0,
    overflow: 'hidden',
});
export const containerGapVariants = styleVariants({
    small: {
        gap: tokens.space[1],
    },
    medium: {
        gap: tokens.space[2],
    },
    large: {
        gap: tokens.space[3],
    },
});
export const pinInputContainerRecipe = recipe({
    base: [pinInputContainer],
    variants: {
        size: containerGapVariants,
    },
    defaultVariants: {
        size: 'medium',
    },
});
export const pinInputGroupRecipe = recipe({
    base: [pinInputGroup],
    variants: {
        size: containerGapVariants,
    },
    defaultVariants: {
        size: 'medium',
    },
});
export const errorContainer = style({
    selectors: {
        '&[data-error]': {},
    },
});
export const focusWithinContainer = style({
    selectors: {
        '&:focus-within': {},
    },
});
