'use client';
import { forwardRef } from 'react';
import { RadioGroup as AriaRadioGroup, Label } from 'react-aria-components';
import { buildGroupLabelClassName, buildRadioGroupClassName } from './helpers';
export const RadioGroup = forwardRef(({ variant = 'primary', size = 'medium', orientation = 'vertical', className, children, label, ...props }, ref) => {
    const radioGroupClassName = buildRadioGroupClassName(orientation, typeof className === 'string' ? className : undefined);
    return (<AriaRadioGroup ref={ref} className={radioGroupClassName} data-variant={variant} data-size={size} data-orientation={orientation} {...props}>
        
        {label && (<Label className={buildGroupLabelClassName(size)}>{label}</Label>)}

        
        <div style={{
            display: 'flex',
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            gap: orientation === 'horizontal' ? '1rem' : '0.75rem',
            flexWrap: orientation === 'horizontal' ? 'wrap' : 'nowrap',
        }}>
          {typeof children === 'function' ? children({}) : children}
        </div>
      </AriaRadioGroup>);
});
RadioGroup.displayName = 'RadioGroup';
