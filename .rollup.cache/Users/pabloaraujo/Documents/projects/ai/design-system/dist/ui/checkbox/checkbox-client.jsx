'use client';
import { Check } from 'lucide-react';
import { forwardRef } from 'react';
import { Checkbox as AriaCheckbox } from 'react-aria-components';
import { Icon } from '@/icons';
import { buildCheckboxClassName, buildCheckmarkClassName, buildContainerClassName, buildLabelClassName, } from './helpers';
export const CheckboxClient = forwardRef(({ variant = 'primary', size = 'medium', labelPosition = 'right', className, children, ...props }, ref) => {
    const renderCheckbox = (renderProps) => {
        const { isSelected } = renderProps;
        const resolvedClassName = typeof className === 'function'
            ? className({
                ...renderProps,
                defaultClassName: undefined,
            })
            : className;
        const containerClassName = buildContainerClassName(labelPosition, resolvedClassName);
        const checkboxClassName = buildCheckboxClassName(size, variant, isSelected);
        const checkmarkClassName = buildCheckmarkClassName(size);
        const labelClassName = buildLabelClassName(size);
        return (<div className={containerClassName}>
          
          <div className={checkboxClassName}>
            
            {isSelected && (<Icon icon={Check} className={checkmarkClassName} aria-hidden="true"/>)}
          </div>

          
          {children && (<span className={labelClassName}>
              {typeof children === 'function'
                    ? children({
                        ...renderProps,
                        defaultChildren: undefined,
                    })
                    : children}
            </span>)}
        </div>);
    };
    return (<AriaCheckbox ref={ref} {...props}>
        {renderCheckbox}
      </AriaCheckbox>);
});
CheckboxClient.displayName = 'CheckboxClient';
