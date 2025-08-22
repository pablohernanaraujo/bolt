import { jsx } from 'react/jsx-runtime';
import { useContext } from 'react';
import { pinInputGroupRecipe, pinInputSeparator } from './pin-input.css.js';
import { PinInputContext } from './pin-input-context.js';

const PinInputGroup = ({ children, className, }) => {
    const context = useContext(PinInputContext);
    if (!context) {
        throw new Error('PinInputGroup must be used within a PinInput component');
    }
    const { size } = context;
    const groupClassName = pinInputGroupRecipe({ size });
    const combinedClassName = className
        ? `${groupClassName} ${className}`
        : groupClassName;
    return (jsx("div", { className: combinedClassName, role: "group", children: children }));
};
PinInputGroup.displayName = 'PinInputGroup';
const PinInputSeparator = ({ children = '-', className, }) => {
    const combinedClassName = className
        ? `${pinInputSeparator} ${className}`
        : pinInputSeparator;
    return (jsx("div", { className: combinedClassName, "aria-hidden": "true", children: children }));
};
PinInputSeparator.displayName = 'PinInputSeparator';

export { PinInputGroup, PinInputSeparator };
//# sourceMappingURL=pin-input-group.js.map
