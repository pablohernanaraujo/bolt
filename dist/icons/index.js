import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
export * from 'lucide-react';

const iconSizes = {
    xs: 14,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
};
function createIcon(LucideIconComponent) {
    const IconComponent = forwardRef(({ size = 'md', slot, ...props }, ref) => {
        const sizeValue = typeof size === 'number' ? size : iconSizes[size];
        return (jsx(LucideIconComponent, { ref: ref, size: sizeValue, ...props, "data-slot": slot }));
    });
    IconComponent.displayName = `Icon(${LucideIconComponent.displayName || LucideIconComponent.name})`;
    return IconComponent;
}
const Icon = forwardRef(({ icon: IconComponent, size = 'md', slot, ...props }, ref) => {
    const sizeValue = typeof size === 'number' ? size : iconSizes[size];
    return (jsx(IconComponent, { ref: ref, size: sizeValue, ...props, "data-slot": slot }));
});
Icon.displayName = 'Icon';

export { Icon, createIcon, iconSizes };
//# sourceMappingURL=index.js.map
