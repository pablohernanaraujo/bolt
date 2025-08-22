import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@/tokens/tokens.css';
export const flexBase = style({
    display: 'flex',
});
export const flexDirection = styleVariants({
    row: {
        flexDirection: 'row',
    },
    column: {
        flexDirection: 'column',
    },
    'row-reverse': {
        flexDirection: 'row-reverse',
    },
    'column-reverse': {
        flexDirection: 'column-reverse',
    },
});
export const flexWrap = styleVariants({
    nowrap: {
        flexWrap: 'nowrap',
    },
    wrap: {
        flexWrap: 'wrap',
    },
    'wrap-reverse': {
        flexWrap: 'wrap-reverse',
    },
});
export const alignItems = styleVariants({
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
export const justifyContent = styleVariants({
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
export const flexGap = styleVariants({
    '0': {
        gap: tokens.space[0],
    },
    '1': {
        gap: tokens.space[1],
    },
    '2': {
        gap: tokens.space[2],
    },
    '3': {
        gap: tokens.space[3],
    },
    '4': {
        gap: tokens.space[4],
    },
    '5': {
        gap: tokens.space[5],
    },
    '6': {
        gap: tokens.space[6],
    },
    '8': {
        gap: tokens.space[8],
    },
    '10': {
        gap: tokens.space[10],
    },
    '12': {
        gap: tokens.space[12],
    },
    '16': {
        gap: tokens.space[16],
    },
    '20': {
        gap: tokens.space[20],
    },
    '24': {
        gap: tokens.space[24],
    },
});
