import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';
import { caption } from './caption.css';
export const Caption = forwardRef(({ as: Component = 'span', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (_jsx(Component, { ref: ref, className: buildCompleteTypographyClass(caption, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className), ...props })));
Caption.displayName = 'Caption';
