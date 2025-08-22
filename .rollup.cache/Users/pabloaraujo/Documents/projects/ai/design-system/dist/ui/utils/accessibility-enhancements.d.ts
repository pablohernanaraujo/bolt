import { type ComponentType, type ReactElement, type ReactNode } from 'react';
interface AccessibilityEnhancementProps {
    children: ReactNode;
    type: 'focus' | 'screenreader' | 'keyboard' | 'announcements';
    config?: Record<string, any>;
    fallback?: ReactNode;
    defer?: boolean;
}
interface AnnouncementEnhancementProps {
    children: ReactNode | ((props: {
        announce: (message: string, priority?: 'polite' | 'assertive') => void;
    }) => ReactNode);
    config?: Record<string, any>;
    fallback?: ReactNode;
    defer?: boolean;
}
export declare function FocusEnhancement({ children, config, fallback, defer, }: Omit<AccessibilityEnhancementProps, 'type'>): ReactElement;
export declare function ScreenReaderEnhancement({ children, config, fallback, defer, }: Omit<AccessibilityEnhancementProps, 'type'>): ReactElement;
export declare function KeyboardEnhancement({ children, config, fallback, defer, }: Omit<AccessibilityEnhancementProps, 'type'>): ReactElement;
export declare function AnnouncementEnhancement({ children, config, fallback, defer, }: AnnouncementEnhancementProps): ReactElement;
export declare function AccessibilityEnhancement({ children, type, config, fallback, defer, }: AccessibilityEnhancementProps): ReactElement;
export declare function withAccessibilityEnhancement<P extends object>(Component: ComponentType<P>, enhancementType: AccessibilityEnhancementProps['type'], enhancementConfig?: Record<string, any>): ComponentType<P>;
export {};
