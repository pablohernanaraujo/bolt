import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';
import { h4 } from './h4.css';
export const H4 = forwardRef(({ as: Component = 'h4', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (<Component ref={ref} className={buildCompleteTypographyClass(h4, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className)} {...props}/>));
H4.displayName = 'H4';
