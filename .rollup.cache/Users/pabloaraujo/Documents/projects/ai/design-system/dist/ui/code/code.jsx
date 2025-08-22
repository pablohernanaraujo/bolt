import { forwardRef } from 'react';
import { buildCodeClassName } from './helpers';
export const Code = forwardRef(({ children, className, ...props }, ref) => {
    const codeClassName = buildCodeClassName(className);
    return (<code ref={ref} className={codeClassName} {...props}>
        {children}
      </code>);
});
Code.displayName = 'Code';
