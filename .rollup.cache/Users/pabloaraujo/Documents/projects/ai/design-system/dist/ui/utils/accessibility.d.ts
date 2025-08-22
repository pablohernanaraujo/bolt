import { type AriaAttributes, type HTMLAttributes, type InputHTMLAttributes, type LabelHTMLAttributes } from 'react';
import { ComponentIdGenerator } from './deterministic-ids';
export interface AccessibilityProps extends AriaAttributes {
    id?: string;
    'aria-hidden'?: boolean;
    'data-testid'?: string;
    role?: string;
}
export interface FormFieldAccessibilityConfig {
    componentName: string;
    fieldName?: string;
    isRequired?: boolean;
    hasError?: boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    ariaLabel?: string;
    ariaDescription?: string;
    additionalAria?: Partial<AriaAttributes>;
}
export interface FormFieldAccessibilityAttributes {
    field: HTMLAttributes<HTMLElement> & {
        'data-field'?: string;
        'data-testid'?: string;
    };
    input: InputHTMLAttributes<HTMLInputElement> & {
        'data-testid'?: string;
    };
    label: LabelHTMLAttributes<HTMLLabelElement> & {
        'data-testid'?: string;
    };
    error: HTMLAttributes<HTMLElement> & {
        'data-testid'?: string;
    };
    helpText: HTMLAttributes<HTMLElement> & {
        'data-testid'?: string;
    };
}
export declare function generateFormFieldAccessibility(config: FormFieldAccessibilityConfig): FormFieldAccessibilityAttributes;
export interface InteractiveAccessibilityConfig {
    componentName: string;
    elementName: string;
    isPressed?: boolean;
    isExpanded?: boolean;
    hasPopup?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    controls?: string;
    ariaLabel?: string;
    liveRegion?: 'off' | 'polite' | 'assertive';
    additionalAria?: Partial<AriaAttributes>;
}
export declare function generateInteractiveAccessibility(config: InteractiveAccessibilityConfig): HTMLAttributes<HTMLElement> & {
    'data-testid'?: string;
};
export interface CollectionAccessibilityConfig {
    componentName: string;
    totalItems: number;
    selectedItems?: number[];
    isMultiSelect?: boolean;
    orientation?: 'horizontal' | 'vertical';
    ariaLabel?: string;
    isSearchable?: boolean;
}
export declare function generateCollectionAccessibility(config: CollectionAccessibilityConfig): {
    container: HTMLAttributes<HTMLElement> & {
        'data-testid'?: string;
    };
    item: (index: number, isSelected?: boolean) => HTMLAttributes<HTMLElement> & {
        'data-testid'?: string;
    };
};
export interface DialogAccessibilityConfig {
    componentName: string;
    isModal?: boolean;
    title?: string;
    description?: string;
    initialFocus?: string;
    returnFocus?: string;
}
export declare function generateDialogAccessibility(config: DialogAccessibilityConfig): {
    dialog: HTMLAttributes<HTMLElement> & {
        'data-testid'?: string;
    };
    title: HTMLAttributes<HTMLElement> & {
        'data-testid'?: string;
    };
    description: HTMLAttributes<HTMLElement> & {
        'data-testid'?: string;
    };
};
export declare const screenReader: {
    onlyStyles: {
        position: "absolute";
        width: string;
        height: string;
        padding: number;
        margin: string;
        overflow: string;
        clip: string;
        whiteSpace: "nowrap";
        border: number;
    };
    focusableStyles: {
        position: "absolute";
        left: string;
        top: string;
        width: string;
        height: string;
        overflow: string;
    };
    announce: (message: string, priority?: "polite" | "assertive") => void;
};
export declare const keyboard: {
    keys: {
        readonly ARROW_UP: "ArrowUp";
        readonly ARROW_DOWN: "ArrowDown";
        readonly ARROW_LEFT: "ArrowLeft";
        readonly ARROW_RIGHT: "ArrowRight";
        readonly HOME: "Home";
        readonly END: "End";
        readonly PAGE_UP: "PageUp";
        readonly PAGE_DOWN: "PageDown";
        readonly ENTER: "Enter";
        readonly SPACE: " ";
        readonly TAB: "Tab";
        readonly ESCAPE: "Escape";
        readonly DELETE: "Delete";
        readonly BACKSPACE: "Backspace";
    };
    isFocusable: (element: HTMLElement) => boolean;
    getFocusableElements: (container: HTMLElement) => HTMLElement[];
    trapFocus: (container: HTMLElement, event: KeyboardEvent) => void;
};
export declare const focus: {
    setById: (id: string, delay?: number) => void;
    createTrap: (container: HTMLElement | null) => {
        activate: () => void;
        deactivate: () => void;
    };
};
export declare function createAccessibilityHelper(componentName: string): {
    idGenerator: ComponentIdGenerator;
    generateFormField: (fieldName?: string) => FormFieldAccessibilityAttributes;
    generateInteractive: (elementName: string, config?: Partial<InteractiveAccessibilityConfig>) => HTMLAttributes<HTMLElement> & {
        'data-testid'?: string;
    };
    generateCollection: (config: Omit<CollectionAccessibilityConfig, 'componentName'>) => {
        container: HTMLAttributes<HTMLElement> & {
            'data-testid'?: string;
        };
        item: (index: number, isSelected?: boolean) => HTMLAttributes<HTMLElement> & {
            'data-testid'?: string;
        };
    };
    generateDialog: (config?: Partial<DialogAccessibilityConfig>) => {
        dialog: HTMLAttributes<HTMLElement> & {
            'data-testid'?: string;
        };
        title: HTMLAttributes<HTMLElement> & {
            'data-testid'?: string;
        };
        description: HTMLAttributes<HTMLElement> & {
            'data-testid'?: string;
        };
    };
};
