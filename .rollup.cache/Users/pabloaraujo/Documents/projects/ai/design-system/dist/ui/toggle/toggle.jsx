'use client';
import { forwardRef } from 'react';
import { Switch as AriaSwitch } from 'react-aria-components';
import { buildContainerClassName, buildLabelClassName, buildThumbClassName, buildTrackClassName, } from './helpers';
export const Toggle = forwardRef(({ variant = 'primary', size = 'medium', labelPosition = 'right', className, children, ...props }, ref) => {
    const renderSwitch = (renderProps) => (<>
        
        <div className={buildTrackClassName(size, variant, renderProps.isSelected)} data-focused={renderProps.isFocused || undefined} data-disabled={renderProps.isDisabled || undefined}>
          
          <div className={buildThumbClassName(size, renderProps.isSelected)}/>
        </div>

        
        {children && typeof children !== 'function' && (<span className={buildLabelClassName(size)}>{children}</span>)}
      </>);
    const containerClassName = typeof className === 'string' || className === undefined
        ? buildContainerClassName(labelPosition, className)
        : className;
    return (<AriaSwitch ref={ref} className={containerClassName} {...props}>
        {renderSwitch}
      </AriaSwitch>);
});
Toggle.displayName = 'Toggle';
