import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { colors, shadows } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const popoverOverlay = style({
    position: 'fixed',
    inset: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    pointerEvents: 'none',
});
export const popover = style({
    position: 'relative',
    pointerEvents: 'auto',
    backgroundColor: colors.background.primary,
    border: `1px solid ${colors.border.primary}`,
    borderRadius: tokens.radius.lg,
    boxShadow: shadows.large,
    outline: 'none',
    overflow: 'hidden',
    transition: 'all 0.2s ease-out',
    transformOrigin: 'var(--transform-origin)',
    selectors: {
        '&[data-entering]': {
            animationDuration: '0.2s',
            animationFillMode: 'forwards',
            animationTimingFunction: 'ease-out',
        },
        '&[data-exiting]': {
            animationDuration: '0.15s',
            animationFillMode: 'forwards',
            animationTimingFunction: 'ease-in',
        },
        '&[data-placement="top"]': {
            transformOrigin: 'bottom center',
        },
        '&[data-placement="bottom"]': {
            transformOrigin: 'top center',
        },
        '&[data-placement="left"]': {
            transformOrigin: 'right center',
        },
        '&[data-placement="right"]': {
            transformOrigin: 'left center',
        },
        '&:focus-visible': {
            outline: `2px solid ${colors.border.focus}`,
            outlineOffset: '2px',
        },
    },
});
export const popoverSizes = styleVariants({
    small: {
        minWidth: '200px',
        maxWidth: '280px',
    },
    medium: {
        minWidth: '280px',
        maxWidth: '360px',
    },
    large: {
        minWidth: '320px',
        maxWidth: '480px',
    },
});
export const popoverVariants = styleVariants({
    default: {
        backgroundColor: colors.background.primary,
        color: colors.foreground.primary,
        borderColor: colors.border.primary,
    },
    inverse: {
        backgroundColor: colors.background.inverse,
        color: colors.foreground.inverse,
        borderColor: colors.border.secondary,
    },
    accent: {
        backgroundColor: colors.brand.primary,
        color: colors.foreground.inverse,
        borderColor: colors.brand.primary,
    },
});
export const popoverHeader = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${tokens.space[6]} ${tokens.space[6]} ${tokens.space[3]}`,
    gap: tokens.space[6],
    minHeight: '48px',
});
export const popoverHeaderWithDivider = style({
    borderBottom: `1px solid ${colors.border.secondary}`,
    paddingBottom: tokens.space[6],
});
export const popoverTitle = style({
    margin: 0,
    fontSize: tokens.fontSize.lg,
    fontWeight: tokens.fontWeight.semibold,
    color: 'inherit',
    lineHeight: tokens.lineHeight.tight,
});
export const popoverCloseButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    border: 'none',
    borderRadius: tokens.radius.sm,
    backgroundColor: 'transparent',
    color: colors.foreground.secondary,
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'all 0.15s ease-out',
    selectors: {
        '&:hover': {
            backgroundColor: colors.background.secondary,
            color: colors.foreground.primary,
        },
        '&:focus-visible': {
            outline: `2px solid ${colors.border.focus}`,
            outlineOffset: '2px',
        },
        '&:active': {
            backgroundColor: colors.background.tertiary,
            transform: 'scale(0.95)',
        },
    },
});
export const popoverBody = style({
    padding: tokens.space[6],
    fontSize: tokens.fontSize.sm,
    color: 'inherit',
    lineHeight: tokens.lineHeight.relaxed,
});
export const popoverBodyWithHeader = style({
    paddingTop: tokens.space[3],
});
export const popoverBodyWithFooter = style({
    paddingBottom: tokens.space[3],
});
export const popoverFooter = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: tokens.space[3],
    padding: `${tokens.space[3]} ${tokens.space[6]} ${tokens.space[6]}`,
});
export const popoverFooterWithDivider = style({
    borderTop: `1px solid ${colors.border.secondary}`,
    paddingTop: tokens.space[6],
});
export const popoverArrow = style({
    width: '12px',
    height: '12px',
    transform: 'rotate(45deg)',
    border: `1px solid ${colors.border.primary}`,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    backgroundColor: colors.background.primary,
    selectors: {
        '[data-placement="top"] &': {
            borderBottomColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: colors.border.primary,
            borderLeftColor: colors.border.primary,
        },
        '[data-placement="bottom"] &': {
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
        },
        '[data-placement="left"] &': {
            borderBottomColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: colors.border.primary,
            borderLeftColor: colors.border.primary,
        },
        '[data-placement="right"] &': {
            borderTopColor: 'transparent',
            borderLeftColor: 'transparent',
        },
    },
});
export const popoverArrowVariants = styleVariants({
    default: {
        backgroundColor: colors.background.primary,
        borderColor: colors.border.primary,
    },
    inverse: {
        backgroundColor: colors.background.inverse,
        borderColor: colors.border.secondary,
    },
    accent: {
        backgroundColor: colors.brand.primary,
        borderColor: colors.brand.primary,
    },
});
const popoverEnterKeyframes = keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(0.95)',
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1)',
    },
});
export const enteringAnimation = style({
    '@media': {
        '(prefers-reduced-motion: no-preference)': {
            animationName: popoverEnterKeyframes,
        },
    },
});
const popoverExitKeyframes = keyframes({
    '0%': {
        opacity: 1,
        transform: 'scale(1)',
    },
    '100%': {
        opacity: 0,
        transform: 'scale(0.95)',
    },
});
export const exitingAnimation = style({
    '@media': {
        '(prefers-reduced-motion: no-preference)': {
            animationName: popoverExitKeyframes,
        },
    },
});
export const responsivePopover = style({
    '@media': {
        '(max-width: 640px)': {
            maxWidth: 'calc(100vw - 32px)',
            margin: '16px',
        },
    },
});
