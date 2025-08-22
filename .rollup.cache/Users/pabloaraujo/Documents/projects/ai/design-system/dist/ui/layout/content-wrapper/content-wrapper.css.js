import { style, styleVariants } from '@vanilla-extract/css';
import { tokens } from '@/tokens/tokens.css';
export const base = style({
    width: '100%',
    boxSizing: 'border-box',
    margin: 0,
    display: 'block',
});
export const variantStyles = styleVariants({
    screen: {},
    header: {},
    body: {},
    footer: {},
});
export const paddingVariants = styleVariants({
    '0': {
        paddingLeft: tokens.space['0'],
        paddingRight: tokens.space['0'],
    },
    '1': {
        paddingLeft: tokens.space['1'],
        paddingRight: tokens.space['1'],
    },
    '2': {
        paddingLeft: tokens.space['2'],
        paddingRight: tokens.space['2'],
    },
    '3': {
        paddingLeft: tokens.space['3'],
        paddingRight: tokens.space['3'],
    },
    '4': {
        paddingLeft: tokens.space['4'],
        paddingRight: tokens.space['4'],
    },
    '5': {
        paddingLeft: tokens.space['5'],
        paddingRight: tokens.space['5'],
    },
    '6': {
        paddingLeft: tokens.space['6'],
        paddingRight: tokens.space['6'],
    },
    '8': {
        paddingLeft: tokens.space['8'],
        paddingRight: tokens.space['8'],
    },
    '10': {
        paddingLeft: tokens.space['10'],
        paddingRight: tokens.space['10'],
    },
    '12': {
        paddingLeft: tokens.space['12'],
        paddingRight: tokens.space['12'],
    },
    '16': {
        paddingLeft: tokens.space['16'],
        paddingRight: tokens.space['16'],
    },
    '20': {
        paddingLeft: tokens.space['20'],
        paddingRight: tokens.space['20'],
    },
    '24': {
        paddingLeft: tokens.space['24'],
        paddingRight: tokens.space['24'],
    },
});
