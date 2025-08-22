import { jsx } from 'react/jsx-runtime';
import { useMemo } from 'react';
import { analyzeChildren, buildInputGroupClassName } from './helpers.js';
import { InputGroupContext } from './input-group-context.js';

const InputGroup = ({ children, size = 'medium', variant = 'outline', isDisabled = false, hasError = false, className, ...props }) => {
    const childAnalysis = useMemo(() => analyzeChildren(children), [children]);
    const contextValue = useMemo(() => ({
        size,
        variant,
        isDisabled,
        hasError,
        ...childAnalysis,
    }), [size, variant, isDisabled, hasError, childAnalysis]);
    const groupClassName = buildInputGroupClassName(variant, size, hasError, isDisabled, className);
    return (jsx(InputGroupContext.Provider, { value: contextValue, children: jsx("div", { className: groupClassName, "data-disabled": isDisabled || undefined, "data-error": hasError || undefined, ...props, children: children }) }));
};
InputGroup.displayName = 'InputGroup';

export { InputGroup };
//# sourceMappingURL=input-group.js.map
