import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { colors, shadows } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
const fadeIn = keyframes({
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
});
const fadeOut = keyframes({
    '0%': { opacity: 1 },
    '100%': { opacity: 0 },
});
const slideInLeft = keyframes({
    '0%': {
        opacity: 0,
        transform: 'translateX(-100%)',
    },
    '100%': {
        opacity: 1,
        transform: 'translateX(0)',
    },
});
const slideInRight = keyframes({
    '0%': {
        opacity: 0,
        transform: 'translateX(100%)',
    },
    '100%': {
        opacity: 1,
        transform: 'translateX(0)',
    },
});
const slideInTop = keyframes({
    '0%': {
        opacity: 0,
        transform: 'translateY(-100%)',
    },
    '100%': {
        opacity: 1,
        transform: 'translateY(0)',
    },
});
const slideInBottom = keyframes({
    '0%': {
        opacity: 0,
        transform: 'translateY(100%)',
    },
    '100%': {
        opacity: 1,
        transform: 'translateY(0)',
    },
});
export const drawerOverlay = style({
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'block',
    animationDuration: 'var(--drawer-animation-duration-enter, 300ms)',
    animationTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
    animationFillMode: 'both',
    selectors: {
        '&[data-entering]': {
            animationName: fadeIn,
        },
        '&[data-exiting]': {
            animationName: fadeOut,
            animationDuration: 'var(--drawer-animation-duration-exit, 200ms)',
        },
    },
    '@media': {
        '(prefers-reduced-motion: reduce)': {
            animationDuration: '0ms',
            animationName: 'none',
        },
    },
});
export const drawerDialog = style({
    position: 'absolute',
    backgroundColor: colors.background.primary,
    boxShadow: shadows.large,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animationDuration: 'var(--drawer-animation-duration-enter, 300ms)',
    animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    animationFillMode: 'both',
    selectors: {
        '&:focus-visible': {
            outline: `2px solid ${colors.border.focus}`,
            outlineOffset: '2px',
        },
    },
    '@media': {
        '(prefers-reduced-motion: reduce)': {
            animationDuration: '0ms',
            animationName: 'none',
        },
    },
});
export const drawerPlacements = styleVariants({
    left: {
        top: 0,
        left: 0,
        height: '100vh',
        borderTopRightRadius: tokens.radius.lg,
        borderBottomRightRadius: tokens.radius.lg,
        animationName: slideInLeft,
    },
    right: {
        top: 0,
        right: 0,
        height: '100vh',
        borderTopLeftRadius: tokens.radius.lg,
        borderBottomLeftRadius: tokens.radius.lg,
        animationName: slideInRight,
    },
    top: {
        top: 0,
        left: 0,
        right: 0,
        width: '100vw',
        borderBottomLeftRadius: tokens.radius.lg,
        borderBottomRightRadius: tokens.radius.lg,
        animationName: slideInTop,
    },
    bottom: {
        bottom: 0,
        left: 0,
        right: 0,
        width: '100vw',
        borderTopLeftRadius: tokens.radius.lg,
        borderTopRightRadius: tokens.radius.lg,
        animationName: slideInBottom,
    },
});
export const drawerSizesHorizontal = styleVariants({
    small: {
        width: '320px',
        maxWidth: '80vw',
    },
    medium: {
        width: '400px',
        maxWidth: '80vw',
    },
    large: {
        width: '500px',
        maxWidth: '80vw',
    },
    full: {
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        position: 'fixed',
        inset: 0,
    },
});
export const drawerSizesVertical = styleVariants({
    small: {
        height: '320px',
        maxHeight: '80vh',
    },
    medium: {
        height: '400px',
        maxHeight: '80vh',
    },
    large: {
        height: '500px',
        maxHeight: '80vh',
    },
    full: {
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
        position: 'fixed',
        inset: 0,
    },
});
export const drawerHeader = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    padding: tokens.space[6],
    paddingBottom: tokens.space[4],
    borderBottom: `1px solid ${colors.border.secondary}`,
    fontSize: tokens.fontSize.lg,
    fontWeight: tokens.fontWeight.semibold,
    color: colors.foreground.primary,
});
export const drawerTitle = style({
    margin: 0,
    fontSize: tokens.fontSize.lg,
    fontWeight: tokens.fontWeight.semibold,
    color: colors.foreground.primary,
    lineHeight: tokens.lineHeight.tight,
});
export const drawerCloseButton = style({
    border: 'none',
    background: 'none',
    padding: tokens.space[2],
    margin: `calc(-1 * ${tokens.space[2]})`,
    cursor: 'pointer',
    color: colors.foreground.secondary,
    borderRadius: tokens.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 150ms ease',
    selectors: {
        '&:hover': {
            backgroundColor: colors.background.secondary,
            color: colors.foreground.primary,
        },
        '&:focus-visible': {
            outline: `2px solid ${colors.border.focus}`,
            outlineOffset: '2px',
        },
    },
});
export const drawerBody = style({
    flex: 1,
    overflow: 'auto',
    padding: tokens.space[6],
    paddingTop: tokens.space[4],
    paddingBottom: tokens.space[4],
    color: colors.foreground.primary,
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.lineHeight.relaxed,
});
export const drawerFooter = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: tokens.space[3],
    flexShrink: 0,
    padding: tokens.space[6],
    paddingTop: tokens.space[4],
    borderTop: `1px solid ${colors.border.secondary}`,
    '@media': {
        '(max-width: 640px)': {
            flexDirection: 'column-reverse',
            gap: tokens.space[2],
        },
    },
});
export const drawerBodyNoHeader = style({
    paddingTop: tokens.space[6],
});
export const drawerBodyNoFooter = style({
    paddingBottom: tokens.space[6],
});
