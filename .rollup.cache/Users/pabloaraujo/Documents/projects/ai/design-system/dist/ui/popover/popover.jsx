'use client';
import { X } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { Button as AriaButton, Popover as AriaPopover, Dialog, DialogTrigger, Heading, OverlayArrow, } from 'react-aria-components';
import { Icon } from '@/icons';
import { darkTheme, lightTheme } from '@/tokens/themes';
import { getAriaPlacement, getOffsetForSize } from '../tooltip/helpers';
import { buildPopoverArrowClassName, buildPopoverBodyClassName, buildPopoverClassName, buildPopoverFooterClassName, buildPopoverHeaderClassName, } from './helpers';
import * as styles from './popover.css';
export const PopoverTrigger = ({ delay, closeDelay, children, ...props }) => <DialogTrigger {...props}>{children}</DialogTrigger>;
export const Popover = ({ placement = 'top', size = 'medium', variant = 'default', offset: customOffset, showArrow = false, maxWidth = 320, isDismissable = true, isKeyboardDismissDisabled = false, className, children, ...props }) => {
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
    const popoverClassName = `${themeClass} ${buildPopoverClassName(size, variant, className)} ${styles.responsivePopover}`;
    return (<AriaPopover placement={ariaPlacement} offset={offset} className={popoverClassName} style={{ maxWidth: `${maxWidth}px` }} {...props}>
      <Dialog>
        
        {showArrow && (<OverlayArrow>
            <div className={`${themeClass} ${buildPopoverArrowClassName(variant)}`}/>
          </OverlayArrow>)}

        
        <div>{children}</div>
      </Dialog>
    </AriaPopover>);
};
export const PopoverContent = ({ title, showCloseButton = true, showHeaderDivider = true, children, className, ...props }) => {
    const hasHeader = !!title || showCloseButton;
    return (<div className={className} {...props}>
      {hasHeader && (<PopoverHeader title={title} showCloseButton={showCloseButton} showDivider={showHeaderDivider}/>)}
      <PopoverBody hasHeader={hasHeader}>{children}</PopoverBody>
    </div>);
};
export const PopoverHeader = ({ title, showCloseButton = true, showDivider = true, children, className, }) => {
    const titleId = useId();
    return (<header className={buildPopoverHeaderClassName(showDivider, className)}>
      <div>
        {title && (<Heading id={titleId} className={styles.popoverTitle} slot="title">
            {title}
          </Heading>)}
        {children}
      </div>

      {showCloseButton && (<AriaButton className={styles.popoverCloseButton} aria-label="Close popover" slot="close">
          <Icon icon={X} size="sm"/>
        </AriaButton>)}
    </header>);
};
export const PopoverBody = ({ children, hasHeader, hasFooter, className }) => (<div className={buildPopoverBodyClassName(hasHeader, hasFooter, className)}>
    {children}
  </div>);
export const PopoverFooter = ({ children, showDivider = true, className, }) => (<footer className={buildPopoverFooterClassName(showDivider, className)}>
    {children}
  </footer>);
export const PopoverArrow = ({ variant = 'default', className, }) => (<div className={buildPopoverArrowClassName(variant, className)}/>);
Popover.displayName = 'Popover';
PopoverTrigger.displayName = 'PopoverTrigger';
PopoverContent.displayName = 'PopoverContent';
PopoverHeader.displayName = 'PopoverHeader';
PopoverBody.displayName = 'PopoverBody';
PopoverFooter.displayName = 'PopoverFooter';
PopoverArrow.displayName = 'PopoverArrow';
