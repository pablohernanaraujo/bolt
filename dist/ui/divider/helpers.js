import { clsx } from 'clsx';
import { divider, orientations, verticalVariants, variants, verticalSizes, horizontalSizes, verticalSpacing, horizontalSpacing } from './divider.css.js';

const buildDividerClassName = (orientation, variant, size, spacing, className) => clsx(divider, orientations[orientation], orientation === 'vertical'
    ? verticalVariants[variant]
    : variants[variant], orientation === 'vertical'
    ? verticalSizes[size]
    : horizontalSizes[size], orientation === 'vertical'
    ? verticalSpacing[spacing]
    : horizontalSpacing[spacing], className);
const getDividerRole = (orientation) => 'separator';
const getDividerAriaOrientation = (orientation) => orientation;

export { buildDividerClassName, getDividerAriaOrientation, getDividerRole };
//# sourceMappingURL=helpers.js.map
