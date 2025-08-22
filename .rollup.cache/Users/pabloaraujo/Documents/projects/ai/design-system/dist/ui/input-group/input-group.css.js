import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const inputGroup = style({
    display: 'flex',
    alignItems: 'stretch',
    position: 'relative',
    width: '100%',
    isolation: 'isolate',
});
export const groupSizes = styleVariants({
    small: {
        minHeight: tokens.space[8],
    },
    medium: {
        minHeight: tokens.space[10],
    },
    large: {
        minHeight: tokens.space[12],
    },
});
export const groupVariants = styleVariants({
    outline: {},
    filled: {},
});
export const groupError = style({
    selectors: {
        '&': {},
    },
});
export const groupDisabled = style({
    cursor: 'not-allowed',
    opacity: 0.6,
});
export const addon = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeight.normal,
    lineHeight: tokens.lineHeight.normal,
    transition: tokens.transition.fast,
    whiteSpace: 'nowrap',
    userSelect: 'none',
});
export const leftAddon = style({
    borderTopLeftRadius: 'inherit',
    borderBottomLeftRadius: 'inherit',
    borderRight: 'none',
    marginRight: '-1px',
});
export const rightAddon = style({
    borderTopRightRadius: 'inherit',
    borderBottomRightRadius: 'inherit',
    borderLeft: 'none',
    marginLeft: '-1px',
});
export const addonSizes = styleVariants({
    small: {
        padding: `0 ${tokens.space[3]}`,
        fontSize: tokens.fontSize.sm,
        minHeight: tokens.space[8],
    },
    medium: {
        padding: `0 ${tokens.space[4]}`,
        fontSize: tokens.fontSize.base,
        minHeight: tokens.space[10],
    },
    large: {
        padding: `0 ${tokens.space[5]}`,
        fontSize: tokens.fontSize.lg,
        minHeight: tokens.space[12],
    },
});
export const addonVariants = styleVariants({
    outline: {
        backgroundColor: colors.background.secondary,
        border: `1px solid ${colors.border.primary}`,
        color: colors.foreground.secondary,
        selectors: {
            [`${inputGroup}:hover &`]: {
                borderColor: colors.border.secondary,
            },
            [`${inputGroup}:focus-within &`]: {
                borderColor: colors.brand.primary,
            },
            [`${groupError} &`]: {
                borderColor: colors.semantic.error,
            },
        },
    },
    filled: {
        backgroundColor: colors.background.tertiary,
        border: `1px solid transparent`,
        color: colors.foreground.secondary,
        selectors: {
            [`${inputGroup}:hover &`]: {
                backgroundColor: colors.background.tertiary,
            },
            [`${inputGroup}:focus-within &`]: {
                backgroundColor: colors.background.secondary,
                borderColor: colors.brand.primary,
            },
            [`${groupError} &`]: {
                borderColor: colors.semantic.error,
            },
        },
    },
});
export const addonDisabled = style({
    opacity: 0.5,
    cursor: 'not-allowed',
    color: colors.foreground.tertiary,
});
export const element = style({
    position: 'absolute',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 1,
    color: colors.foreground.secondary,
});
export const leftElement = style({
    left: '0',
});
export const rightElement = style({
    right: '0',
});
export const elementSizes = styleVariants({
    small: {
        width: tokens.space[8],
        fontSize: tokens.fontSize.sm,
    },
    medium: {
        width: tokens.space[10],
        fontSize: tokens.fontSize.base,
    },
    large: {
        width: tokens.space[12],
        fontSize: tokens.fontSize.lg,
    },
});
export const interactiveElement = style({
    pointerEvents: 'auto',
});
globalStyle(`${interactiveElement} button`, {
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: tokens.space[1],
    borderRadius: tokens.radius.base,
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: tokens.transition.fast,
});
globalStyle(`${interactiveElement} button:hover`, {
    backgroundColor: colors.background.secondary,
    color: colors.foreground.primary,
});
globalStyle(`${interactiveElement} button:focus-visible`, {
    outline: `2px solid ${colors.brand.primary}`,
    outlineOffset: '2px',
});
export const elementDisabled = style({
    opacity: 0.5,
    cursor: 'not-allowed',
});
globalStyle(`${elementDisabled} button`, {
    cursor: 'not-allowed',
    pointerEvents: 'none',
});
export const groupedInput = style({
    flex: 1,
    minWidth: 0,
    borderRadius: 0,
    selectors: {
        '&:first-child': {
            borderTopLeftRadius: 'inherit',
            borderBottomLeftRadius: 'inherit',
        },
        '&:last-child': {
            borderTopRightRadius: 'inherit',
            borderBottomRightRadius: 'inherit',
        },
    },
});
export const inputWithLeftAddon = style({
    borderTopLeftRadius: '0 !important',
    borderBottomLeftRadius: '0 !important',
});
export const inputWithRightAddon = style({
    borderTopRightRadius: '0 !important',
    borderBottomRightRadius: '0 !important',
});
export const inputWithLeftElement = style({});
globalStyle(`${inputWithLeftElement}`, {
    paddingLeft: tokens.space[10],
});
globalStyle(`${groupSizes.small} ${inputWithLeftElement}`, {
    paddingLeft: tokens.space[8],
});
globalStyle(`${groupSizes.large} ${inputWithLeftElement}`, {
    paddingLeft: tokens.space[12],
});
export const inputWithRightElement = style({});
globalStyle(`${inputWithRightElement}`, {
    paddingRight: tokens.space[10],
});
globalStyle(`${groupSizes.small} ${inputWithRightElement}`, {
    paddingRight: tokens.space[8],
});
globalStyle(`${groupSizes.large} ${inputWithRightElement}`, {
    paddingRight: tokens.space[12],
});
export const clearButton = style({
    background: 'none',
    border: 'none',
    padding: tokens.space[1],
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.base,
    color: colors.foreground.secondary,
    transition: tokens.transition.fast,
    selectors: {
        '&:hover': {
            backgroundColor: colors.background.secondary,
            color: colors.foreground.primary,
        },
        '&:focus-visible': {
            outline: `2px solid ${colors.brand.primary}`,
            outlineOffset: '2px',
        },
        '&:disabled': {
            cursor: 'not-allowed',
            opacity: 0.5,
        },
    },
});
