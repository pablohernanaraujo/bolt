import { clsx } from 'clsx';
import { base, paddingVariants } from './container.css.js';

const buildContainerClassName = ({ paddingY = '6', className, }) => clsx(base, paddingVariants[paddingY], className);

export { buildContainerClassName };
//# sourceMappingURL=helpers.js.map
