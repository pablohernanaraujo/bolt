import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
export * from 'lucide-react';
export const iconSizes = {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
};
export function createIcon(LucideIconComponent) {
    const IconComponent = forwardRef(({ size = 'md', slot, ...props }, ref) => {
        const sizeValue = typeof size === 'number' ? size : iconSizes[size];
        return (_jsx(LucideIconComponent, { ref: ref, size: sizeValue, ...props, "data-slot": slot }));
    });
    IconComponent.displayName = `Icon(${LucideIconComponent.displayName || LucideIconComponent.name})`;
    return IconComponent;
}
export const Icon = forwardRef(({ icon: IconComponent, size = 'md', slot, ...props }, ref) => {
    const sizeValue = typeof size === 'number' ? size : iconSizes[size];
    return (_jsx(IconComponent, { ref: ref, size: sizeValue, ...props, "data-slot": slot }));
});
Icon.displayName = 'Icon';
