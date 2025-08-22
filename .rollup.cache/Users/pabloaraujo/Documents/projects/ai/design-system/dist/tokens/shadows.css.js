import { style } from '@vanilla-extract/css';
import { shadows } from './contracts.css';
export const elevation = {
    small: style({
        boxShadow: shadows.small,
    }),
    medium: style({
        boxShadow: shadows.medium,
    }),
    large: style({
        boxShadow: shadows.large,
    }),
    focus: style({
        boxShadow: shadows.focus,
    }),
};
