import { type TabListProps as AriaTabListProps, type TabPanelProps as AriaTabPanelProps, type TabProps as AriaTabProps, type TabsProps as AriaTabsProps } from 'react-aria-components';
export interface TabsRootProps extends AriaTabsProps {
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'enclosed' | 'soft-rounded' | 'unstyled';
    isFitted?: boolean;
    align?: 'start' | 'center' | 'end';
}
export interface TabsListProps extends AriaTabListProps<object> {
}
export interface TabsTriggerProps extends AriaTabProps {
    isDisabled?: boolean;
}
export interface TabsContentProps extends AriaTabPanelProps {
}
