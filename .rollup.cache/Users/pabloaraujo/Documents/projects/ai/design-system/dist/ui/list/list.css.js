import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@/tokens/tokens.css';
export const listRoot = style({
    margin: 0,
    padding: 0,
    width: '100%',
});
export const variants = styleVariants({
    unordered: {
        listStyle: 'disc',
        paddingLeft: tokens.space['6'],
    },
    ordered: {
        listStyle: 'decimal',
        paddingLeft: tokens.space['6'],
    },
    basic: {
        listStyle: 'none',
        paddingLeft: 0,
    },
});
export const spacing = styleVariants({
    sm: {},
    md: {},
    lg: {},
});
globalStyle(`${spacing.sm} > li`, {
    marginBottom: tokens.space['2'],
});
globalStyle(`${spacing.sm} > li:last-child`, {
    marginBottom: 0,
});
globalStyle(`${spacing.md} > li`, {
    marginBottom: tokens.space['3'],
});
globalStyle(`${spacing.md} > li:last-child`, {
    marginBottom: 0,
});
globalStyle(`${spacing.lg} > li`, {
    marginBottom: tokens.space['4'],
});
globalStyle(`${spacing.lg} > li:last-child`, {
    marginBottom: 0,
});
export const listItem = style({
    fontSize: tokens.fontSize.base,
    lineHeight: tokens.lineHeight.normal,
    color: 'var(--colors-text-primary)',
    '::marker': {
        color: 'var(--colors-text-secondary)',
    },
});
export const listItemWithIcon = style({
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.space['2'],
    paddingLeft: 0,
    position: 'relative',
    listStyle: 'none',
    '::marker': {
        content: 'none',
    },
});
export const listItemIcon = style({
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--colors-text-secondary)',
    marginTop: tokens.space['1'],
});
export const listItemContent = style({
    flex: 1,
    minWidth: 0,
});
export const emphasis = styleVariants({
    high: {
        opacity: tokens.emphasis.high,
    },
    medium: {
        opacity: tokens.emphasis.medium,
    },
    low: {
        opacity: tokens.emphasis.low,
    },
    pure: {
        opacity: tokens.emphasis.pure,
    },
});
export const weight = styleVariants({
    normal: {
        fontWeight: tokens.fontWeight.normal,
    },
    medium: {
        fontWeight: tokens.fontWeight.medium,
    },
    semibold: {
        fontWeight: tokens.fontWeight.semibold,
    },
    bold: {
        fontWeight: tokens.fontWeight.bold,
    },
});
export const decoration = styleVariants({
    italic: {
        fontStyle: 'italic',
    },
    underline: {
        textDecoration: 'underline',
    },
    'line-through': {
        textDecoration: 'line-through',
    },
});
export const size = styleVariants({
    xs: {
        fontSize: tokens.fontSize.xs,
    },
    sm: {
        fontSize: tokens.fontSize.sm,
    },
    base: {
        fontSize: tokens.fontSize.base,
    },
    lg: {
        fontSize: tokens.fontSize.lg,
    },
    xl: {
        fontSize: tokens.fontSize.xl,
    },
});
export const colorScheme = styleVariants({
    default: {
        color: 'var(--colors-text-primary)',
    },
    brand: {
        color: 'var(--colors-accent-brand)',
    },
    success: {
        color: 'var(--colors-accent-success)',
    },
    warning: {
        color: 'var(--colors-accent-warning)',
    },
    error: {
        color: 'var(--colors-accent-error)',
    },
    info: {
        color: 'var(--colors-accent-info)',
    },
});
