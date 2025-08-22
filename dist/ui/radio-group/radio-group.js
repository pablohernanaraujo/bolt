import { jsxs, jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { RadioGroup as RadioGroup$1, Label } from 'react-aria-components';
import { buildRadioGroupClassName, buildGroupLabelClassName } from './helpers.js';

const RadioGroup = forwardRef(({ variant = 'primary', size = 'medium', orientation = 'vertical', className, children, label, ...props }, ref) => {
    const radioGroupClassName = buildRadioGroupClassName(orientation, typeof className === 'string' ? className : undefined);
    return (jsxs(RadioGroup$1, { ref: ref, className: radioGroupClassName, "data-variant": variant, "data-size": size, "data-orientation": orientation, ...props, children: [label && (jsx(Label, { className: buildGroupLabelClassName(size), children: label })), jsx("div", { style: {
                    display: 'flex',
                    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
                    gap: orientation === 'horizontal' ? '1rem' : '0.75rem',
                    flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
                }, children: typeof children === 'function' ? children({}) : children })] }));
});
RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
//# sourceMappingURL=radio-group.js.map
