import { useContext } from 'react';
import { pinInputGroupRecipe, pinInputSeparator } from './pin-input.css';
import { PinInputContext } from './pin-input-context';
export const PinInputGroup = ({ children, className, }) => {
    const context = useContext(PinInputContext);
    if (!context) {
        throw new Error('PinInputGroup must be used within a PinInput component');
    }
    const { size } = context;
    const groupClassName = pinInputGroupRecipe({ size });
    const combinedClassName = className
        ? `${groupClassName} ${className}`
        : groupClassName;
    return (<div className={combinedClassName} role="group">
      {children}
    </div>);
};
PinInputGroup.displayName = 'PinInputGroup';
export const PinInputSeparator = ({ children = '-', className, }) => {
    const combinedClassName = className
        ? `${pinInputSeparator} ${className}`
        : pinInputSeparator;
    return (<div className={combinedClassName} aria-hidden="true">
      {children}
    </div>);
};
PinInputSeparator.displayName = 'PinInputSeparator';
