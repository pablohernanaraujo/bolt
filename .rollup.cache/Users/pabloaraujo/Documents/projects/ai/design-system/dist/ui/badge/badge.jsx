import { forwardRef } from 'react';
import { buildBadgeClassName } from './helpers';
export const Badge = forwardRef(({ variant = 'subtle', colorScheme = 'default', size = 'medium', className, children, ...props }, ref) => (<span ref={ref} className={buildBadgeClassName(variant, colorScheme, size, className)} {...props}>
      {children}
    </span>));
Badge.displayName = 'Badge';
