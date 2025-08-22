import { type ReactElement, type ReactNode } from 'react';
export type BreadcrumbSize = 'small' | 'medium' | 'large';
export type BreadcrumbVariant = 'default' | 'subtle';
export interface BreadcrumbRootProps {
    children: ReactNode;
    size?: BreadcrumbSize;
    variant?: BreadcrumbVariant;
    className?: string;
    'aria-label'?: string;
}
export interface BreadcrumbListProps {
    children: ReactNode;
    className?: string;
}
export interface BreadcrumbItemProps {
    children: ReactNode;
    className?: string;
    icon?: ReactElement;
    isCurrentPage?: boolean;
}
export interface BreadcrumbLinkProps {
    children: ReactNode;
    href: string;
    className?: string;
    onClick?: () => void;
    external?: boolean;
}
export interface BreadcrumbCurrentLinkProps {
    children: ReactNode;
    className?: string;
}
export interface BreadcrumbSeparatorProps {
    children?: ReactNode;
    className?: string;
}
export interface BreadcrumbItemData {
    id: string;
    label: string;
    href?: string;
    icon?: ReactElement;
    isCurrentPage?: boolean;
}
export interface BreadcrumbProps extends Omit<BreadcrumbRootProps, 'children'> {
    items: BreadcrumbItemData[];
    separator?: ReactNode;
    maxItems?: number;
    itemsBeforeCollapse?: number;
    itemsAfterCollapse?: number;
}
