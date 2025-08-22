import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const badge = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space[1],
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: '1',
    textTransform: 'uppercase',
    letterSpacing: tokens.letterSpacing.wide,
    userSelect: 'none',
    transition: tokens.transition.fast,
    whiteSpace: 'nowrap',
});
export const sizes = styleVariants({
    small: {
        padding: `${tokens.space[1]} ${tokens.space[2]}`,
        fontSize: tokens.fontSize.xs,
        borderRadius: tokens.radius.sm,
        minHeight: '18px',
    },
    medium: {
        padding: `${tokens.space[1]} ${tokens.space[3]}`,
        fontSize: tokens.fontSize.xs,
        borderRadius: tokens.radius.base,
        minHeight: '20px',
    },
    large: {
        padding: `${tokens.space[2]} ${tokens.space[4]}`,
        fontSize: tokens.fontSize.sm,
        borderRadius: tokens.radius.md,
        minHeight: '24px',
    },
});
export const solidVariants = styleVariants({
    default: {
        backgroundColor: colors.background.tertiary,
        color: colors.foreground.primary,
        border: '1px solid transparent',
    },
    brand: {
        backgroundColor: colors.brand.primary,
        color: colors.foreground.inverse,
        border: '1px solid transparent',
    },
    success: {
        backgroundColor: colors.semantic.success,
        color: colors.foreground.inverse,
        border: '1px solid transparent',
    },
    warning: {
        backgroundColor: colors.semantic.warning,
        color: colors.foreground.inverse,
        border: '1px solid transparent',
    },
    error: {
        backgroundColor: colors.semantic.error,
        color: colors.foreground.inverse,
        border: '1px solid transparent',
    },
    info: {
        backgroundColor: colors.semantic.info,
        color: colors.foreground.inverse,
        border: '1px solid transparent',
    },
});
export const subtleVariants = styleVariants({
    default: {
        backgroundColor: colors.background.secondary,
        color: colors.foreground.secondary,
        border: '1px solid transparent',
    },
    brand: {
        backgroundColor: colors.brand.primaryActive,
        color: colors.brand.primary,
        border: '1px solid transparent',
        opacity: 0.15,
        selectors: {
            '&': {
                opacity: 1,
                backgroundColor: `${colors.brand.primary}15`,
            },
        },
    },
    success: {
        backgroundColor: colors.semantic.successBackground,
        color: colors.semantic.success,
        border: '1px solid transparent',
    },
    warning: {
        backgroundColor: colors.semantic.warningBackground,
        color: colors.semantic.warning,
        border: '1px solid transparent',
    },
    error: {
        backgroundColor: colors.semantic.errorBackground,
        color: colors.semantic.error,
        border: '1px solid transparent',
    },
    info: {
        backgroundColor: colors.semantic.infoBackground,
        color: colors.semantic.info,
        border: '1px solid transparent',
    },
});
export const outlineVariants = styleVariants({
    default: {
        backgroundColor: 'transparent',
        color: colors.foreground.secondary,
        border: `1px solid ${colors.border.primary}`,
    },
    brand: {
        backgroundColor: 'transparent',
        color: colors.brand.primary,
        border: `1px solid ${colors.brand.primary}`,
    },
    success: {
        backgroundColor: 'transparent',
        color: colors.semantic.success,
        border: `1px solid ${colors.semantic.success}`,
    },
    warning: {
        backgroundColor: 'transparent',
        color: colors.semantic.warning,
        border: `1px solid ${colors.semantic.warning}`,
    },
    error: {
        backgroundColor: 'transparent',
        color: colors.semantic.error,
        border: `1px solid ${colors.semantic.error}`,
    },
    info: {
        backgroundColor: 'transparent',
        color: colors.semantic.info,
        border: `1px solid ${colors.semantic.info}`,
    },
});
export const variants = {
    solid: solidVariants,
    subtle: subtleVariants,
    outline: outlineVariants,
};
