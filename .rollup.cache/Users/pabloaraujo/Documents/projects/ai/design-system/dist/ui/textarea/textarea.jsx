'use client';
import { forwardRef } from 'react';
import { TextArea as AriaTextArea } from 'react-aria-components';
import { buildTextAreaClassName, getTextAreaRows, isTextAreaInvalid, } from './helpers';
export const TextArea = forwardRef(({ variant = 'outline', size = 'medium', hasError = false, resize = 'vertical', rows, maxRows, className, placeholder, isDisabled, isInvalid, ...props }, ref) => {
    const textareaIsInvalid = isTextAreaInvalid(hasError, isInvalid);
    const textareaRows = getTextAreaRows(size, rows);
    return (<AriaTextArea ref={ref} rows={textareaRows} placeholder={placeholder} disabled={isDisabled} className={(renderProps) => {
            return typeof className === 'function'
                ? buildTextAreaClassName(variant, size, resize, className, {
                    ...renderProps,
                    defaultClassName: renderProps.defaultClassName || '',
                })
                : buildTextAreaClassName(variant, size, resize, className);
        }} data-invalid={textareaIsInvalid || undefined} data-disabled={isDisabled || undefined} style={{
            maxHeight: maxRows && resize !== 'none' ? `${maxRows * 1.5}em` : undefined,
        }} {...props}/>);
});
TextArea.displayName = 'TextArea';
