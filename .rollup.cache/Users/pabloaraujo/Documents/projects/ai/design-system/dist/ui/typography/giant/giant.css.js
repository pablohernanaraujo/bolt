import { style } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { specialized } from '@/tokens/typography.css';
export const giant = style([
    specialized.giant,
    {
        margin: 0,
        color: colors.foreground.primary,
        fontFamily: tokens.fonts.heading,
    },
]);
