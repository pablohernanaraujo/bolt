import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '../../../tokens/typography-helpers.js';
import { body2 } from './body2.css.js';

const Body2 = forwardRef(({ as: Component = 'p', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (jsx(Component, { ref: ref, className: buildCompleteTypographyClass(body2, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className), ...props })));
Body2.displayName = 'Body2';

export { Body2 };
//# sourceMappingURL=body2.js.map
