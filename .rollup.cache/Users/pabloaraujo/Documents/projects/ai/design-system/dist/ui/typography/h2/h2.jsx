import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';
import { h2 } from './h2.css';
export const H2 = forwardRef(({ as: Component = 'h2', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (<Component ref={ref} className={buildCompleteTypographyClass(h2, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className)} {...props}/>));
H2.displayName = 'H2';
