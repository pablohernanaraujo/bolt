import { styleVariants } from '@vanilla-extract/css';
import { tokens } from './tokens.css';
export const margin = {
    top: styleVariants(tokens.space, (space) => ({
        marginTop: space,
    })),
    right: styleVariants(tokens.space, (space) => ({
        marginRight: space,
    })),
    bottom: styleVariants(tokens.space, (space) => ({
        marginBottom: space,
    })),
    left: styleVariants(tokens.space, (space) => ({
        marginLeft: space,
    })),
    x: styleVariants(tokens.space, (space) => ({
        marginLeft: space,
        marginRight: space,
    })),
    y: styleVariants(tokens.space, (space) => ({
        marginTop: space,
        marginBottom: space,
    })),
    all: styleVariants(tokens.space, (space) => ({
        margin: space,
    })),
};
export const padding = {
    top: styleVariants(tokens.space, (space) => ({
        paddingTop: space,
    })),
    right: styleVariants(tokens.space, (space) => ({
        paddingRight: space,
    })),
    bottom: styleVariants(tokens.space, (space) => ({
        paddingBottom: space,
    })),
    left: styleVariants(tokens.space, (space) => ({
        paddingLeft: space,
    })),
    x: styleVariants(tokens.space, (space) => ({
        paddingLeft: space,
        paddingRight: space,
    })),
    y: styleVariants(tokens.space, (space) => ({
        paddingTop: space,
        paddingBottom: space,
    })),
    all: styleVariants(tokens.space, (space) => ({
        padding: space,
    })),
};
export const gap = styleVariants(tokens.space, (space) => ({
    gap: space,
}));
