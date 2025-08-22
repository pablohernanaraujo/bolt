import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { Switch } from 'react-aria-components';
import { buildContainerClassName, buildTrackClassName, buildThumbClassName, buildLabelClassName } from './helpers.js';

const Toggle = forwardRef(({ variant = 'primary', size = 'medium', labelPosition = 'right', className, children, ...props }, ref) => {
    const renderSwitch = (renderProps) => (jsxs(Fragment, { children: [jsx("div", { className: buildTrackClassName(size, variant, renderProps.isSelected), "data-focused": renderProps.isFocused || undefined, "data-disabled": renderProps.isDisabled || undefined, children: jsx("div", { className: buildThumbClassName(size, renderProps.isSelected) }) }), children && typeof children !== 'function' && (jsx("span", { className: buildLabelClassName(size), children: children }))] }));
    const containerClassName = typeof className === 'string' || className === undefined
        ? buildContainerClassName(labelPosition, className)
        : className;
    return (jsx(Switch, { ref: ref, className: containerClassName, ...props, children: renderSwitch }));
});
Toggle.displayName = 'Toggle';

export { Toggle };
//# sourceMappingURL=toggle.js.map
