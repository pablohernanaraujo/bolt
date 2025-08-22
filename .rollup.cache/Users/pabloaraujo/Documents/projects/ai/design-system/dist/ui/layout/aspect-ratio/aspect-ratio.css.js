import { globalStyle, style, styleVariants } from '@vanilla-extract/css';
export const base = style({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
});
export const container = style({
    position: 'relative',
    width: '100%',
    aspectRatio: 'var(--aspect-ratio)',
});
export const content = style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
export const presets = styleVariants({
    square: {
        aspectRatio: '1 / 1',
    },
    video: {
        aspectRatio: '16 / 9',
    },
    photo: {
        aspectRatio: '4 / 3',
    },
    classic: {
        aspectRatio: '3 / 2',
    },
    cinema: {
        aspectRatio: '21 / 9',
    },
    portrait: {
        aspectRatio: '3 / 4',
    },
    golden: {
        aspectRatio: '1.618 / 1',
    },
});
export const objectFitFill = style({});
export const objectFitContain = style({});
export const objectFitCover = style({});
export const objectFitNone = style({});
export const objectFitScaleDown = style({});
globalStyle(`${objectFitFill} > *`, {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
});
globalStyle(`${objectFitContain} > *`, {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
});
globalStyle(`${objectFitCover} > *`, {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});
globalStyle(`${objectFitNone} > *`, {
    objectFit: 'none',
});
globalStyle(`${objectFitScaleDown} > *`, {
    width: '100%',
    height: '100%',
    objectFit: 'scale-down',
});
export const objectFit = {
    fill: objectFitFill,
    contain: objectFitContain,
    cover: objectFitCover,
    none: objectFitNone,
    'scale-down': objectFitScaleDown,
};
export const fallback = style({
    '@supports': {
        'not (aspect-ratio: 1)': {
            paddingBottom: 'var(--fallback-padding)',
            height: '0',
        },
    },
});
export const responsive = style({
    '@media': {
        'screen and (max-width: 768px)': {
            maxWidth: '100%',
        },
    },
});
