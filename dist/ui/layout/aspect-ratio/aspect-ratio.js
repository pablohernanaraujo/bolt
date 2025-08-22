import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { content } from './aspect-ratio.css.js';
import { createAspectRatioStyles, buildAspectRatioClassName } from './helpers.js';

const AspectRatio = forwardRef(({ preset, ratio, objectFit = 'cover', as: Component = 'div', className, style, children, ...props }, ref) => {
    if (preset && ratio) {
        console.warn('AspectRatio: Both preset and ratio props are provided. The ratio prop will take precedence.');
    }
    if (!preset && !ratio) {
        console.warn('AspectRatio: Either preset or ratio prop must be provided. Falling back to square preset.');
        preset = 'square';
    }
    const aspectRatioClassName = buildAspectRatioClassName({
        preset,
        objectFit,
        className,
    });
    const aspectRatioStyles = createAspectRatioStyles(preset, ratio);
    const combinedStyles = {
        ...aspectRatioStyles,
        ...style,
    };
    return (jsx(Component, { ref: ref, className: aspectRatioClassName, style: combinedStyles, ...props, children: jsx("div", { className: content, children: children }) }));
});
AspectRatio.displayName = 'AspectRatio';

export { AspectRatio };
//# sourceMappingURL=aspect-ratio.js.map
