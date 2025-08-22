import { jsx, jsxs } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { Radio as Radio$1 } from 'react-aria-components';
import { buildRadioClassName, buildRadioDotClassName, buildRadioLabelClassName } from './helpers.js';

const Radio = forwardRef(({ variant = 'primary', size = 'medium', className, children, value, ...props }, ref) => {
    const renderRadio = (renderProps) => (jsxs("div", { style: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: renderProps.isDisabled ? 'not-allowed' : 'pointer',
        }, children: [jsx("div", { className: buildRadioClassName(size, variant, renderProps.isSelected), "data-focused": renderProps.isFocused || undefined, "data-disabled": renderProps.isDisabled || undefined, "data-selected": renderProps.isSelected || undefined, children: jsx("div", { className: buildRadioDotClassName(size, variant) }) }), children && typeof children !== 'function' && (jsx("span", { className: buildRadioLabelClassName(size), children: children }))] }));
    return (jsx(Radio$1, { ref: ref, value: value, className: typeof className === 'string' ? className : undefined, ...props, children: renderRadio }));
});
Radio.displayName = 'Radio';

export { Radio };
//# sourceMappingURL=radio.js.map
