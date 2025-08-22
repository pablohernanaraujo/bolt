import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const progressBase = style({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space[2],
    width: '100%',
});
export const progressTrack = style({
    position: 'relative',
    flex: 1,
    backgroundColor: colors.background.secondary,
    borderRadius: tokens.radius.full,
    overflow: 'hidden',
});
export const progressBar = style({
    height: '100%',
    borderRadius: 'inherit',
    transition: 'width 0.3s ease, background-color 0.2s ease',
    position: 'relative',
    overflow: 'hidden',
});
export const progressLabel = style({
    fontSize: '0.875rem',
    fontWeight: 500,
    color: colors.foreground.primary,
    whiteSpace: 'nowrap',
});
export const progressValue = style({
    fontSize: '0.875rem',
    fontWeight: 600,
    color: colors.foreground.primary,
    minWidth: '3rem',
    textAlign: 'right',
});
export const trackSizes = styleVariants({
    small: {
        height: tokens.space[1],
    },
    medium: {
        height: tokens.space[2],
    },
    large: {
        height: tokens.space[3],
    },
});
export const barVariants = styleVariants({
    primary: {
        backgroundColor: colors.brand.primary,
    },
    success: {
        backgroundColor: colors.semantic.success,
    },
    warning: {
        backgroundColor: colors.semantic.warning,
    },
    error: {
        backgroundColor: colors.semantic.error,
    },
});
export const stripedOverlay = style({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  )`,
    backgroundSize: `${tokens.space[4]} ${tokens.space[4]}`,
});
const progressStripesAnimation = keyframes({
    '0%': {
        backgroundPosition: `${tokens.space[4]} 0`,
    },
    '100%': {
        backgroundPosition: '0 0',
    },
});
export const animatedStripes = style({
    animation: `${progressStripesAnimation} 1s linear infinite`,
});
const indeterminateAnimation = keyframes({
    '0%': {
        transform: 'translateX(-100%)',
    },
    '100%': {
        transform: 'translateX(100%)',
    },
});
export const indeterminate = style({
    width: '30%',
    animation: `${indeterminateAnimation} 1.5s ease-in-out infinite`,
});
export const indeterminateTrack = style({
    position: 'relative',
    overflow: 'hidden',
    '::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
        animation: 'indeterminate 1.5s ease-in-out infinite',
    },
});
export const progress = recipe({
    base: [progressBase],
    variants: {
        variant: {
            primary: {},
            success: {},
            warning: {},
            error: {},
        },
        size: {
            small: {},
            medium: {},
            large: {},
        },
        isStriped: {
            true: {},
            false: {},
        },
        isAnimated: {
            true: {},
            false: {},
        },
        isIndeterminate: {
            true: {},
            false: {},
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'medium',
        isStriped: false,
        isAnimated: false,
        isIndeterminate: false,
    },
});
export const progressWithLabel = style({
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space[1],
    width: '100%',
});
export const labelRow = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
});
