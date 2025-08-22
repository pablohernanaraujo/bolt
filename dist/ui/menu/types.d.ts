import { type Key, type ReactElement, type ReactNode } from 'react';
import { type MenuTriggerProps as AriaMenuTriggerProps } from 'react-aria-components';
export type MenuPlacement = 'top' | 'bottom' | 'left' | 'right' | 'start' | 'end' | 'top start' | 'top end' | 'bottom start' | 'bottom end' | 'left top' | 'left bottom' | 'right top' | 'right bottom';
export type MenuSize = 'small' | 'medium' | 'large';
export type MenuVariant = 'default' | 'accent' | 'inverse';
export type MenuItemVariant = 'default' | 'danger' | 'success' | 'warning';
export interface MenuTriggerProps extends Omit<AriaMenuTriggerProps, 'children'> {
    children: [ReactElement, ReactElement];
}
export interface MenuProps {
    children: ReactNode | ((item: any) => ReactElement);
    placement?: MenuPlacement;
    size?: MenuSize;
    variant?: MenuVariant;
    offset?: number;
    maxWidth?: number;
    minWidth?: number;
    closeOnSelect?: boolean;
    onAction?: (key: Key) => void;
    items?: Iterable<any>;
    isDismissable?: boolean;
    className?: string;
    isDisabled?: boolean;
}
export interface MenuItemProps {
    children: ReactNode;
    id?: Key;
    textValue?: string;
    variant?: MenuItemVariant;
    isDisabled?: boolean;
    onAction?: () => void;
    className?: string;
    shortcut?: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
}
export interface MenuSectionProps {
    title?: string;
    children: ReactNode;
    className?: string;
}
export interface MenuSeparatorProps {
    className?: string;
}
export interface MenuCollectionItem {
    id: Key;
    label: string;
    description?: string;
    isDisabled?: boolean;
    variant?: MenuItemVariant;
    icon?: ReactElement;
    shortcut?: string;
    section?: string;
}
//# sourceMappingURL=types.d.ts.map