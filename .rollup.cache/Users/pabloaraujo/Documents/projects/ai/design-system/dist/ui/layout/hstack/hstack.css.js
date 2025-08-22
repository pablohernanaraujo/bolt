import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@/tokens/tokens.css';
export const hstack = style({
    display: 'flex',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    width: '100%',
    boxSizing: 'border-box',
});
export const space = styleVariants(tokens.space, (spaceValue) => ({
    gap: spaceValue,
}));
export const align = styleVariants({
    start: {
        alignItems: 'flex-start',
    },
    center: {
        alignItems: 'center',
    },
    end: {
        alignItems: 'flex-end',
    },
    stretch: {
        alignItems: 'stretch',
    },
    baseline: {
        alignItems: 'baseline',
    },
});
export const justify = styleVariants({
    start: {
        justifyContent: 'flex-start',
    },
    center: {
        justifyContent: 'center',
    },
    end: {
        justifyContent: 'flex-end',
    },
    between: {
        justifyContent: 'space-between',
    },
    around: {
        justifyContent: 'space-around',
    },
    evenly: {
        justifyContent: 'space-evenly',
    },
});
export const wrap = style({
    flexWrap: 'wrap',
});
export const reversed = style({
    flexDirection: 'row-reverse',
});
