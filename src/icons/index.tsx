// /src/icons/index.tsx
// Icon component wrapper and re-exports from lucide-react
// Provides consistent icon sizing and slot support
// RELEVANT FILES: lucide-react

import { type LucideIcon } from 'lucide-react';
import { type ComponentProps, forwardRef, type ReactElement } from 'react';

// Re-export all icons from lucide-react
export * from 'lucide-react';

// Icon size presets
export const iconSizes = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export type IconSize = keyof typeof iconSizes;

export interface IconProps extends ComponentProps<'svg'> {
  /**
   * Size preset for the icon
   * Can be a preset name or a custom number
   * @default 'md'
   */
  size?: IconSize | number;

  /**
   * Slot for composition with React Aria Components
   * Allows icons to be used in component slots
   */
  slot?: string;
}

/**
 * Create a typed icon component from a Lucide icon
 * Adds size presets and slot support
 */
export function createIcon(
  LucideIconComponent: LucideIcon,
): React.ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
> {
  const IconComponent = forwardRef<SVGSVGElement, IconProps>(
    ({ size = 'md', slot, ...props }, ref): ReactElement => {
      const sizeValue = typeof size === 'number' ? size : iconSizes[size];

      return (
        <LucideIconComponent
          ref={ref}
          size={sizeValue}
          {...props}
          data-slot={slot}
        />
      );
    },
  );

  IconComponent.displayName = `Icon(${LucideIconComponent.displayName || LucideIconComponent.name})`;

  return IconComponent;
}

/**
 * Generic Icon component that accepts any Lucide icon
 * Usage: <Icon icon={ChevronRight} size="lg" />
 */
export interface GenericIconProps extends IconProps {
  icon: LucideIcon;
}

export const Icon = forwardRef<SVGSVGElement, GenericIconProps>(
  ({ icon: IconComponent, size = 'md', slot, ...props }, ref): ReactElement => {
    const sizeValue = typeof size === 'number' ? size : iconSizes[size];

    return (
      <IconComponent ref={ref} size={sizeValue} {...props} data-slot={slot} />
    );
  },
);

Icon.displayName = 'Icon';
