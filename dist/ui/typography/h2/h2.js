import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '../../../tokens/typography-helpers.js';
import { h2 } from './h2.css.js';

const H2 = forwardRef(({ as: Component = 'h2', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (jsx(Component, { ref: ref, className: buildCompleteTypographyClass(h2, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className), ...props })));
H2.displayName = 'H2';

export { H2 };
//# sourceMappingURL=h2.js.map
