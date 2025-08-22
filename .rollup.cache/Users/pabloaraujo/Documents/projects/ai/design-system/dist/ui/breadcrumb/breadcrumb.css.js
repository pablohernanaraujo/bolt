import { style, styleVariants } from '@vanilla-extract/css';
import { colors, shadows } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const breadcrumbRoot = style({
    width: '100%',
});
export const breadcrumbList = style({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    gap: tokens.space[2],
    fontSize: tokens.fontSize.sm,
    lineHeight: tokens.lineHeight.normal,
});
export const breadcrumbListSizeVariants = styleVariants({
    small: {
        fontSize: tokens.fontSize.xs,
        lineHeight: tokens.lineHeight.normal,
        gap: tokens.space[1],
    },
    medium: {
        fontSize: tokens.fontSize.sm,
        lineHeight: tokens.lineHeight.normal,
        gap: tokens.space[2],
    },
    large: {
        fontSize: tokens.fontSize.base,
        lineHeight: tokens.lineHeight.normal,
        gap: tokens.space[3],
    },
});
export const breadcrumbItem = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.space[1],
    minWidth: 0,
});
export const breadcrumbLinkBase = style({
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.space[1],
    color: colors.foreground.secondary,
    textDecoration: 'none',
    borderRadius: tokens.radius.sm,
    padding: `${tokens.space[1]} ${tokens.space[2]}`,
    transition: 'all 0.15s ease',
    cursor: 'pointer',
    outline: 'none',
    position: 'relative',
    minWidth: 0,
    ':hover': {
        color: colors.foreground.primary,
        backgroundColor: colors.background.secondary,
    },
    ':focus-visible': {
        color: colors.foreground.primary,
        backgroundColor: colors.background.secondary,
        boxShadow: `0 0 0 2px ${colors.border.focus}`,
    },
    ':active': {
        transform: 'translateY(1px)',
    },
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '@media': {
        '(max-width: 768px)': {
            maxWidth: '120px',
        },
    },
});
export const breadcrumbCurrentLink = style([
    breadcrumbLinkBase,
    {
        color: colors.foreground.primary,
        cursor: 'default',
        fontWeight: tokens.fontWeight.medium,
        ':hover': {
            color: colors.foreground.primary,
            backgroundColor: 'transparent',
            transform: 'none',
        },
        ':focus-visible': {
            color: colors.foreground.primary,
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
        ':active': {
            transform: 'none',
        },
    },
]);
export const breadcrumbLinkSizeVariants = styleVariants({
    small: {
        padding: `${tokens.space[0]} ${tokens.space[1]}`,
        fontSize: tokens.fontSize.xs,
        lineHeight: tokens.lineHeight.normal,
        maxWidth: '150px',
        '@media': {
            '(max-width: 768px)': {
                maxWidth: '100px',
            },
        },
    },
    medium: {
        padding: `${tokens.space[1]} ${tokens.space[2]}`,
        fontSize: tokens.fontSize.sm,
        lineHeight: tokens.lineHeight.normal,
        maxWidth: '200px',
        '@media': {
            '(max-width: 768px)': {
                maxWidth: '120px',
            },
        },
    },
    large: {
        padding: `${tokens.space[2]} ${tokens.space[3]}`,
        fontSize: tokens.fontSize.base,
        lineHeight: tokens.lineHeight.normal,
        maxWidth: '250px',
        '@media': {
            '(max-width: 768px)': {
                maxWidth: '150px',
            },
        },
    },
});
export const breadcrumbSeparator = style({
    display: 'inline-flex',
    alignItems: 'center',
    color: colors.foreground.tertiary,
    flexShrink: 0,
    userSelect: 'none',
    fontSize: '0.875rem',
});
export const breadcrumbSeparatorSizeVariants = styleVariants({
    small: {
        fontSize: '0.75rem',
    },
    medium: {
        fontSize: '0.875rem',
    },
    large: {
        fontSize: '1rem',
    },
});
export const breadcrumbVariants = styleVariants({
    default: {},
    subtle: {
        backgroundColor: colors.background.secondary,
        borderRadius: tokens.radius.md,
        padding: tokens.space[2],
    },
});
export const breadcrumbSeparatorSubtle = style({
    color: colors.foreground.secondary,
});
export const breadcrumbLinkSubtle = style({
    ':hover': {
        backgroundColor: colors.background.tertiary,
    },
});
export const breadcrumbIcon = style({
    flexShrink: 0,
    display: 'inline-flex',
    alignItems: 'center',
});
export const breadcrumbEllipsis = style([
    breadcrumbLinkBase,
    {
        cursor: 'pointer',
        fontWeight: tokens.fontWeight.medium,
        minWidth: 'auto',
        padding: `${tokens.space[1]} ${tokens.space[2]}`,
        ':hover': {
            color: colors.foreground.primary,
            backgroundColor: colors.background.secondary,
        },
        ':focus-visible': {
            boxShadow: `0 0 0 2px ${colors.border.focus}`,
        },
    },
]);
export const breadcrumbDropdown = style({
    position: 'absolute',
    top: '100%',
    left: 0,
    minWidth: '200px',
    maxWidth: '300px',
    backgroundColor: colors.background.primary,
    border: `1px solid ${colors.border.secondary}`,
    borderRadius: tokens.radius.md,
    boxShadow: shadows.medium,
    padding: tokens.space[2],
    zIndex: 50,
    marginTop: tokens.space[1],
});
export const breadcrumbResponsive = style({
    '@media': {
        '(max-width: 640px)': {
            fontSize: tokens.fontSize.xs,
            flexWrap: 'wrap',
            gap: tokens.space[1],
        },
    },
});
