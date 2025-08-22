import { type ReactNode } from 'react';
export type AccordionSelectionMode = 'single' | 'multiple';
export type AccordionVariant = 'default' | 'bordered' | 'separated';
export type AccordionSize = 'small' | 'medium' | 'large';
export interface AccordionItemProps {
    id: string;
    title: ReactNode;
    children: ReactNode;
    isDisabled?: boolean;
    className?: string;
    icon?: ReactNode;
}
export interface AccordionProps {
    items?: AccordionItemProps[];
    children?: ReactNode;
    selectionMode?: AccordionSelectionMode;
    variant?: AccordionVariant;
    size?: AccordionSize;
    expandedKeys?: Set<string> | string[];
    defaultExpandedKeys?: Set<string> | string[];
    onExpandedChange?: (keys: Set<string>) => void;
    fullWidth?: boolean;
    className?: string;
    allowAllClosed?: boolean;
    disableAnimation?: boolean;
}
export interface AccordionRenderProps {
    isExpanded?: boolean;
    isFocused?: boolean;
    isDisabled?: boolean;
    isPressed?: boolean;
    isFocusVisible?: boolean;
}
