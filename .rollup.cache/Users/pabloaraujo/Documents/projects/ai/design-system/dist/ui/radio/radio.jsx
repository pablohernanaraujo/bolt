'use client';
import { forwardRef } from 'react';
import { Radio as AriaRadio } from 'react-aria-components';
import { buildRadioClassName, buildRadioDotClassName, buildRadioLabelClassName, } from './helpers';
export const Radio = forwardRef(({ variant = 'primary', size = 'medium', className, children, value, ...props }, ref) => {
    const renderRadio = (renderProps) => (<div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: renderProps.isDisabled ? 'not-allowed' : 'pointer',
        }}>
        
        <div className={buildRadioClassName(size, variant, renderProps.isSelected)} data-focused={renderProps.isFocused || undefined} data-disabled={renderProps.isDisabled || undefined} data-selected={renderProps.isSelected || undefined}>
          
          <div className={buildRadioDotClassName(size, variant)}/>
        </div>

        
        {children && typeof children !== 'function' && (<span className={buildRadioLabelClassName(size)}>{children}</span>)}
      </div>);
    return (<AriaRadio ref={ref} value={value} className={typeof className === 'string' ? className : undefined} {...props}>
        {renderRadio}
      </AriaRadio>);
});
Radio.displayName = 'Radio';
