import { style } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
export const bold = style({
    fontWeight: 700,
});
export const truncated = style({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
});
export const italic = style({
    fontStyle: 'italic',
});
export const underline = style({
    textDecoration: 'underline',
    textDecorationLine: 'underline',
});
export const strikeThrough = style({
    textDecoration: 'line-through',
    textDecorationLine: 'line-through',
});
export const highlight = style({
    backgroundColor: colors.brand.primary,
    opacity: 0.15,
    paddingInline: '0.125em',
    borderRadius: '0.125em',
    display: 'inline',
});
export const underlineStrikeThrough = style({
    textDecoration: 'underline line-through',
    textDecorationLine: 'underline line-through',
});
