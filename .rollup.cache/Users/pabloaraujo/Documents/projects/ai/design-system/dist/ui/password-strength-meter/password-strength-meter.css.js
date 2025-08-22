import { keyframes, style, styleVariants } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
const progressFillAnimation = keyframes({
    '0%': { width: '0%' },
    '100%': { width: 'var(--progress-width)' },
});
export const strengthMeterContainer = style({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space[2],
});
export const progressBarContainer = style({
    width: '100%',
    backgroundColor: colors.background.secondary,
    borderRadius: tokens.radius.full,
    overflow: 'hidden',
    position: 'relative',
});
export const progressBarFill = style({
    height: '100%',
    borderRadius: tokens.radius.full,
    transition: `all ${tokens.transition.base}`,
    animation: `${progressFillAnimation} 0.6s ease-out`,
    width: 'var(--progress-width)',
});
export const progressBarSizes = styleVariants({
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
export const progressBarColors = styleVariants({
    weak: {
        backgroundColor: colors.semantic.error,
    },
    fair: {
        backgroundColor: colors.semantic.warning,
    },
    good: {
        backgroundColor: colors.semantic.info,
    },
    strong: {
        backgroundColor: colors.semantic.success,
    },
});
export const strengthLabel = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: tokens.fontSize.sm,
    fontWeight: tokens.fontWeight.medium,
});
export const strengthLabelText = style({
    fontWeight: tokens.fontWeight.semibold,
});
export const strengthLabelColors = styleVariants({
    weak: {
        color: colors.semantic.error,
    },
    fair: {
        color: colors.semantic.warning,
    },
    good: {
        color: colors.semantic.info,
    },
    strong: {
        color: colors.semantic.success,
    },
});
export const feedbackContainer = style({
    marginTop: tokens.space[2],
});
export const feedbackList = style({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    fontSize: tokens.fontSize.xs,
    color: colors.foreground.secondary,
});
export const feedbackItem = style({
    position: 'relative',
    paddingLeft: tokens.space[4],
    marginBottom: tokens.space[1],
    '::before': {
        content: '•',
        position: 'absolute',
        left: tokens.space[2],
        color: colors.foreground.tertiary,
    },
});
export const progressBarRecipe = recipe({
    base: [progressBarContainer],
    variants: {
        size: progressBarSizes,
    },
    defaultVariants: {
        size: 'medium',
    },
});
export const progressFillRecipe = recipe({
    base: [progressBarFill],
    variants: {
        strength: progressBarColors,
    },
    defaultVariants: {
        strength: 'weak',
    },
});
export const labelRecipe = recipe({
    base: [strengthLabel],
    variants: {
        strength: strengthLabelColors,
    },
    defaultVariants: {
        strength: 'weak',
    },
});
