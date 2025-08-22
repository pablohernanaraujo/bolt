import { jsx as _jsx } from "react/jsx-runtime";
import { buildElementClassName } from './helpers';
import { useInputGroup } from './input-group-context';
export const InputLeftElement = ({ children, isDisabled: ownDisabled, isInteractive = false, className, ...props }) => {
    const context = useInputGroup();
    const size = context?.size ?? 'medium';
    const isDisabled = ownDisabled ?? context?.isDisabled ?? false;
    const elementClassName = buildElementClassName('left', size, isInteractive, isDisabled, className);
    return (_jsx("div", { className: elementClassName, "data-disabled": isDisabled || undefined, ...props, children: children }));
};
InputLeftElement.displayName = 'InputLeftElement';
export const InputRightElement = ({ children, isDisabled: ownDisabled, isInteractive = false, className, ...props }) => {
    const context = useInputGroup();
    const size = context?.size ?? 'medium';
    const isDisabled = ownDisabled ?? context?.isDisabled ?? false;
    const elementClassName = buildElementClassName('right', size, isInteractive, isDisabled, className);
    return (_jsx("div", { className: elementClassName, "data-disabled": isDisabled || undefined, ...props, children: children }));
};
InputRightElement.displayName = 'InputRightElement';
