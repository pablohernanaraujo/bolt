import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '../../../tokens/typography-helpers.js';
import { h1 } from './h1.css.js';

const H1 = forwardRef(({ as: Component = 'h1', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (jsx(Component, { ref: ref, className: buildCompleteTypographyClass(h1, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className), ...props })));
H1.displayName = 'H1';

export { H1 };
//# sourceMappingURL=h1.js.map
