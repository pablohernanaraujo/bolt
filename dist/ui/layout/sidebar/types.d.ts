import { type ReactNode } from 'react';
export interface SidebarProps {
    children: ReactNode;
    isCollapsed?: boolean;
    className?: string;
}
