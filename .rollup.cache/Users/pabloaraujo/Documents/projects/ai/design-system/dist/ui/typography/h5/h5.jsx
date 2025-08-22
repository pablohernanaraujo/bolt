import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';
import { h5 } from './h5.css';
export const H5 = forwardRef(({ as: Component = 'h5', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (<Component ref={ref} className={buildCompleteTypographyClass(h5, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className)} {...props}/>));
H5.displayName = 'H5';
