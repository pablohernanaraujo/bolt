import { style } from '@vanilla-extract/css';
import { colors } from '@/tokens/contracts.css';
import { tokens } from '@/tokens/tokens.css';
export const appHeader = style({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderBottom: `1px solid ${colors.border.primary}`,
    position: 'sticky',
    top: 0,
    zIndex: tokens.zIndex.sticky,
});
