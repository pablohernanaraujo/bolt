'use client';
import { useEffect, useState } from 'react';
import { Tooltip as AriaTooltip, TooltipTrigger as AriaTooltipTrigger, OverlayArrow, } from 'react-aria-components';
import { darkTheme, lightTheme } from '@/tokens/themes';
import { buildTooltipArrowClassName, buildTooltipClassName, getAriaPlacement, getOffsetForSize, } from './helpers';
export const TooltipTrigger = ({ delay = 700, closeDelay = 0, children, ...props }) => (<AriaTooltipTrigger delay={delay} closeDelay={closeDelay} {...props}>
    {children}
  </AriaTooltipTrigger>);
export const Tooltip = ({ children, placement = 'top', size = 'medium', variant = 'default', offset: customOffset, showArrow = false, maxWidth = 300, className, ...props }) => {
    const [currentTheme, setCurrentTheme] = useState('light');
    useEffect(() => {
        const detectTheme = () => {
            if (typeof document !== 'undefined') {
                const theme = document.documentElement.getAttribute('data-theme') || 'light';
                setCurrentTheme(theme);
            }
        };
        detectTheme();
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' &&
                    mutation.attributeName === 'data-theme') {
                    detectTheme();
                }
            }
        });
        if (typeof document !== 'undefined') {
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['data-theme'],
            });
        }
        return () => observer.disconnect();
    }, []);
    const offset = getOffsetForSize(size, customOffset);
    const ariaPlacement = getAriaPlacement(placement);
    const themeClass = currentTheme === 'light' ? lightTheme : darkTheme;
    const tooltipClassName = `${themeClass} ${buildTooltipClassName(size, variant, className)}`;
    return (<AriaTooltip placement={ariaPlacement} offset={offset} className={tooltipClassName} style={{ maxWidth: `${maxWidth}px` }} {...props}>
      
      {showArrow && (<OverlayArrow>
          <div className={`${themeClass} ${buildTooltipArrowClassName(variant)}`}/>
        </OverlayArrow>)}

      
      <div>{children}</div>
    </AriaTooltip>);
};
