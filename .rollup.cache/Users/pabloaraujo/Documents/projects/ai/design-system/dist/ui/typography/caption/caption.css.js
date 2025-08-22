import { style } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { specialized } from '@/tokens/typography.css';
export const caption = style([
    specialized.caption,
    {
        margin: 0,
        color: colors.foreground.tertiary,
        fontFamily: tokens.fonts.body,
    },
]);
