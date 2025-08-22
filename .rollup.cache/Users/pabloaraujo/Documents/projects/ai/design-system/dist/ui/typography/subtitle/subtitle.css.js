import { style } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { specialized } from '@/tokens/typography.css';
export const subtitle = style([
    specialized.subtitle,
    {
        margin: 0,
        color: colors.foreground.secondary,
        fontFamily: tokens.fonts.body,
    },
]);
