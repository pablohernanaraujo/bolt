import { jsx } from 'react/jsx-runtime';
import { buildElementClassName } from './helpers.js';
import { useInputGroup } from './input-group-context.js';

const InputLeftElement = ({ children, isDisabled: ownDisabled, isInteractive = false, className, ...props }) => {
    const context = useInputGroup();
    const size = context?.size ?? 'medium';
    const isDisabled = ownDisabled ?? context?.isDisabled ?? false;
    const elementClassName = buildElementClassName('left', size, isInteractive, isDisabled, className);
    return (jsx("div", { className: elementClassName, "data-disabled": isDisabled || undefined, ...props, children: children }));
};
InputLeftElement.displayName = 'InputLeftElement';
const InputRightElement = ({ children, isDisabled: ownDisabled, isInteractive = false, className, ...props }) => {
    const context = useInputGroup();
    const size = context?.size ?? 'medium';
    const isDisabled = ownDisabled ?? context?.isDisabled ?? false;
    const elementClassName = buildElementClassName('right', size, isInteractive, isDisabled, className);
    return (jsx("div", { className: elementClassName, "data-disabled": isDisabled || undefined, ...props, children: children }));
};
InputRightElement.displayName = 'InputRightElement';

export { InputLeftElement, InputRightElement };
//# sourceMappingURL=input-elements.js.map
