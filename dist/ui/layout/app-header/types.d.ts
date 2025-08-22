import { type ReactNode } from 'react';
export interface AppHeaderProps {
    title: string;
    actions?: ReactNode;
    showDivider?: boolean;
}
