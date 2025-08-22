import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
const rotate = keyframes({
    '0%': {
        transform: 'rotate(0deg)',
    },
    '100%': {
        transform: 'rotate(360deg)',
    },
});
export const spinner = style({
    display: 'inline-block',
    animation: `${rotate} 0.75s linear infinite`,
    flexShrink: 0,
});
export const sizes = styleVariants({
    small: {
        width: '16px',
        height: '16px',
    },
    medium: {
        width: '24px',
        height: '24px',
    },
    large: {
        width: '32px',
        height: '32px',
    },
});
export const colorSchemes = styleVariants({
    default: {
        color: colors.foreground.secondary,
    },
    brand: {
        color: colors.brand.primary,
    },
    success: {
        color: colors.semantic.success,
    },
    warning: {
        color: colors.semantic.warning,
    },
    error: {
        color: colors.semantic.error,
    },
    info: {
        color: colors.semantic.info,
    },
});
export const withTrack = style({
    position: 'relative',
    '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '50%',
        border: '2px solid',
        borderColor: 'currentColor',
        opacity: 0.2,
    },
});
export const track = style({
    opacity: 0.2,
});
export const spinnerElement = style({
    strokeLinecap: 'round',
});
export const visuallyHidden = style({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
});
