import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { gridItem } from './grid-item.css.js';
import { buildGridItemStyles, buildGridItemClassName } from './helpers.js';

const GridItem = forwardRef(({ colStart, colEnd, colSpan, rowStart, rowEnd, rowSpan, area, as: Component = 'div', className, children, style, ...props }, ref) => {
    const gridItemStyles = buildGridItemStyles({
        colStart,
        colEnd,
        colSpan,
        rowStart,
        rowEnd,
        rowSpan,
        area,
    });
    const gridItemClassName = buildGridItemClassName(gridItem, className);
    const combinedStyles = {
        ...gridItemStyles,
        ...style,
    };
    return (jsx(Component, { ref: ref, className: gridItemClassName, style: combinedStyles, ...props, children: children }));
});
GridItem.displayName = 'GridItem';

export { GridItem };
//# sourceMappingURL=grid-item.js.map
