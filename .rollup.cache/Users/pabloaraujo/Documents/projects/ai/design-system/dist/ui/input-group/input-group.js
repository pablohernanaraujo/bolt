import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { analyzeChildren, buildInputGroupClassName } from './helpers';
import { InputGroupContext } from './input-group-context';
export const InputGroup = ({ children, size = 'medium', variant = 'outline', isDisabled = false, hasError = false, className, ...props }) => {
    const childAnalysis = useMemo(() => analyzeChildren(children), [children]);
    const contextValue = useMemo(() => ({
        size,
        variant,
        isDisabled,
        hasError,
        ...childAnalysis,
    }), [size, variant, isDisabled, hasError, childAnalysis]);
    const groupClassName = buildInputGroupClassName(variant, size, hasError, isDisabled, className);
    return (_jsx(InputGroupContext.Provider, { value: contextValue, children: _jsx("div", { className: groupClassName, "data-disabled": isDisabled || undefined, "data-error": hasError || undefined, ...props, children: children }) }));
};
InputGroup.displayName = 'InputGroup';
