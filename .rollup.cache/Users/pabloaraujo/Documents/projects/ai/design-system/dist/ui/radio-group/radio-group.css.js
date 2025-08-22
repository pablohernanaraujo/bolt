import { style, styleVariants } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const radioGroup = style({
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space[3],
});
export const radioGroupVertical = style({
    flexDirection: 'column',
    gap: tokens.space[3],
});
export const radioGroupHorizontal = style({
    flexDirection: 'row',
    gap: tokens.space[4],
    flexWrap: 'wrap',
});
export const radioGroupLabel = style({
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeight.medium,
    lineHeight: tokens.lineHeight.normal,
    color: colors.foreground.primary,
    marginBottom: tokens.space[2],
});
export const groupLabelSizes = styleVariants({
    small: {
        fontSize: tokens.fontSize.sm,
    },
    medium: {
        fontSize: tokens.fontSize.base,
    },
    large: {
        fontSize: tokens.fontSize.lg,
    },
});
