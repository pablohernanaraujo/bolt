import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { buildCodeClassName } from './helpers';
export const Code = forwardRef(({ children, className, ...props }, ref) => {
    const codeClassName = buildCodeClassName(className);
    return (_jsx("code", { ref: ref, className: codeClassName, ...props, children: children }));
});
Code.displayName = 'Code';
