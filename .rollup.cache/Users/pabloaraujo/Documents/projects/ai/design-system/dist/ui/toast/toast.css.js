import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { radius, tokens } from '@/tokens';
import { colors, shadows } from '@/tokens/contracts.css';
const slideInBottom = keyframes({
    '0%': {
        transform: 'translateY(100%)',
        opacity: 0,
    },
    '100%': {
        transform: 'translateY(0)',
        opacity: 1,
    },
});
const slideInTop = keyframes({
    '0%': {
        transform: 'translateY(-100%)',
        opacity: 0,
    },
    '100%': {
        transform: 'translateY(0)',
        opacity: 1,
    },
});
const slideOutBottom = keyframes({
    '0%': {
        transform: 'translateY(0)',
        opacity: 1,
    },
    '100%': {
        transform: 'translateY(100%)',
        opacity: 0,
    },
});
const slideOutTop = keyframes({
    '0%': {
        transform: 'translateY(0)',
        opacity: 1,
    },
    '100%': {
        transform: 'translateY(-100%)',
        opacity: 0,
    },
});
export const toastContainer = style({
    position: 'fixed',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space['3'],
    maxWidth: '420px',
    width: '100%',
    padding: tokens.space['4'],
    pointerEvents: 'none',
    '@media': {
        '(max-width: 480px)': {
            left: `${tokens.space['3']} !important`,
            right: `${tokens.space['3']} !important`,
            maxWidth: 'none',
            transform: 'none !important',
        },
    },
});
export const toastContainerPositions = styleVariants({
    top: {
        top: tokens.space['4'],
        left: '50%',
        transform: 'translateX(-50%)',
    },
    bottom: {
        bottom: tokens.space['4'],
        left: '50%',
        transform: 'translateX(-50%)',
    },
    'top-left': {
        top: tokens.space['4'],
        left: tokens.space['4'],
    },
    'top-right': {
        top: tokens.space['4'],
        right: tokens.space['4'],
    },
    'bottom-left': {
        bottom: tokens.space['4'],
        left: tokens.space['4'],
    },
    'bottom-right': {
        bottom: tokens.space['4'],
        right: tokens.space['4'],
    },
});
export const toast = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.space['3'],
    padding: tokens.space['4'],
    borderRadius: radius.md,
    boxShadow: shadows.toast,
    pointerEvents: 'auto',
    maxWidth: '100%',
    wordWrap: 'break-word',
    position: 'relative',
    transition: 'all 0.2s ease-in-out',
    selectors: {
        '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: shadows.large,
        },
    },
});
export const toastVisible = style({
    animation: `${slideInBottom} 0.3s ease-out forwards`,
    selectors: {
        '[data-position*="top"] &': {
            animation: `${slideInTop} 0.3s ease-out forwards`,
        },
    },
});
export const toastHidden = style({
    animation: `${slideOutBottom} 0.2s ease-in forwards`,
    selectors: {
        '[data-position*="top"] &': {
            animation: `${slideOutTop} 0.2s ease-in forwards`,
        },
    },
});
export const toastVariants = styleVariants({
    success: {
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
    },
    error: {
        backgroundColor: '#f8d7da',
        border: '1px solid #f5c6cb',
    },
    warning: {
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
    },
    info: {
        backgroundColor: '#d1ecf1',
        border: '1px solid #bee5eb',
    },
});
export const toastIcon = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    flexShrink: 0,
    marginTop: '2px',
});
export const toastIconVariants = styleVariants({
    success: {
        color: colors.toast.successIcon,
    },
    error: {
        color: colors.toast.errorIcon,
    },
    warning: {
        color: colors.toast.warningIcon,
    },
    info: {
        color: colors.toast.infoIcon,
    },
});
export const toastContent = style({
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space['2'],
    flex: 1,
    minWidth: 0,
});
export const toastTitle = style({
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: 1.4,
    color: colors.foreground.primary,
    margin: 0,
});
export const toastDescription = style({
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: colors.foreground.secondary,
    margin: 0,
});
export const toastCloseButton = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    flexShrink: 0,
    marginTop: '2px',
    marginLeft: tokens.space['2'],
    background: 'transparent',
    border: 'none',
    borderRadius: radius.sm,
    color: colors.foreground.tertiary,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    selectors: {
        '&:hover': {
            backgroundColor: colors.background.secondary,
            color: colors.foreground.primary,
        },
        '&:focus-visible': {
            outline: `2px solid ${colors.border.focus}`,
            outlineOffset: '1px',
        },
    },
});
export const toastProgressBar = style({
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '2px',
    backgroundColor: colors.brand.primary,
    borderBottomLeftRadius: radius.md,
    borderBottomRightRadius: radius.md,
    transformOrigin: 'left',
    transition: 'transform linear',
});
export const toastProgressBarVariants = styleVariants({
    success: {
        backgroundColor: colors.toast.successIcon,
    },
    error: {
        backgroundColor: colors.toast.errorIcon,
    },
    warning: {
        backgroundColor: colors.toast.warningIcon,
    },
    info: {
        backgroundColor: colors.toast.infoIcon,
    },
});
