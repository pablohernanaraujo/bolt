import { style } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const mainContent = style({
    flex: 1,
    padding: tokens.space[8],
    overflowY: 'auto',
    maxWidth: '1200px',
    width: '100%',
    backgroundColor: colors.background.primary,
    color: colors.foreground.primary,
});
