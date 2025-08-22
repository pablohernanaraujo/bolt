import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';
import { h3 } from './h3.css';
export const H3 = forwardRef(({ as: Component = 'h3', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (<Component ref={ref} className={buildCompleteTypographyClass(h3, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className)} {...props}/>));
H3.displayName = 'H3';
