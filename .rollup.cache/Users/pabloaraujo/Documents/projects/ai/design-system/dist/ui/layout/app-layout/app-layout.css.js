import { style } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const appLayout = style({
    minHeight: '100vh',
    backgroundColor: colors.background.primary,
    color: colors.foreground.primary,
    fontFamily: tokens.fonts.body,
});
export const appContent = style({
    backgroundColor: colors.background.primary,
    color: colors.foreground.primary,
});
