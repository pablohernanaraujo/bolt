import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { TextArea as TextArea$1 } from 'react-aria-components';
import { isTextAreaInvalid, getTextAreaRows, buildTextAreaClassName } from './helpers.js';

const TextArea = forwardRef(({ variant = 'outline', size = 'medium', hasError = false, resize = 'vertical', rows, maxRows, className, placeholder, isDisabled, isInvalid, ...props }, ref) => {
    const textareaIsInvalid = isTextAreaInvalid(hasError, isInvalid);
    const textareaRows = getTextAreaRows(size, rows);
    return (jsx(TextArea$1, { ref: ref, rows: textareaRows, placeholder: placeholder, disabled: isDisabled, className: (renderProps) => {
            return typeof className === 'function'
                ? buildTextAreaClassName(variant, size, resize, className, {
                    ...renderProps,
                    defaultClassName: renderProps.defaultClassName || '',
                })
                : buildTextAreaClassName(variant, size, resize, className);
        }, "data-invalid": textareaIsInvalid || undefined, "data-disabled": isDisabled || undefined, style: {
            maxHeight: maxRows && resize !== 'none' ? `${maxRows * 1.5}em` : undefined,
        }, ...props }));
});
TextArea.displayName = 'TextArea';

export { TextArea };
//# sourceMappingURL=textarea.js.map
