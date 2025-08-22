import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '../../../tokens/typography-helpers.js';
import { h5 } from './h5.css.js';

const H5 = forwardRef(({ as: Component = 'h5', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (jsx(Component, { ref: ref, className: buildCompleteTypographyClass(h5, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className), ...props })));
H5.displayName = 'H5';

export { H5 };
//# sourceMappingURL=h5.js.map
