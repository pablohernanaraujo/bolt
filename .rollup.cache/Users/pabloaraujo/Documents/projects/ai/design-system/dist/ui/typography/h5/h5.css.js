import { style } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
import { heading } from '@/tokens/typography.css';
export const h5 = style([
    heading.h5,
    {
        margin: 0,
        color: colors.foreground.primary,
        fontFamily: tokens.fonts.heading,
    },
]);
