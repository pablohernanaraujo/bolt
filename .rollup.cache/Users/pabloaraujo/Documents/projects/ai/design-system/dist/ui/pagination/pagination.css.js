import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const pagination = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space[1],
    listStyle: 'none',
    padding: 0,
    margin: 0,
    fontFamily: tokens.fonts.body,
});
export const paginationItem = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
export const paginationButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '40px',
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: tokens.lineHeight.normal,
    textDecoration: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    transition: tokens.transition.fast,
    border: '1px solid transparent',
    background: 'transparent',
    color: colors.foreground.primary,
    outline: 'none',
    selectors: {
        '&:hover:not([disabled]):not([aria-current="page"])': {
            backgroundColor: colors.background.secondary,
            color: colors.brand.primary,
        },
        '&:active:not([disabled]):not([aria-current="page"])': {
            backgroundColor: colors.background.tertiary,
        },
        '&[data-focused]': {
            boxShadow: `0 0 0 3px ${colors.brand.primary}33`,
        },
        '&[disabled]': {
            cursor: 'not-allowed',
            opacity: 0.5,
        },
        '&[aria-current="page"]': {
            backgroundColor: colors.brand.primary,
            color: colors.foreground.inverse,
            fontWeight: tokens.fontWeight.semibold,
        },
    },
});
export const sizes = styleVariants({
    small: {
        height: '32px',
        minWidth: '32px',
        padding: `0 ${tokens.space[2]}`,
        fontSize: tokens.fontSize.sm,
        borderRadius: tokens.radius.base,
    },
    medium: {
        height: '40px',
        minWidth: '40px',
        padding: `0 ${tokens.space[3]}`,
        fontSize: tokens.fontSize.base,
        borderRadius: tokens.radius.md,
    },
    large: {
        height: '48px',
        minWidth: '48px',
        padding: `0 ${tokens.space[4]}`,
        fontSize: tokens.fontSize.lg,
        borderRadius: tokens.radius.lg,
    },
});
export const variants = styleVariants({
    default: {},
    simple: {
        selectors: {
            '&:not([aria-current="page"])': {
                border: `1px solid ${colors.border.primary}`,
            },
            '&:hover:not([disabled]):not([aria-current="page"])': {
                borderColor: colors.brand.primary,
            },
        },
    },
});
export const ellipsis = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.foreground.tertiary,
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.lineHeight.normal,
    padding: `0 ${tokens.space[2]}`,
    userSelect: 'none',
    cursor: 'default',
});
export const navigationButton = style([
    paginationButton,
    {
        gap: tokens.space[1],
        selectors: {
            '&:hover:not([disabled])': {
                backgroundColor: colors.background.secondary,
                color: colors.brand.primary,
            },
            '&:active:not([disabled])': {
                backgroundColor: colors.background.tertiary,
            },
        },
    },
]);
export const buttonIcon = style({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
});
export const buttonText = style({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});
export const responsiveText = style({
    '@media': {
        '(max-width: 480px)': {
            display: 'none',
        },
    },
});
export const srOnly = style({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0,
});
export const paginationGap = styleVariants({
    small: {
        gap: tokens.space[0],
    },
    medium: {
        gap: tokens.space[1],
    },
    large: {
        gap: tokens.space[2],
    },
});
export const paginationSection = style({
    display: 'flex',
    alignItems: 'center',
    gap: 'inherit',
});
export const compact = style({
    gap: 0,
});
