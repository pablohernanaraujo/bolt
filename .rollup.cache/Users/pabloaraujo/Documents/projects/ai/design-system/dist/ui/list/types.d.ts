import { type LucideIcon } from 'lucide-react';
import type React from 'react';
import { type HTMLAttributes, type ReactNode } from 'react';
export interface ListRootProps extends HTMLAttributes<HTMLElement> {
    variant?: 'unordered' | 'ordered' | 'basic';
    spacing?: 'sm' | 'md' | 'lg';
    children: ReactNode;
}
export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
    icon?: LucideIcon;
    emphasis?: 'high' | 'medium' | 'low' | 'pure';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    decoration?: 'italic' | 'underline' | 'line-through';
    size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
    colorScheme?: 'default' | 'brand' | 'success' | 'warning' | 'error' | 'info';
    children: ReactNode;
}
export interface ListProps {
    Root: React.ForwardRefExoticComponent<ListRootProps & React.RefAttributes<HTMLElement>>;
    Item: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLLIElement>>;
}
//# sourceMappingURL=types.d.ts.map