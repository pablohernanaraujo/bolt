import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';
import { grid } from './grid.css.js';
import { buildGridStyles, buildGridClassName } from './helpers.js';

const Grid = forwardRef(({ templateColumns, templateRows, templateAreas, gap, columnGap, rowGap, autoColumns, autoRows, autoFlow, as: Component = 'div', className, children, style, ...props }, ref) => {
    const gridStyles = buildGridStyles({
        templateColumns,
        templateRows,
        templateAreas,
        gap,
        columnGap,
        rowGap,
        autoColumns,
        autoRows,
        autoFlow,
    });
    const gridClassName = buildGridClassName(grid, className);
    const combinedStyles = {
        ...gridStyles,
        ...style,
    };
    return (jsx(Component, { ref: ref, className: gridClassName, style: combinedStyles, ...props, children: children }));
});
Grid.displayName = 'Grid';

export { Grid };
//# sourceMappingURL=grid.js.map
