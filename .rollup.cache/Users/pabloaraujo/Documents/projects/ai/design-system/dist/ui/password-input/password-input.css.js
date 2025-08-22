import { style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const passwordInputContainer = style({
    position: 'relative',
    width: '100%',
    display: 'inline-flex',
    alignItems: 'stretch',
});
export const passwordInputBase = style({
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    outline: 'none',
    margin: 0,
    width: '100%',
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeight.normal,
    lineHeight: tokens.lineHeight.normal,
    color: colors.foreground.primary,
    transition: tokens.transition.fast,
    selectors: {
        '&::placeholder': {
            color: colors.foreground.secondary,
            opacity: 1,
        },
        '&::-webkit-input-placeholder': {
            color: colors.foreground.secondary,
        },
        '&::-moz-placeholder': {
            color: colors.foreground.secondary,
            opacity: 1,
        },
        '&:-ms-input-placeholder': {
            color: colors.foreground.secondary,
        },
        '&[data-disabled]': {
            color: colors.foreground.tertiary,
            cursor: 'not-allowed',
        },
        '&[data-disabled]::placeholder': {
            color: colors.foreground.tertiary,
        },
    },
});
export const passwordInputVariants = styleVariants({
    outline: {
        backgroundColor: colors.background.primary,
        border: `1px solid ${colors.border.primary}`,
        selectors: {
            '&:hover': {
                borderColor: colors.border.secondary,
            },
            '&:focus-within': {
                borderColor: colors.brand.primary,
                boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
            },
            '&[data-disabled]': {
                backgroundColor: colors.background.secondary,
                borderColor: colors.border.secondary,
                cursor: 'not-allowed',
            },
            '&[data-invalid]': {
                borderColor: colors.semantic.error,
            },
            '&[data-invalid]:focus-within': {
                borderColor: colors.semantic.error,
                boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
            },
        },
    },
    filled: {
        backgroundColor: colors.background.secondary,
        border: `1px solid transparent`,
        selectors: {
            '&:hover': {
                backgroundColor: colors.background.tertiary,
            },
            '&:focus-within': {
                backgroundColor: colors.background.primary,
                borderColor: colors.brand.primary,
                boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
            },
            '&[data-disabled]': {
                backgroundColor: colors.background.secondary,
                cursor: 'not-allowed',
            },
            '&[data-invalid]': {
                borderColor: colors.semantic.error,
                backgroundColor: colors.background.primary,
            },
            '&[data-invalid]:focus-within': {
                borderColor: colors.semantic.error,
                boxShadow: `0 0 0 3px ${colors.semantic.error}33`,
            },
        },
    },
});
export const passwordInputSizes = styleVariants({
    small: {
        height: tokens.space[8],
        paddingLeft: tokens.space[3],
        paddingRight: tokens.space[8],
        fontSize: tokens.fontSize.sm,
        borderRadius: tokens.radius.base,
    },
    medium: {
        height: tokens.space[10],
        paddingLeft: tokens.space[4],
        paddingRight: tokens.space[10],
        fontSize: tokens.fontSize.base,
        borderRadius: tokens.radius.md,
    },
    large: {
        height: tokens.space[12],
        paddingLeft: tokens.space[5],
        paddingRight: tokens.space[12],
        fontSize: tokens.fontSize.lg,
        borderRadius: tokens.radius.lg,
    },
});
export const passwordInputRecipe = recipe({
    base: [passwordInputBase],
    variants: {
        variant: passwordInputVariants,
        size: passwordInputSizes,
    },
    defaultVariants: {
        variant: 'outline',
        size: 'medium',
    },
});
export const toggleButtonBase = style({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.foreground.secondary,
    transition: tokens.transition.fast,
    selectors: {
        '&:hover': {
            color: colors.foreground.primary,
        },
        '&:focus-visible': {
            outline: `2px solid ${colors.brand.primary}`,
            outlineOffset: '2px',
            borderRadius: tokens.radius.base,
        },
        '&[data-disabled]': {
            color: colors.foreground.tertiary,
            cursor: 'not-allowed',
        },
    },
});
export const toggleButtonSizes = styleVariants({
    small: {
        right: tokens.space[2],
        width: tokens.space[4],
        height: tokens.space[4],
    },
    medium: {
        right: tokens.space[3],
        width: tokens.space[5],
        height: tokens.space[5],
    },
    large: {
        right: tokens.space[4],
        width: tokens.space[6],
        height: tokens.space[6],
    },
});
export const toggleButtonStates = styleVariants({
    visible: {},
    hidden: {},
});
export const toggleButtonRecipe = recipe({
    base: [toggleButtonBase],
    variants: {
        size: toggleButtonSizes,
        state: toggleButtonStates,
    },
    defaultVariants: {
        size: 'medium',
        state: 'hidden',
    },
});
export const passwordInput = style({
    paddingRight: '0 !important',
});
