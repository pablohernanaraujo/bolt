import { style } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const formField = style({
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space[2],
    width: '100%',
});
export const label = style({
    display: 'flex',
    alignItems: 'center',
    gap: tokens.space[1],
    fontFamily: tokens.fonts.body,
    fontSize: tokens.fontSize.sm,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: tokens.lineHeight.tight,
    color: colors.foreground.primary,
    cursor: 'pointer',
    selectors: {
        '&[data-disabled]': {
            color: colors.foreground.tertiary,
            cursor: 'not-allowed',
        },
    },
});
export const requiredIndicator = style({
    color: colors.semantic.error,
    fontSize: tokens.fontSize.sm,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: '1',
});
export const helpText = style({
    fontSize: tokens.fontSize.xs,
    lineHeight: tokens.lineHeight.tight,
    fontFamily: tokens.fonts.body,
    margin: 0,
});
export const hint = style([
    helpText,
    {
        color: colors.foreground.secondary,
    },
]);
export const error = style([
    helpText,
    {
        color: colors.semantic.error,
        fontWeight: tokens.fontWeight.medium,
    },
]);
