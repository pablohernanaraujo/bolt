import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '../../../tokens/typography-helpers.js';
import { subtitle } from './subtitle.css.js';

const Subtitle = forwardRef(({ as: Component = 'p', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (jsx(Component, { ref: ref, className: buildCompleteTypographyClass(subtitle, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className), ...props })));
Subtitle.displayName = 'Subtitle';

export { Subtitle };
//# sourceMappingURL=subtitle.js.map
