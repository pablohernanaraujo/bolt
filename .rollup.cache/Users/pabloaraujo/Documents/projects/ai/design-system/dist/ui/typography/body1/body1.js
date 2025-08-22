import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';
import { body1 } from './body1.css';
export const Body1 = forwardRef(({ as: Component = 'p', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (_jsx(Component, { ref: ref, className: buildCompleteTypographyClass(body1, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className), ...props })));
Body1.displayName = 'Body1';
