import { styleVariants } from '@vanilla-extract/css';
import { tokens } from './tokens.css';
export const radius = styleVariants(tokens.radius, (radius) => ({
    borderRadius: radius,
}));
export const radiusTop = styleVariants(tokens.radius, (radius) => ({
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
}));
export const radiusBottom = styleVariants(tokens.radius, (radius) => ({
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
}));
export const radiusLeft = styleVariants(tokens.radius, (radius) => ({
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
}));
export const radiusRight = styleVariants(tokens.radius, (radius) => ({
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
}));
