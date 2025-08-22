import { style } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { body } from '@/tokens/typography.css';
export const body1 = style([
    body.large,
    {
        margin: 0,
        color: colors.foreground.primary,
        fontFamily: tokens.fonts.body,
    },
]);
