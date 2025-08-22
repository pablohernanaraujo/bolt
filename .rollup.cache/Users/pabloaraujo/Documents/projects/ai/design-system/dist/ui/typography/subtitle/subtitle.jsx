import { forwardRef } from 'react';
import { buildCompleteTypographyClass } from '@/tokens/typography-helpers';
import { subtitle } from './subtitle.css';
export const Subtitle = forwardRef(({ as: Component = 'p', className, emphasis = 'high', bold = false, isTruncated = false, italic = false, underline = false, strikeThrough = false, highlight = false, ...props }, ref) => (<Component ref={ref} className={buildCompleteTypographyClass(subtitle, emphasis, {
        bold,
        isTruncated,
        italic,
        underline,
        strikeThrough,
        highlight,
    }, className)} {...props}/>));
Subtitle.displayName = 'Subtitle';
