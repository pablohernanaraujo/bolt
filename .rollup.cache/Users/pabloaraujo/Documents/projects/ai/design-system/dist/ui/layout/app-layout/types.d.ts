import { type ReactNode } from 'react';
export interface AppLayoutProps {
    sidebar: ReactNode;
    children: ReactNode;
    className?: string;
}
