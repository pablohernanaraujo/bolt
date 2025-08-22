import { type ReactNode } from 'react';
export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
export type ToastStatus = 'assertive' | 'polite';
export interface ToastProps {
    id: string;
    variant?: ToastVariant;
    title?: string;
    description?: ReactNode;
    isClosable?: boolean;
    duration?: number | null;
    onClose?: (id: string) => void;
    status?: ToastStatus;
    icon?: ReactNode;
    className?: string;
}
export interface ToastProviderProps {
    children: ReactNode;
    position?: ToastPosition;
    max?: number;
    duration?: number;
}
export interface ToastContextType {
    toast: (options: Omit<ToastProps, 'id'>) => string;
    close: (id: string) => void;
    closeAll: () => void;
    update: (id: string, options: Partial<ToastProps>) => void;
}
export interface ToastState extends ToastProps {
    createdAt: number;
    isVisible: boolean;
}
