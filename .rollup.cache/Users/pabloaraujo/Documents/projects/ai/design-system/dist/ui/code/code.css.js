import { style } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const code = style({
    fontFamily: tokens.fonts.mono,
    fontSize: tokens.fontSize.sm,
    fontWeight: tokens.fontWeight.medium,
    color: colors.foreground.primary,
    backgroundColor: colors.background.tertiary,
    display: 'inline',
    padding: `${tokens.space[1]} ${tokens.space[2]}`,
    borderRadius: tokens.radius.sm,
    userSelect: 'text',
    lineHeight: tokens.lineHeight.normal,
    border: `1px solid ${colors.border.secondary}`,
    wordBreak: 'break-word',
    whiteSpace: 'pre-wrap',
});
