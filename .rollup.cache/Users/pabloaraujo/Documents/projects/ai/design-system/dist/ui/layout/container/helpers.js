import { clsx } from 'clsx';
import * as styles from './container.css';
export const buildContainerClassName = ({ paddingY = '6', className, }) => clsx(styles.base, styles.paddingVariants[paddingY], className);
