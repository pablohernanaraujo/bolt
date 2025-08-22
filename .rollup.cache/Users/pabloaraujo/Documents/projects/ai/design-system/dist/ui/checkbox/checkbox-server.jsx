import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { Icon } from '@/icons';
import { buildCheckboxClassName, buildCheckmarkClassName, buildContainerClassName, buildLabelClassName, } from './helpers';
export const CheckboxServer = forwardRef(({ variant = 'primary', size = 'medium', labelPosition = 'right', className, children, checked, defaultChecked, ...props }, ref) => {
    const containerClassName = buildContainerClassName(labelPosition, className);
    const checkboxClassName = buildCheckboxClassName(size, variant, checked || defaultChecked || false);
    const checkmarkClassName = buildCheckmarkClassName(size);
    const labelClassName = buildLabelClassName(size);
    return (<label ref={ref} className={containerClassName}>
        
        <input type="checkbox" className={checkboxClassName} checked={checked} defaultChecked={defaultChecked} {...props}/>

        
        <div className="checkbox-visual">
          <Icon icon={Check} className={checkmarkClassName} aria-hidden="true"/>
        </div>

        
        {children && <span className={labelClassName}>{children}</span>}
      </label>);
});
CheckboxServer.displayName = 'CheckboxServer';
