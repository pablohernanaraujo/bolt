import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const divider = style({
    border: 'none',
    backgroundColor: colors.border.primary,
    flexShrink: 0,
});
export const orientations = styleVariants({
    horizontal: {
        width: '100%',
        height: '1px',
    },
    vertical: {
        width: '1px',
        height: '100%',
        minHeight: tokens.space[6],
    },
});
export const variants = styleVariants({
    solid: {
        backgroundColor: colors.border.primary,
    },
    dashed: {
        backgroundColor: 'transparent',
        backgroundImage: `linear-gradient(to right, ${colors.border.primary} 50%, transparent 50%)`,
        backgroundSize: `${tokens.space[2]} 1px`,
        backgroundRepeat: 'repeat-x',
    },
    dotted: {
        backgroundColor: 'transparent',
        backgroundImage: `radial-gradient(circle, ${colors.border.primary} 1px, transparent 1px)`,
        backgroundSize: `${tokens.space[1]} ${tokens.space[1]}`,
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'center',
    },
});
export const verticalVariants = styleVariants({
    solid: {
        backgroundColor: colors.border.primary,
    },
    dashed: {
        backgroundColor: 'transparent',
        backgroundImage: `linear-gradient(to bottom, ${colors.border.primary} 50%, transparent 50%)`,
        backgroundSize: `1px ${tokens.space[2]}`,
        backgroundRepeat: 'repeat-y',
    },
    dotted: {
        backgroundColor: 'transparent',
        backgroundImage: `radial-gradient(circle, ${colors.border.primary} 1px, transparent 1px)`,
        backgroundSize: `${tokens.space[1]} ${tokens.space[1]}`,
        backgroundRepeat: 'repeat-y',
        backgroundPosition: 'center',
    },
});
export const sizes = styleVariants({
    thin: {},
    medium: {},
    thick: {},
});
export const horizontalSizes = styleVariants({
    thin: {
        height: '1px',
    },
    medium: {
        height: '2px',
    },
    thick: {
        height: '4px',
    },
});
export const verticalSizes = styleVariants({
    thin: {
        width: '1px',
    },
    medium: {
        width: '2px',
    },
    thick: {
        width: '4px',
    },
});
export const horizontalSpacing = styleVariants({
    none: {
        margin: 0,
    },
    small: {
        marginTop: tokens.space[2],
        marginBottom: tokens.space[2],
    },
    medium: {
        marginTop: tokens.space[4],
        marginBottom: tokens.space[4],
    },
    large: {
        marginTop: tokens.space[6],
        marginBottom: tokens.space[6],
    },
});
export const verticalSpacing = styleVariants({
    none: {
        margin: 0,
    },
    small: {
        marginLeft: tokens.space[2],
        marginRight: tokens.space[2],
    },
    medium: {
        marginLeft: tokens.space[4],
        marginRight: tokens.space[4],
    },
    large: {
        marginLeft: tokens.space[6],
        marginRight: tokens.space[6],
    },
});
