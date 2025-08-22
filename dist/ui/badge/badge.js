import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { buildBadgeClassName } from './helpers.js';

const Badge = forwardRef(({ variant = 'subtle', colorScheme = 'default', size = 'medium', className, children, ...props }, ref) => (jsx("span", { ref: ref, className: buildBadgeClassName(variant, colorScheme, size, className), ...props, children: children })));
Badge.displayName = 'Badge';

export { Badge };
//# sourceMappingURL=badge.js.map
