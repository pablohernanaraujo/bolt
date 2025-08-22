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
const scaleIn = keyframes({
    '0%': {
        opacity: 0,
        transform: 'scale(0.95)',
    },
    '100%': {
        opacity: 1,
        transform: 'scale(1)',
    },
});
const scaleOut = keyframes({
    '0%': {
        opacity: 1,
        transform: 'scale(1)',
    },
    '100%': {
        opacity: 0,
        transform: 'scale(0.95)',
    },
});
export const modalOverlay = style({
    position: 'fixed',
    inset: 0,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.space[4],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    animationDuration: '200ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
    selectors: {
        '&[data-entering]': {
            animationName: fadeIn,
        },
        '&[data-exiting]': {
            animationName: fadeOut,
        },
    },
});
export const modalDialog = style({
    position: 'relative',
    maxHeight: `calc(100vh - ${tokens.space[8]})`,
    width: '100%',
    backgroundColor: colors.background.primary,
    borderRadius: tokens.radius.lg,
    boxShadow: shadows.large,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animationDuration: '200ms',
    animationTimingFunction: 'ease-out',
    animationFillMode: 'both',
    selectors: {
        '&[data-entering]': {
            animationName: scaleIn,
        },
        '&[data-exiting]': {
            animationName: scaleOut,
        },
    },
});
export const modalSizes = styleVariants({
    small: {
        maxWidth: '400px',
    },
    medium: {
        maxWidth: '600px',
    },
    large: {
        maxWidth: '800px',
    },
    full: {
        maxWidth: '100vw',
        maxHeight: '100vh',
        width: '100vw',
        height: '100vh',
        margin: 0,
        borderRadius: 0,
        position: 'fixed',
        inset: 0,
    },
});
export const modalHeader = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: tokens.space[6],
    paddingBottom: tokens.space[4],
    borderBottom: `1px solid ${colors.border.secondary}`,
    fontSize: tokens.fontSize.lg,
    fontWeight: tokens.fontWeight.semibold,
    color: colors.foreground.primary,
});
export const modalTitle = style({
    margin: 0,
    fontSize: tokens.fontSize.lg,
    fontWeight: tokens.fontWeight.semibold,
    color: colors.foreground.primary,
    lineHeight: tokens.lineHeight.tight,
});
export const modalCloseButton = style({
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
export const modalBody = style({
    flex: 1,
    overflow: 'auto',
    padding: tokens.space[6],
    paddingTop: tokens.space[4],
    paddingBottom: tokens.space[4],
    color: colors.foreground.primary,
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.lineHeight.relaxed,
});
export const modalFooter = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: tokens.space[3],
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
export const modalBodyNoHeader = style({
    paddingTop: tokens.space[6],
});
export const modalBodyNoFooter = style({
    paddingBottom: tokens.space[6],
});
export const scrollLock = style({
    overflow: 'hidden',
});
