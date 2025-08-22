export declare const isJavaScriptAvailable: () => boolean;
export declare const shouldEnhanceComponent: (options?: {
    respectReducedMotion?: boolean;
    respectDataSaver?: boolean;
    requireIntersectionObserver?: boolean;
}) => boolean;
export declare const createVisibilityObserver: (callback: (entry: IntersectionObserverEntry) => void, options?: IntersectionObserverInit) => IntersectionObserver | null;
export declare const enhanceForm: (formElement: HTMLFormElement, onSubmit: (formData: FormData, event: SubmitEvent) => Promise<void> | void) => (() => void);
export declare const enhanceButton: (buttonElement: HTMLButtonElement, onClick: (event: MouseEvent) => Promise<void> | void) => (() => void);
export declare const isScreenReaderDetected: () => boolean;
export declare const isKeyboardNavigationPreferred: () => boolean;
export declare const enhanceFocusManagement: (containerElement: HTMLElement, options?: {
    trapFocus?: boolean;
    restoreFocus?: boolean;
    initialFocus?: HTMLElement | string;
}) => (() => void);
export declare const enhanceScreenReaderAnnouncement: (message: string, priority?: "polite" | "assertive") => (() => void);
export declare const useProgressiveEnhancement: (dependencies?: unknown[]) => {
    isEnhanced: boolean;
    shouldEnhance: boolean;
    createObserver: typeof createVisibilityObserver;
    enhanceForm: typeof enhanceForm;
    enhanceButton: typeof enhanceButton;
    enhanceFocusManagement: typeof enhanceFocusManagement;
    enhanceScreenReaderAnnouncement: typeof enhanceScreenReaderAnnouncement;
    isScreenReaderDetected: boolean;
    isKeyboardNavigationPreferred: boolean;
};
export interface ProgressiveEnhancementOptions {
    respectReducedMotion?: boolean;
    respectDataSaver?: boolean;
    requireIntersectionObserver?: boolean;
    enhancementDelay?: number;
}
export interface VisibilityObserverConfig extends IntersectionObserverInit {
    once?: boolean;
    minVisibleTime?: number;
}
export declare const ENHANCEMENT_CONFIGS: {
    readonly HEAVY_COMPONENT: {
        readonly respectReducedMotion: true;
        readonly respectDataSaver: true;
        readonly requireIntersectionObserver: true;
        readonly enhancementDelay: 100;
    };
    readonly INTERACTIVE_OVERLAY: {
        readonly respectReducedMotion: false;
        readonly respectDataSaver: false;
        readonly requireIntersectionObserver: false;
        readonly enhancementDelay: 0;
    };
    readonly FORM_ENHANCEMENT: {
        readonly respectReducedMotion: true;
        readonly respectDataSaver: false;
        readonly requireIntersectionObserver: false;
        readonly enhancementDelay: 0;
    };
    readonly THEME_ENHANCEMENT: {
        readonly respectReducedMotion: true;
        readonly respectDataSaver: false;
        readonly requireIntersectionObserver: false;
        readonly enhancementDelay: 0;
    };
    readonly ACCESSIBILITY_ENHANCEMENT: {
        readonly respectReducedMotion: true;
        readonly respectDataSaver: false;
        readonly requireIntersectionObserver: false;
        readonly enhancementDelay: 0;
    };
    readonly SCREEN_READER_ENHANCEMENT: {
        readonly respectReducedMotion: true;
        readonly respectDataSaver: false;
        readonly requireIntersectionObserver: false;
        readonly enhancementDelay: 0;
    };
    readonly KEYBOARD_ENHANCEMENT: {
        readonly respectReducedMotion: true;
        readonly respectDataSaver: false;
        readonly requireIntersectionObserver: false;
        readonly enhancementDelay: 0;
    };
    readonly FOCUS_ENHANCEMENT: {
        readonly respectReducedMotion: true;
        readonly respectDataSaver: false;
        readonly requireIntersectionObserver: false;
        readonly enhancementDelay: 0;
    };
};
