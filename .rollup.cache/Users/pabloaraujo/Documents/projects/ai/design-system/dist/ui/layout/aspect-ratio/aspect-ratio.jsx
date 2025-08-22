import { forwardRef } from 'react';
import * as styles from './aspect-ratio.css';
import { buildAspectRatioClassName, createAspectRatioStyles } from './helpers';
export const AspectRatio = forwardRef(({ preset, ratio, objectFit = 'cover', as: Component = 'div', className, style, children, ...props }, ref) => {
    if (preset && ratio) {
        console.warn('AspectRatio: Both preset and ratio props are provided. The ratio prop will take precedence.');
    }
    if (!preset && !ratio) {
        console.warn('AspectRatio: Either preset or ratio prop must be provided. Falling back to square preset.');
        preset = 'square';
    }
    const aspectRatioClassName = buildAspectRatioClassName({
        preset,
        ratio,
        objectFit,
        className,
    });
    const aspectRatioStyles = createAspectRatioStyles(preset, ratio);
    const combinedStyles = {
        ...aspectRatioStyles,
        ...style,
    };
    return (<Component ref={ref} className={aspectRatioClassName} style={combinedStyles} {...props}>
        <div className={styles.content}>{children}</div>
      </Component>);
});
AspectRatio.displayName = 'AspectRatio';
