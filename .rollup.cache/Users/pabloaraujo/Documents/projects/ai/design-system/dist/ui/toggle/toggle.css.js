import { style, styleVariants } from '@vanilla-extract/css';
import { colors, shadows } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const container = style({
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
export const labelPositions = styleVariants({
    left: {
        flexDirection: 'row-reverse',
    },
    right: {
        flexDirection: 'row',
    },
});
export const track = style({
    position: 'relative',
    backgroundColor: colors.background.tertiary,
    border: `2px solid ${colors.border.primary}`,
    transition: tokens.transition.fast,
    outline: 'none',
    selectors: {
        '&[data-focused]': {
            boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
        },
    },
});
export const trackSizes = styleVariants({
    small: {
        width: '36px',
        height: '20px',
        borderRadius: tokens.radius.full,
    },
    medium: {
        width: '44px',
        height: '24px',
        borderRadius: tokens.radius.full,
    },
    large: {
        width: '52px',
        height: '28px',
        borderRadius: tokens.radius.full,
    },
});
export const thumb = style({
    position: 'absolute',
    top: '50%',
    backgroundColor: colors.background.primary,
    borderRadius: tokens.radius.full,
    boxShadow: shadows.small,
    transform: 'translateY(-50%)',
    transition: tokens.transition.fast,
    left: '2px',
});
export const thumbSizes = styleVariants({
    small: {
        width: '14px',
        height: '14px',
    },
    medium: {
        width: '18px',
        height: '18px',
    },
    large: {
        width: '22px',
        height: '22px',
    },
});
export const thumbCheckedPositions = styleVariants({
    small: {
        transform: 'translateY(-50%) translateX(16px)',
    },
    medium: {
        transform: 'translateY(-50%) translateX(20px)',
    },
    large: {
        transform: 'translateY(-50%) translateX(24px)',
    },
});
export const checkedVariants = styleVariants({
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
        backgroundColor: colors.background.secondary,
        borderColor: colors.border.secondary,
        selectors: {
            '&:hover:not([data-disabled])': {
                backgroundColor: colors.background.tertiary,
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
export const label = style({
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
